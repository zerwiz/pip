# Migration Guide: Agent Extension Architecture

## Overview

This guide documents the current extension architecture and how to work with it. All extensions in `.pi/extensions/` are loaded via the justfile's dynamic loader (`pi-loader.ts`), not with `pi -e`.

---

## Extension Loading

### How It Works

```bash
just ext-agent-team
  → PI_STACK="agent-team,theme-cycler"
  → pi -e .pi/extensions/util/pi-loader.ts
  → pi-loader.ts resolves, categorizes, and initializes each extension
```

### Directory Structure

```
.pi/extensions/
├── src/ui/          # Base layer — shared UI components (10 files)
├── util/            # Middle layer — utilities (12 files)
└── ui/              # Entry layer — primary extensions (6 files)
```

### Path Resolution

When `pi-loader.ts` looks for an extension by name, it searches:

```
1. extensions/<name>.ts
2. extensions/<name>.js
3. .pi/extensions/<name>.ts
4. .pi/extensions/ui/<name>.ts
5. .pi/extensions/util/<name>.ts
6. .pi/extensions/src/ui/<name>.ts
```

---

## Current Extension Inventory

### Entry Layer (`ui/` — 6 files)

| File | Purpose | Category |
|------|---------|----------|
| `agent-team.ts` | Agent team management, memory export, team switching | `ui-core` |
| `agent-chain.ts` | Sequential pipeline orchestrator | `function` |
| `cross-agent.ts` | Cross-agent command/skill discovery | `function` |
| `pi-pi.ts` | Meta-agent with parallel research experts | `function` |
| `subagent-widget.ts` | Background subagents with live widgets | `ui-widget` |
| `tilldone.ts` | Task discipline system with progress tracking | `function` |

### Middle Layer (`util/` — 12 files)

| File | Purpose | Category |
|------|---------|----------|
| `pi-loader.ts` | Dynamic extension loader (orchestrator) | — |
| `manifest.ts` | Extension categories and metadata | — |
| `types.ts` | Shared type definitions | — |
| `memory.ts` | Memory inspection utilities | `function` |
| `memory-export.ts` | Memory export (JSON, text, markdown) | — |
| `memory-tools.ts` | Memory handling tools | — |
| `damage-control.ts` | Error recovery and safety auditing | `function` |
| `agent-switch.ts` | Agent switching implementation | — |
| `purpose-gate.ts` | Purpose gate / intent declaration | `ui-widget` |
| `system-select.ts` | System/persona selection | `utility` |
| `session-replay.ts` | Session timeline replay | `ui-widget` |
| `justfilechain` | Chain validation script | — |

### Base Layer (`src/ui/` — 10 files)

| File | Purpose | Category |
|------|---------|----------|
| `themeMap.ts` | Theme definitions (universal dependency) | `utility` |
| `theme-cycler.ts` | Theme cycling commands | `function` |
| `pure-focus.ts` | Focus mode toggle | `ui-core` |
| `minimal.ts` | Minimal extension loader | `ui-core` |
| `tool-counter.ts` | Tool usage tracking | — |
| `tool-counter-widget.ts` | Tool counter widget | `ui-widget` |
| `conversation-viewer.ts` | Conversation history viewer | — |
| `conversation-viewer.test.ts` | Viewer tests | — |
| `manager.ts` | UI manager | — |
| `agent-team-chain.ts` | Deprecated wrapper for agent-team | — |

---

## Manifest Categories

Defined in `.pi/extensions/util/manifest.ts`:

| Category | Behavior | Extensions |
|----------|----------|------------|
| `ui-core` | Only one allowed (last wins) | agent-team, minimal, pure-focus |
| `ui-widget` | Stackable — each gets its own widget | subagent-widget, tool-counter-widget, session-replay, purpose-gate |
| `function` | Background logic and hooks | damage-control, theme-cycler, memory, agent-chain, cross-agent, tilldone, pi-pi |
| `utility` | Helper modules | system-select, themeMap |

---

## Recommended Usage

### Basic

```bash
just ext-minimal           # minimal,theme-cycler
just ext-agent-team        # agent-team,theme-cycler
just ext-agent-chain       # agent-chain,theme-cycler
just ext-full-stack        # agent-team,damage-control,theme-cycler
```

### Custom Stack

```bash
just stack "agent-team,damage-control,theme-cycler"
```

---

## Memory System

### Memory Scopes

| Scope | Location | Use Case |
|-------|----------|----------|
| **user** | `~/.pi/agent-memory/` | Global knowledge |
| **project** | `.pi/agent-memory/` | Repo-specific |
| **local** | `.pi/agent-memory-local/` | Dev-only overrides |

### Export Commands

| Command | Output |
|---------|--------|
| `memory-export:json` | `.pi/memory-export.json` |
| `memory-export:text` | `.pi/memory-export.txt` |
| `memory-export:md` | `.pi/memory-export.md` |
| `memory-export:preview` | Preview only |
| `memory-export:stats` | Export statistics |
| `memory-export:filtered` | Filtered export |

---

## Agent System

### YAML Files

| File | Purpose |
|------|---------|
| `.pi/agents/agents.yaml` | Master agent registry (30 agents) |
| `.pi/agents/teams.yaml` | Team rosters (13 teams) |
| `.pi/agents/agent-chain.yaml` | Pipeline chains (14 chains) |
| `.pi/agents/session-manager.yaml` | Session workflows |
| `.pi/agents/reviewer.yaml` | Standalone agent with model + prompt |
| `.pi/teams.yaml` | Legacy team definitions (6 teams) |
| `.pi/damage-control-rules.yaml` | Safety rules (60+ patterns) |

---

## Adding New Extensions

1. Place your `.ts` file in the appropriate directory:
   - `ui/` — Primary entry-point extensions
   - `util/` — Utility functions and shared tools
   - `src/ui/` — UI components and themes

2. Export a default async function:
   ```typescript
   import { ExtensionAPI } from "@mariozechner/pi-coding-agent";

   export default async function (pi: ExtensionAPI) {
     // Your extension code
   }
   ```

3. Register in `util/manifest.ts` for categorized loading:
   ```typescript
   'my-extension': { name: 'My Extension', category: 'function' },
   ```

4. Add a justfile target:
   ```justfile
   ext-my-extension:
       @just run-pi "my-extension,theme-cycler"
   ```

---

## Known Issues

- `agent-team-chain.ts` in `src/ui/` is a deprecated wrapper — use `agent-team.ts` directly
- `agents/teams.yaml` (13 teams) supersedes root `teams.yaml` (6 teams)
- Some agent `.md` files are duplicated (e.g., `netlify.md` and `netlify-agent.md`)

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| [STRUCTURE.md](STRUCTURE.md) | Complete project file tree |
| [CHECKLIST.md](CHECKLIST.md) | Daily operational checklist |
| [JUSTFILE-STARTUP-MECHANISM.md](JUSTFILE-STARTUP-MECHANISM.md) | How extensions are launched |
| [AGENT-YAML-CONFIGURATION.md](AGENT-YAML-CONFIGURATION.md) | Agent YAML files explained |
| [COMBINED-EXTENSIONS-USAGE.md](COMBINED-EXTENSIONS-USAGE.md) | Full extension usage maps |
| [UPDATE-2026-05-02.md](UPDATE-2026-05-02.md) | Latest system update log |
