---
name: ui-design
description: Design user interfaces and user experiences with wireframing and component specifications.
---

# UI Design

## Setup

```bash
# No special setup. Relies on design principles and LLM for specs.
```

## Wireframing and Layout

```bash
# Generate a wireframe description
llm "Create a low-fidelity wireframe layout for a mobile fitness app dashboard."

# Component Specifications
llm "Write detailed CSS and layout specifications for a 'Dark Mode' toggle switch."
```

## Design Feedback

```bash
# Analyze a screenshot for UI improvements
fetch_content "current_ui.png" "Review this UI for accessibility and spacing. Suggest 5 improvements."
```

## Workflow

1. **Define User Goals** — Understand what the user needs to achieve.
2. **Information Architecture** — Map out the flow and structure.
3. **Wireframing** — Create low-fidelity layouts to test structure.
4. **High-Fidelity Design** — Define colors, typography, and components.
5. **Specification** — Generate CSS/HTML or React code for implementation.

## Notes

- Focus on usability and accessibility (WCAG standards).
- Maintain consistency across components.
- Use `vision-language` skills to review and iterate on designs.
