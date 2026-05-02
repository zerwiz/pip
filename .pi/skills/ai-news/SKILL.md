---
name: ai-news
description: Collect and synthesize the latest news in the field of Artificial Intelligence.
---

# AI News

## Setup

```bash
# No special setup. Relies on web_search and content-analysis.
```

## News Collection

```bash
# Find latest AI breakthroughs
web_search "latest major AI research breakthroughs this week"

# Monitor specific companies
web_search "OpenAI latest product announcements"
```

## Synthesis and Reporting

```bash
# Summarize AI news for a newsletter
web_search "AI news today" | llm "Provide a 3-bullet summary of the most important AI news from the last 24 hours."
```

## Workflow

1. **Query Definition** — Specify the area of AI (LLMs, Robotics, Ethics, etc.).
2. **Information Retrieval** — Use `web_search` with `--recency` filters.
3. **Filtering** — Identify high-impact news from reputable sources.
4. **Summarization** — Use `content-analysis` to create concise updates.
5. **Distribution** — Format the news for a blog post, newsletter, or briefing.

## Notes

- AI is a fast-moving field; recency filters are essential.
- Cross-reference social media (X/Twitter) and research papers (ArXiv) for early news.
- Use `academic-search` for deeper dives into research news.
