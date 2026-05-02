---
name: market-research
description: Conduct comprehensive market analysis using web search and synthesis.
---

# Market Research

## Setup

```bash
# No special setup. Relies on web_search and fetch_content.
```

## Industry Analysis

```bash
# Search for market reports
web_search "EV market growth 2024-2030 report"

# Competitor analysis
web_search "top competitors in the SaaS CRM space"
```

## Trend Identification

```bash
# Identify consumer trends
web_search "consumer behavior trends in fashion for 2025"
```

## Workflow

1. **Define Scope** — Determine the industry, region, and specific questions.
2. **Data Gathering** — Use `web_search` to find reports, news, and competitor data.
3. **Content Extraction** — Use `fetch_content` to get details from specific pages.
4. **Synthesis** — Combine data points into a SWOT analysis or market overview.

## Notes

- Cross-reference multiple sources for accuracy.
- Look for both qualitative (trends) and quantitative (market size) data.
- Use `web_search` with `--recency` filters to get the most current info.
