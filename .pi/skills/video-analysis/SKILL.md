---
name: video-analysis
description: Analyze video content using ffmpeg for frame extraction and vision models for interpretation.
---

# Video Analysis

## Setup

```bash
# Install ffmpeg
sudo apt-get install ffmpeg
```

## Extract Frames for Analysis

```bash
# Extract frames every 10 seconds
ffmpeg -i video.mp4 -vf fps=1/10 thumb%04d.jpg

# Analyze a specific frame
fetch_content "thumb0001.jpg" "What is happening in this scene?"
```

## Analyze Video with Vision Model

```bash
# Direct video analysis (if supported by model)
fetch_content "https://example.com/video.mp4" "Summarize the events in this video."
```

## Workflow

1. **Prepare Video** — Download or locate the video file.
2. **Extract Keyframes** — Use `ffmpeg` to capture important moments.
3. **Vision Processing** — Analyze frames using vision-capable LLMs.
4. **Synthesize Timeline** — Combine frame descriptions into a coherent summary.

## Notes

- `ffmpeg` is essential for handling various video formats and frame extraction.
- YouTube videos can be analyzed directly via `fetch_content`.
- Frame-by-frame analysis is useful for detailed action recognition.
