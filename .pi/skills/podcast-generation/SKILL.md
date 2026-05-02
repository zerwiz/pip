---
name: podcast-generation
description: Create podcast scripts and generate audio using TTS.
---

# Podcast Generation

## Setup

```bash
# Install TTS library (optional, or use API)
pip install openai
```

## Generate Podcast Script

```bash
# Research and script generation
web_search "latest tech trends" | llm "Write a 5-minute podcast script for two hosts discussing these trends."
```

## Generate Audio

```bash
# Generate audio using TTS (example with OpenAI API)
# llm --tts "Hello, welcome to our podcast!" --voice alloy --output intro.mp3
```

## Workflow

1. **Topic Research** — Use `web_search` to gather interesting facts.
2. **Script Writing** — Create a conversational script with host personas.
3. **TTS Conversion** — Convert script segments into audio files.
4. **Mixing** — Use `ffmpeg` to combine audio segments with intro/outro music.

## Notes

- Focus on natural-sounding host interactions.
- Use distinct voices for different hosts.
- `ffmpeg` is useful for stitching segments and adding background music.
