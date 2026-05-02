---
name: image-analysis
description: Analyze and describe images using vision models.
---

# Image Analysis

## Setup

```bash
# Uses vision-capable LLMs via fetch_content or direct vision tool.
```

## Analyze Local Image

```bash
# Describe an image
fetch_content "./path/to/image.png" "Describe this image in detail."

# Extract text from an image (OCR)
fetch_content "./screenshot.jpg" "Extract all text from this image."
```

## Analyze Web Image

```bash
# Identify objects in a web image
fetch_content "https://example.com/photo.jpg" "What objects are present?"
```

## Workflow

1. **Select Image** — Identify the image file or URL.
2. **Define Prompt** — Specify what needs to be analyzed (description, OCR, etc.).
3. **Execute Analysis** — Use the vision tool to process the image.
4. **Interpret** — Use the results for further tasks.

## Notes

- Supports PNG, JPG, WEBP, and SVG.
- High accuracy for text extraction and object recognition.
- Can be used for UI/UX review by analyzing screenshots.
