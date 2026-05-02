---
name: content-analysis
description: Deep summarization, theme extraction, and sentiment analysis of large content volumes.
---

# Content Analysis

## Setup

```bash
# No special setup. Relies on LLM capabilities and fetch_content.
```

## Summarization and Extraction

```bash
# Summarize a long document
fetch_content "large_report.pdf" | llm "Provide a concise executive summary and list the top 5 takeaways."

# Theme Extraction
llm "Identify the recurring themes and arguments in these 10 customer interview transcripts: [transcripts...]"
```

## Sentiment and Bias Analysis

```bash
# Analyze sentiment
llm "Analyze the sentiment of these social media mentions for '@brandname'. Categorize as Positive, Neutral, or Negative."

# Detect Bias
llm "Review this article for potential political or commercial bias. Highlight specific phrases."
```

## Workflow

1. **Ingest Content** — Use `fetch_content` or direct text input.
2. **Define Analysis Type** — Choose between summary, theme extraction, sentiment, or bias check.
3. **Execute Analysis** — Run the prompt through the LLM.
4. **Synthesize** — Combine findings into a structured report.

## Notes

- Useful for processing large volumes of feedback, research papers, or news articles.
- Works best when the analysis criteria are clearly defined.
- Combine with `web-search` for comparative content analysis.
