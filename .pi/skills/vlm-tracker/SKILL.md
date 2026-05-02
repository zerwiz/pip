---
name: vlm-tracker
description: Automatically detect and analyze task-related images using Vision Language Models (VLM).
---

# VLM Tracker

## Setup

```bash
# Ensure a VLM-capable model is available (e.g., gpt-4o, gemini-1.5-pro).
```

## Image Detection

```bash
# Detect and categorize task-related images in a directory
llm "Analyze the images in './uploads/' and identify which ones are fitness logs, handwritten notes, or code screenshots."
```

## Data Extraction

```bash
# Extract statistics from a fitness log image
llm "Extract the workout date, exercises, sets, reps, and weights from this image: [image path/content]."
```

## Logging

```bash
# Format and log extracted data to a journal
llm "Format the following extracted data into a Markdown table and append it to 'JOURNAL.md': [extracted data]."
```

## Workflow

1. **Image Detection** — Identify relevant images (notes, logs, screenshots) in the workspace.
2. **VLM Recognition** — Use VLM to extract specific stats, progress, or content from the images.
3. **Data Structuring** — Organize the extracted information into a structured format (JSON, Markdown).
4. **Log to Daily Journal** — Automatically append the structured data to a central log or journal file.

## Notes

- Excellent for digitizing physical notes and logs.
- Can be used for tracking progress over time (e.g., weightlifting, coding streaks).
- Requires clear images for optimal recognition accuracy.
