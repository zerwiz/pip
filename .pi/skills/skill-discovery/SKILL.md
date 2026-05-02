---
name: skill-discovery
description: Locate and explore available skills within the Pi workspace.
---

# Skill Discovery

## Setup

```bash
# No special setup.
```

## Search Available Skills

```bash
# List all installed skills
ls .pi/skills/

# Find skills related to a topic
grep -r "video" .pi/skills/ --include="SKILL.md"
```

## Read Skill Capabilities

```bash
# Read the documentation for a specific skill
cat .pi/skills/web-search/SKILL.md
```

## Workflow

1. **Identify Goal** — Determine what capability is needed.
2. **Search** — Use `ls` or `grep` to find relevant skills in `.pi/skills/`.
3. **Review** — Read the `SKILL.md` to understand how to use it.
4. **Implement** — Incorporate the skill into the current task.

## Notes

- Skills are the building blocks of Pi agent capabilities.
- Check `.pi/templates/skills/` for inspiration if a skill doesn't exist yet.
- Regularly audit `.pi/skills/` to remove redundant or outdated skills.
