let VAL_DATE = "2025-12-08"
let LOGFILE = "/logs/mx_batch_$VAL_DATE.log"

# 1. Import Trades
exec "mx_trade_import" --file "/data/incoming/trades/fx.xml" --mode AUTO --validate --log "$LOGFILE"

# 2. Validation
exec "mx_trade_check" --date $VAL_DATE --controls "STATIC,MARKET_DATA,LEGAL" --log "$LOGFILE"

# 3. Market Data Load
exec "mx_marketdata_load" --source "MARKET_FEED_EOD" --date $VAL_DATE

# 4. Valuation
exec "mx_valuation_run" --portfolio "ALL" --asof "$VAL_DATE" --grid "VAL_GRID_001" --close-of-business --log "$LOGFILE"

# 5. Market Risk (VaR, Stress, Sensitivities)"
exec "mx_risk_run" --types "VAR,STRESS,SVAR,SENSITIVITIES" --portfolio "ALL" --asof "$VAL_DATE" --log "$LOGFILE"

# 6. Counterparty Risk / XVA (CVA/DVA/FVA/MVA)
exec "mx_xva_run" --asof "$VAL_DATE" --metrics "CVA,DVA,FVA,MVA" --log "$LOGFILE"

# 7. Collateral Processing (Margin Calls, Inventory Optimisation)
exec "mx_collateral_process" --asof "$VAL_DATE" --generate-margin-calls --optimise-inventory --auto-dispute-handling --log "$LOGFILE"

# 8. Accounting
exec "mx_accounting_generate" --asof "$VAL_DATE" --entities "ALL" --post-to-subledger --log "$LOGFILE"

# 9. Settlement Processing
exec "mx_settlement_run" --asof "$VAL_DATE" --products "FX,MM,RATES,SECURITIES" --generate-swift --auto-matching --log "$LOGFILE"

# 10. End-of-Day Reports
exec "mx_reporting_run" --templates "EOD_PNL,DAILY_RISK,COLLATERAL,LIQUIDITY" --send-email --log "$LOGFILE"

# 11. Archive Logs
exec "mx_archive" --folder "/logs" --retain-days 90
