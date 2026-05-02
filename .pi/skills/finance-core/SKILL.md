---
name: finance-core
description: Real-time and historical financial data analysis using web tools.
---

# Finance Core

## Setup

```bash
# Relies on pi-web-access for data retrieval.
```

## Market Analysis

```bash
# Fetch latest market indices
web_search "S&P 500, NASDAQ, DJIA current levels"

# Analyze currency data
web_search "USD to EUR exchange rate historical trend last 30 days"
```

## Stock Screening

```bash
# Screen stocks based on P/E ratio and sector
web_search "high growth tech stocks with P/E ratio under 30"
```

## Data Retrieval

```bash
# Fetch detailed financial statements
fetch_content "https://www.marketwatch.com/investing/stock/aapl/financials"
```

## Workflow

1. **Market Scanning** — Use `web_search` to get a high-level overview of market indices and currency data.
2. **Target Screening** — Apply specific criteria (P/E ratio, sector, growth) to find potential investment targets.
3. **Deep Dive** — Use `fetch_content` to retrieve detailed financial statements, news, or reports.
4. **Synthesis** — Analyze the gathered data to provide a comprehensive financial report or recommendation.

## Notes

- Always verify data from multiple sources.
- Use `pi-web-access` for all real-time data needs.
- Historical data can be sourced from reliable financial news outlets or public databases.
