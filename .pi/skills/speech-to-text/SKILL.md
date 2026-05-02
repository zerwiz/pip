---
name: speech-to-text
description: Convert audio speech into written text using Whisper or similar CLI tools.
---

# Speech to Text

## Setup

```bash
# Install Whisper CLI
pip install -U openai-whisper
```

## Transcribe Audio

```bash
# Basic transcription
whisper audio.mp3 --model small

# Transcribe with language detection
whisper meeting_record.wav --task transcribe --language English
```

## Extract Audio from Video

```bash
# Extract audio using ffmpeg before transcription
ffmpeg -i video.mp4 -q:a 0 -map a audio.mp3
```

## Workflow

1. **Source Audio** — Identify the audio file or extract it from video.
2. **Choose Model** — Select a model size (tiny, base, small, medium, large) based on accuracy needs.
3. **Transcribe** — Run the `whisper` command.
4. **Post-process** — Clean up the transcript and use it for summarization or notes.

## Notes

- Whisper supports multiple languages and translation.
- `small` or `base` models are usually sufficient for clear audio.
- Use `ffmpeg` to pre-process audio (normalize volume, remove noise) if needed.
- Frame-by-frame analysis is useful for detailed action recognition.
