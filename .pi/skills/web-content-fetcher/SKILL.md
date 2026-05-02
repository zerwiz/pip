---
name: web-content-fetcher
description: Fetch and extract content from web pages, GitHub repositories, and YouTube videos.
---

# Web Content Fetcher

## Setup

```bash
# Ensure pi-web-access is available.
```

## Fetch Web Page Content

```bash
# Fetch a standard article
fetch_content "https://example.com/article"

# Fetch content and ask a specific question
fetch_content "https://example.com/docs" "How do I install the CLI?"
```

## Special Source Fetching

```bash
# Fetch a GitHub repository
fetch_content "https://github.com/owner/repo"

# Fetch YouTube video transcript and info
fetch_content "https://youtube.com/watch?v=abc"
```

## Workflow

1. **Obtain URL** — Get the target link.
2. **Extract Content** — Use `fetch_content` to get the text or data.
3. **Analyze** — Process the extracted content for relevant info.
4. **Synthesize** — Combine information with other sources if necessary.

## Notes

- Supports HTML, Markdown, and plain text extraction.
- Handles dynamic content rendering.
- Automatically caches results to improve performance.
