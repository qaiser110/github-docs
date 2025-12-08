write a mega-prompt that I can give to Claude to build a complete technical specifications the following app:

# Greenfield App Development Plan

We are planning to build a new full-stack web application.

Think hard and create a thorough phased-plan and specifications that I can brainstorm with you before we can implement in phases.

There would be separate but associated plan and specifications for both the backend and frontend, each of them having complete plan and comprehensive specifications that would be sufficient for a developer to build the app.

## About the Web Application

There are multiple ec2 instances that each run a specific version of existing Murex MX.3 application (https://www.murex.com/en/solutions/mx3-leading-integrated-capital-markets-solution). Murex platform consists of multiple financial products. The staff members are using SSH to tunnel in to ec2 instance and directly using the terminal to send different CLI commands to query and manage products. Here are some examples of the commands they're running:

```sh
let VAL_DATE = "2025-12-08"
let LOGFILE = "/logs/mx_batch_$VAL_DATE.log"

exec "mx_trade_import" --file "/data/incoming/trades/fx.xml" --mode AUTO --validate --log "$LOGFILE"

exec "mx_trade_check" --date $VAL_DATE --controls "STATIC,MARKET_DATA,LEGAL" --log "$LOGFILE"

exec "mx_marketdata_load" --source "MARKET_FEED_EOD" --date $VAL_DATE

exec "mx_valuation_run" --portfolio "ALL" --asof "$VAL_DATE" --grid "VAL_GRID_001" --close-of-business --log "$LOGFILE"

exec "mx_risk_run" --types "VAR,STRESS,SVAR,SENSITIVITIES" --portfolio "ALL" --asof "$VAL_DATE" --log "$LOGFILE"

exec "mx_xva_run" --asof "$VAL_DATE" --metrics "CVA,DVA,FVA,MVA" --log "$LOGFILE"

exec "mx_collateral_process" --asof "$VAL_DATE" --generate-margin-calls --optimise-inventory --auto-dispute-handling --log "$LOGFILE"

exec "mx_accounting_generate" --asof "$VAL_DATE" --entities "ALL" --post-to-subledger --log "$LOGFILE"

exec "mx_settlement_run" --asof "$VAL_DATE" --products "FX,MM,RATES,SECURITIES" --generate-swift --auto-matching --log "$LOGFILE"

exec "mx_reporting_run" --templates "EOD_PNL,DAILY_RISK,COLLATERAL,LIQUIDITY" --send-email --log "$LOGFILE"

exec "mx_archive" --folder "/logs" --retain-days 90
```

Since this is a mission-critical application/service, and SSH access is risky, we want to restrict this, and build a WebApp that would execute commands on these services by providing a standardized user-interface that would only allow certain actions based on which group he is a part of.

### User Authentication and group

The authentication is done by a third-party service (called PingID) that logs in the user via SSO with MFA. After authenticating the user, PingID sets the cookies and also sends back the name of the group that the user is part of.

A user could be in multiple groups, in which case, the highest previliged group would apply. These are the only groups that apply to our MurexManager app, in the order from lowest to highest previliged:

1. readonly-group
2. support-group
3. manager-group

The commands will be defined as either destructive or non-destructive

The `readonly-group` will only be allowed to view. Any actions

Roles

### Approvals

The information displayed in elements will GET endpoints

All destructiv

## Frontend

Technology: Reactjs, jest, Playwright, etc

The user interface (UI) should be modern and

A user will only be able to access the app if they are already logged-in via PingID, and they have one of the roles

### Top Navigation bar

- Services
- Logout

### Services Page

### Services Panel

- Expand/Collapse

## Backend

- Backend will be on AWS
- Brainstorm and come up with minimalistic but effective and secure architecture for the backend

### Database

- I feel that the data requirements are low, so DynamoDB would be suffucuent for our needs, but do suggest what you think is the best.

- Also suggest the tables and fields that would be needed. Again, I'm looking for a simple yet effective solution.

## Local Development

-
- Ideally, most of the AWS services/components should be run locally either natively or via Docker, so this should be preferred way, and if there are exceptions, we can use mock/stub/spies. Suggest the best strategy for this and reason behind this decision.

Epics and User stories I can put into JIRA

## Testing

Thorough unit tests

## Test Coverage

## Pre- and Post- hooks

Hooks that would ensure formatting, linting, and testing for defects, security, vulnerabilities, code smells, etc

Suggest the best strategy for this and reason behind this decision.
Suggest the best strategy for this and reason behind this decision.
Suggest the best strategy for this and reason behind this decision.

Again, I'm looking for a simple yet effective solution.
Again, I'm looking for a simple yet effective solution.
Again, I'm looking for a simple yet effective solution.
