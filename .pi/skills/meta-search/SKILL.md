---
name: meta-search
description: Advanced multi-engine search for comprehensive information retrieval.
---

# Meta Search

## Setup

```bash
# No special setup. Relies on multiple web_search calls and synthesis.
```

## Comprehensive Retrieval

```bash
# Search multiple engines/sources
web_search "quantum gravity theories" && web_search "site:wikipedia.org 'quantum gravity'"

# Aggregated Search
llm "Combine results from these 3 searches into a single comprehensive overview: [search results...]"
```

## Deep Web Searching

```bash
# Search for niche forums or discussions
web_search "site:reddit.com 'best mechanical keyboards for coding'"
```

## Workflow

1. **Query Decomposition** — Break a complex query into multiple simpler ones.
2. **Parallel Search** — Run `web_search` across different keywords and site filters.
3. **Aggregation** — Collect all results into a single context.
4. **Deduplication** — Remove redundant information.
5. **Synthesis** — Create a high-signal summary from the diverse sources.

## Notes

- Meta-searching reduces the risk of missing critical information.
- Useful for deep-dive investigations and hard-to-find facts.
- Combine with `research-tools` for maximum effectiveness.
