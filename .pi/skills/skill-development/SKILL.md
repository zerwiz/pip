---
name: skill-development
description: Standardized creation and improvement of Pi skills using SKILL.md templates.
---

# Skill Development

## Setup

```bash
# No special setup. Relies on SKILL.md templates in .pi/templates/skills/.
```

## Create New Skill

```bash
# Generate a new SKILL.md based on a description
llm "Create a SKILL.md file for a 'Python-Expert' skill that focuses on code optimization and testing."

# Standardize existing notes into a skill
cat notes.txt | llm "Transform these notes into a standardized Pi skill format."
```

## Improve Existing Skill

```bash
# Add new functions to a skill
llm "Add a 'Security Audit' section to the '.pi/skills/web-search/SKILL.md' file."
```

## Workflow

1. **Identify Need** — Determine a new capability required by the agent.
2. **Draft Content** — Use the standard `SKILL.md` structure (Frontmatter, Setup, Functions, Workflow, Notes).
3. **Validate** — Ensure examples are correct and English-only.
4. **Deploy** — Save to `.pi/skills/<skill-name>/SKILL.md`.

## Notes

- Always follow the template in `.pi/templates/skills/`.
- Ensure all bash examples are runnable.
- Keep descriptions concise and action-oriented.
