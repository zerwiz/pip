---
name: seo-writing
description: Create SEO-optimized content through keyword research and targeted writing.
---

# SEO Writing

## Setup

```bash
# No special setup. Relies on web_search and LLM capabilities.
```

## Keyword Research

```bash
# Find trending keywords
web_search "high volume keywords for 'remote work'"

# Analyze competitor SEO
fetch_content "https://competitor.com/blog-post" "Identify the primary and secondary keywords used here."
```

## Content Generation

```bash
# Generate SEO-optimized blog post
llm "Write a 1000-word blog post about 'Sustainable Gardening' using keywords: [organic, compost, native plants]. Include H1, H2 tags and meta description."
```

## Workflow

1. **Identify Topic** — Choose a niche or subject.
2. **Keyword Analysis** — Find relevant keywords with good search volume.
3. **Content Structuring** — Outline the post with SEO-friendly headings.
4. **Drafting** — Write the content, naturally integrating keywords.
5. **Optimization** — Review for meta tags, alt text, and internal linking.

## Notes

- Focus on user intent, not just keyword density.
- Ensure high readability and value.
- Regularly update content based on new trends found via `web_search`.
