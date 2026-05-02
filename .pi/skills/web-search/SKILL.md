---
name: web-search
description: Multi-engine web search to find information across the internet.
---

# Web Search

## Setup

```bash
# Ensure pi-web-access is available
# No additional setup required if pi-web-access extension is active.
```

## Search across Engines

```bash
# Basic search
web_search "latest AI news"

# Search with specific number of results
web_search "best open source LLMs" 5

# Search recent results
web_search "current stock prices" --recency day
```

## Advanced Search

```bash
# Search for specific file types
web_search "filetype:pdf machine learning research"

# Search within a specific site
web_search "site:github.com 'pi-web-access'"
```

## Workflow

1. **Identify Query** — Determine what information is needed.
2. **Execute Search** — Use `web_search` with relevant keywords.
3. **Review Results** — Look for high-quality, relevant sources.
4. **Refine** — If results are too broad, add specific keywords or filters.

## Notes

- Uses multiple engines for comprehensive coverage.
- Automatically handles rate limiting and retries.
- Integrates with `fetch_content` for deep dives.
