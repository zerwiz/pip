---
name: shader-extraction
description: Extract and analyze GLSL shaders from web pages and applications.
---

# Shader Extraction

## Setup

```bash
# Install tools for web inspection (optional)
# No specific CLI setup required for analysis.
```

## Shader Retrieval

```bash
# Extract shader code from a URL (requires browser-automation or fetch_content)
fetch_content "https://shadertoy.com/view/abc" "Extract the GLSL fragment shader code."

# Analyze Shader Logic
llm "Explain the mathematical logic used in this GLSL fragment shader: [shader code...]"
```

## Shader Optimization

```bash
# Suggest optimizations
llm "Suggest 3 ways to optimize this shader for mobile performance: [shader code...]"
```

## Workflow

1. **Target Identification** — Find the web page or file containing the shader.
2. **Extraction** — Use `browser-automation` or `fetch_content` to retrieve the GLSL code.
3. **Analysis** — Deconstruct the shader logic (vertex/fragment, uniforms, varying).
4. **Interpretation** — Explain what the shader does and how it achieves its visual effect.
5. **Optimization/Porting** — Modify the shader for different platforms or performance needs.

## Notes

- GLSL (OpenGL Shading Language) is the standard for web-based graphics.
- Use `chart-creation` (Mermaid) to map out complex shader pipelines.
- Vision models can help describe what the shader *visually* produces.
