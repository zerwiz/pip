---
name: stock-analysis
description: Analyze stock market data and financial trends using yfinance or similar tools.
---

# Stock Analysis

## Setup

```bash
# Install yfinance
pip install yfinance
```

## Fetch Stock Data

```bash
# Get current price and info for a ticker
python -c "import yfinance as yf; print(yf.Ticker('AAPL').info)"

# Get historical data
python -c "import yfinance as yf; print(yf.Ticker('TSLA').history(period='1mo'))"
```

## Analyze Trends

```bash
# Compare multiple stocks
web_search "compare AAPL and MSFT performance in 2024"
```

## Workflow

1. **Ticker Identification** — Find the correct stock symbol.
2. **Data Acquisition** — Use `yfinance` to get real-time or historical data.
3. **Technical/Fundamental Analysis** — Review metrics like P/E ratio, moving averages, and volume.
4. **Market Context** — Use `web_search` to find news affecting the stock.
5. **Report Generation** — Synthesize findings into a clear summary.

## Notes

- `yfinance` is a powerful open-source tool for financial data.
- Always verify data from multiple sources if possible.
- Use `chart-creation` skill to visualize stock trends.
