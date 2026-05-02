---
name: research-tools
description: General assistance for various research tasks, including data gathering and verification.
---

# Research Tools

## Setup

```bash
# No special setup. Relies on web_search, fetch_content, and content-analysis.
```

## Data Gathering

```bash
# Find statistics and data points
web_search "global smartphone market share by vendor 2023"

# Verify Source Credibility
llm "Evaluate the credibility and potential bias of the source: https://example-blog.com/report"
```

## Fact Verification

```bash
# Cross-reference claims
web_search "verify claim: 'caffeine improves long-term memory'"
```

## Workflow

1. **Define Question** — Be specific about what needs to be researched or verified.
2. **Multi-Source Search** — Use `web_search` to find multiple perspectives and data points.
3. **Extraction and Comparison** — Use `fetch_content` to get details and compare them for consistency.
4. **Verification** — Check the reliability of the sources.
5. **Synthesis** — Provide a clear, evidence-based answer.

## Notes

- Use `meta-search` for more comprehensive results.
- Always cite sources for every major claim.
- Helpful for technical research, investigative journalism, and academic support.
