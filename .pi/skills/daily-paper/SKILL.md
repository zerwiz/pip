---
name: daily-paper
description: Summarize the most important academic papers published each day.
---

# Daily Paper

## Setup

```bash
# No special setup. Relies on academic-search and content-analysis.
```

## Daily Briefing

```bash
# Find papers published in the last 24 hours
web_search "site:arxiv.org new papers in 'cs.CL' (Computation and Language) today"

# Generate a daily summary
web_search "latest AI papers on ArXiv" | llm "Identify the 3 most significant papers from today and provide a 1-sentence summary for each."
```

## Trend Monitoring

```bash
# Identify trending topics in research
web_search "most discussed AI papers on Twitter/X in the last 48 hours"
```

## Workflow

1. **Monitor Sources** — Regularly check ArXiv, Semantic Scholar, or news aggregators.
2. **Filter by Relevance** — Select papers within the specified domains of interest.
3. **Summarization** — Use `academic-search` logic to summarize the daily top picks.
4. **Briefing Generation** — Compile the summaries into a daily report or newsletter.

## Notes

- Focus on 'cs.CL', 'cs.CV', and 'cs.LG' for most AI-related developments.
- Use `web_search` to find community discussions (X, Reddit) about new papers.
- Helpful for staying at the cutting edge without reading every full paper.
