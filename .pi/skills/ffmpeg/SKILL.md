---
name: ffmpeg
description: Multimedia manipulation and analysis using the ffmpeg CLI. Use for extracting frames, clipping videos, converting formats, and probing file metadata.
---

# FFmpeg Skill

## Setup

FFmpeg must be installed on the system.
```bash
# Check if ffmpeg is available
ffmpeg -version
```

## Extract Frames

```bash
# Extract 1 frame per second as images
ffmpeg -i input.mp4 -vf fps=1 out%03d.png

# Extract a specific frame at timestamp
ffmpeg -ss 00:00:05 -i input.mp4 -frames:v 1 output.jpg
```

## Extract Audio

```bash
# Extract audio as MP3 (constant bitrate)
ffmpeg -i input.mp4 -vn -acodec libmp3lame -ab 192k output.mp3

# Extract audio as WAV (lossless, good for ASR)
ffmpeg -i input.mp4 -vn -acodec pcm_s16le -ar 16000 -ac 1 output.wav
```

## Thumbnail Sheets

```bash
# Create a 4x4 tile of frames (16 total)
ffmpeg -i input.mp4 -vf "select=not(mod(n\,100)),scale=320:-1,tile=4x4" -frames:v 1 tiles.png
```

## Clip and Trim

```bash
# Cut video from start for duration
ffmpeg -i input.mp4 -ss 00:00:10 -t 00:00:30 -c copy output.mp4

# Cut video between two timestamps
ffmpeg -i input.mp4 -ss 00:00:10 -to 00:00:40 -c copy output.mp4
```

## Probe Metadata

```bash
# Get video information in JSON format
ffprobe -v quiet -print_format json -show_format -show_streams input.mp4
```

## Convert and Scale

```bash
# Convert to MP4
ffmpeg -i input.mov output.mp4

# Scale video to 720p (maintaining aspect ratio)
ffmpeg -i input.mp4 -vf scale=1280:-2 output_720p.mp4
```

## Stream Management

```bash
# Remove audio from video
ffmpeg -i input.mp4 -an -c:v copy output_no_audio.mp4

# Remove video (keep only audio, alternative to extraction)
ffmpeg -i input.mp4 -vn -c:a copy output_audio_only.m4a
```

## Optimization

```bash
# Compress video using H.264 (CRF 23 is standard, higher is lower quality)
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output_compressed.mp4
```

## Multimedia Workflow

1. **Probe** — Use `ffprobe` to understand the file structure (duration, resolution, codecs).
2. **Process** — Apply `ffmpeg` transformations (extract frames for analysis, clip relevant segments).
3. **Verify** — Check the output file size and metadata to ensure success.
4. **Clean** — Remove intermediate artifacts (like extracted frames) after analysis is complete.

## Notes

- Use `-c copy` whenever possible to avoid re-encoding and speed up processing.
- For AI analysis, extracting 1 frame every few seconds is usually sufficient.
- Always check available disk space before batch extraction of frames.
