---
name: gift-advisor
description: Expert gift recommendation based on recipient profiling and sentiment analysis.
---

# Gift Advisor

## Setup

```bash
# No special setup. Relies on recipient profiling and market research.
```

## Discovery

```bash
# Profile the recipient
llm "Create a recipient profile for a 30-year-old male who loves minimalist design, mechanical keyboards, and brewing espresso. Occasion: 10th Wedding Anniversary."
```

## Sentiment Analysis

```bash
# Analyze recent interests or social cues
llm "Analyze these recent messages/posts from the recipient to identify current interests, needs, or 'wishlist' items: [content]."
```

## Recommendation

```bash
# Generate tailored gift recommendations with reasoning
llm "Based on the profile [profile], recommend 3 unique gifts with detailed reasoning for each, including price range and where to buy."
```

## Workflow

1. **Discovery** — Gather information about the recipient's personality, interests, and the occasion.
2. **Sentiment Analysis** — Analyze any provided text or social data to find hidden clues or current desires.
3. **Recommendation with Reasoning** — Provide a curated list of gifts, explaining exactly why each one fits the recipient's profile.
4. **Refinement** — Adjust recommendations based on budget or availability.

## Notes

- Use `web_search` from `pi-web-access` to find current prices and availability.
- Focus on "meaningful" gifts that align with the recipient's "ghost" (past experiences) or future aspirations.
