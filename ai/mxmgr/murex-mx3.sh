#!/usr/bin/env bash

############################################
# MX.3 End-to-End Automation Script
# Trade → Valuation → Risk → Collateral → Accounting → Settlement
# With error-handling & retry logic
############################################

set -e

LOGFILE="/logs/mx_batch_$(date +%Y%m%d).log"
VAL_DATE=$(date +%Y-%m-%d)
RETRIES=3
SLEEP_TIME=5

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOGFILE"
}

run_step() {
  local description="$1"
  shift
  local cmd="$@"

  log "START: $description"

  local attempt=1
  until eval $cmd; do
    if [ $attempt -ge $RETRIES ]; then
      log "ERROR: $description failed after $attempt attempts. Exiting." >&2
      exit 1
    fi

    log "WARNING: $description failed (attempt $attempt). Retrying in $SLEEP_TIME seconds..."
    sleep $SLEEP_TIME
    attempt=$((attempt+1))
  done

  log "SUCCESS: $description"
}

log "=== MX.3 Overnight Batch Started ==="
log "Value Date: $VAL_DATE"

############################################
# 1. Import Trades
############################################
run_step "Importing Trades" \
  "mx_trade_import --file /data/incoming/trades/fx.xml --mode AUTO --validate --log $LOGFILE"

############################################
# 2. Validation
############################################
run_step "Running Trade Validation Checks" \
  "mx_trade_check --date $VAL_DATE --controls STATIC,MARKET_DATA,LEGAL --log $LOGFILE"

############################################
# 3. Market Data Load
############################################
run_step "Loading Market Data" \
  "mx_marketdata_load --source MARKET_FEED_EOD --date $VAL_DATE"

############################################
# 4. Valuation
############################################
run_step "Running Valuation Batch" \
  "mx_valuation_run --portfolio ALL --asof $VAL_DATE --grid VAL_GRID_001 --close-of-business --log $LOGFILE"

############################################
# 5. Market Risk
############################################
run_step "Running Market Risk (VaR, Stress, Sensitivities)" \
  "mx_risk_run --types VAR,STRESS,SVAR,SENSITIVITIES --portfolio ALL --asof $VAL_DATE --log $LOGFILE"

############################################
# 6. Counterparty Risk / XVA
############################################
run_step "Running XVA (CVA/DVA/FVA/MVA)" \
  "mx_xva_run --asof $VAL_DATE --metrics CVA,DVA,FVA,MVA --log $LOGFILE"

############################################
# 7. Collateral & Margining
############################################
run_step "Collateral Processing (Margin Calls, Inventory Optimisation)" \
  "mx_collateral_process --asof $VAL_DATE --generate-margin-calls --optimise-inventory --auto-dispute-handling --log $LOGFILE"

############################################
# 8. Accounting
############################################
run_step "Generating Accounting Entries" \
  "mx_accounting_generate --asof $VAL_DATE --entities ALL --post-to-subledger --log $LOGFILE"

############################################
# 9. Settlement
############################################
run_step "Settlement Processing" \
  "mx_settlement_run --asof $VAL_DATE --products FX,MM,RATES,SECURITIES --generate-swift --auto-matching --log $LOGFILE"

############################################
# 10. Reporting
############################################
run_step "Generating End-of-Day Reports" \
  "mx_reporting_run --templates EOD_PNL,DAILY_RISK,COLLATERAL,LIQUIDITY --send-email --log $LOGFILE"

############################################
# 11. Archival
############################################
run_step "Archiving Logs" \
  "mx_archive --folder /logs --retain-days 90"

log "=== MX.3 Overnight Batch Complete ==="
