---
name: vision-language
description: Perform complex tasks that combine visual understanding with language generation.
---

# Vision-Language

## Setup

```bash
# Uses vision-capable LLMs (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro).
```

## Visual Question Answering

```bash
# Ask about a complex diagram
fetch_content "diagram.png" "Explain the workflow shown in this architecture diagram."

# Compare two images
fetch_content "image1.jpg" "Compare this image with image2.jpg and list differences."
```

## Visual Reasoned Generation

```bash
# Generate code from a mockup
fetch_content "ui_mockup.png" "Write the React and CSS code for this UI component."
```

## Workflow

1. **Input Visuals** — Provide image(s) or video frames.
2. **Contextual Prompting** — Provide a prompt that requires both visual and textual reasoning.
3. **Reasoning** — The model analyzes visual features and relates them to language concepts.
4. **Output Generation** — Generate text, code, or structured data based on the analysis.

## Notes

- Useful for automated testing, documentation generation, and accessibility.
- Works best when prompts are specific about which visual elements to focus on.
