---
name: academic-search
description: Search for and analyze academic papers and scholarly research.
---

# Academic Search

## Setup

```bash
# No special setup. Relies on web_search and specialized academic engines.
```

## Scholarly Research

```bash
# Search for papers on a specific topic
web_search "site:arxiv.org 'large language models reasoning'"

# Find highly cited papers
web_search "most influential papers on 'transformer architecture' 2017-2024"
```

## Abstract Analysis

```bash
# Extract and summarize a paper abstract
fetch_content "https://arxiv.org/abs/1706.03762" | llm "Summarize the core contribution of this paper in 3 sentences."
```

## Workflow

1. **Identify Topic** — Define the research area or specific question.
2. **Search Scholarly Sources** — Use `web_search` with site-specific filters (arxiv.org, scholar.google.com, etc.).
3. **Review Abstracts** — Use `fetch_content` to read abstracts and identify relevant papers.
4. **Deep Dive** — Extract full text or key sections for detailed analysis.
5. **Cite and Synthesize** — Summarize findings with proper academic citations.

## Notes

- ArXiv is the primary source for fast-moving AI research.
- Use `content-analysis` for comparing multiple papers.
- Always verify the publication date and venue (peer-reviewed vs. preprint).
