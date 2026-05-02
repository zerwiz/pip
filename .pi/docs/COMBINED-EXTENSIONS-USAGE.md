# Combined Extension Usage Map

## Purpose

This document provides a unified view of all three extension directories in `.pi/extensions/`:
- `src/ui/` — Source UI components and themes
- `util/` — Utility functions and loaders
- `ui/` — Primary entry-point extensions

---

## Directory Overview

| Directory | Files | Role | Import Profile |
|-----------|-------|------|----------------|
| `src/ui/` | 11 | Shared UI components, themes, and utilities | Import **dependencies** (consumed by other dirs) |
| `util/` | 12 | Utility functions, memory management, loaders | Both import and export (middle layer) |
| `ui/` | 6 | Primary entry-point extensions | Mostly standalone entry points |

---

## Shared Dependencies (Consumed Across Directories)

### `themeMap.ts` (`src/ui/`)

**Consumers across all directories:**

| Consumer | Directory | How Used |
|----------|-----------|----------|
| `agent-team.ts` | `ui/` | `applyTheme`, `getTheme`, `getCurrentTheme` |
| `agent-team-chain.ts` | `src/ui/` | `getTheme`, `applyTheme` |
| `agent-switch.ts` | `util/` | `getTheme` |
| `damage-control.ts` | `util/` | `applyTheme`, `getTheme` |
| `pi-loader.ts` | `util/` | `applyTheme` |
| `memory-tools.ts` | `util/` | `applyTheme`, `getTheme` |

### `memory-export.ts` (`util/`)

**Consumers across all directories:**

| Consumer | Directory | How Used |
|----------|-----------|----------|
| `agent-team.ts` | `ui/` | `exportToJSON`, `exportToText`, `exportToMD`, `exportStats`, `exportFiltered`, `getReadFiles`, `getCreatedFiles`, `exportMemory`, `listExportFormats`, `cleanupExports` |
| `agent-chain.ts` | `ui/` | `buildMemoryBlock`, `buildReadOnlyMemoryBlock` |
| `subagent-widget.ts` | `ui/` | `buildMemoryBlock` |
| `memory-tools.ts` | `util/` | `handleMemoryExport` |

### `memory.ts` (`util/`)

**Consumers across all directories:**

| Consumer | Directory | How Used |
|----------|-----------|----------|
| `agent-team.ts` | `ui/` | `inspectMemory` |

---

## File Inventory by Category

### Theme & Visual

| File | Directory | Description |
|------|-----------|-------------|
| `themeMap.ts` | `src/ui/` | Theme definitions, apply/get theme functions, `ThemeContext`, `ThemeManager`, `themeManager` |
| `theme-cycler.ts` | `src/ui/` | Theme cycling command (`/cycle-theme`, `/next-theme`, `/prev-theme`) |
| `pure-focus.ts` | `src/ui/` | Focus mode toggle, visual noise reduction |

### Agent Management

| File | Directory | Description |
|------|-----------|-------------|
| `agent-team.ts` | `ui/` | Core agent team management, memory export tools, team switching |
| `agent-switch.ts` | `util/` | Complete agent switching implementation |
| `agent-team-chain.ts` | `src/ui/` | Deprecated wrapper, imports from `agent-team.ts` |

### Pipeline & Orchestration

| File | Directory | Description |
|------|-----------|-------------|
| `agent-chain.ts` | `ui/` | Sequential pipeline orchestrator, `/chain` command |
| `pi-loader.ts` | `util/` | Extension loader, validates and loads extensions |

### Memory & Data

| File | Directory | Description |
|------|-----------|-------------|
| `memory.ts` | `util/` | Memory inspection utilities |
| `memory-export.ts` | `util/` | Memory export in JSON, text, markdown, stats formats |
| `memory-tools.ts` | `util/` | Memory handling tools, uses `memory-export.ts` |

### Discovery & Integration

| File | Directory | Description |
|------|-----------|-------------|
| `cross-agent.ts` | `ui/` | Cross-agent command/skill discovery across `.claude/`, `.gemini/`, `.codex/` |
| `pi-pi.ts` | `ui/` | Meta-agent builder with parallel research experts |

### Task & Subagent Management

| File | Directory | Description |
|------|-----------|-------------|
| `tilldone.ts` | `ui/` | Task discipline system, persistent task list with progress |
| `subagent-widget.ts` | `ui/` | `/sub` command for background subagents with live widgets |

### Utilities & Controls

| File | Directory | Description |
|------|-----------|-------------|
| `damage-control.ts` | `util/` | Error recovery and damage control utilities |
| `minimal.ts` | `src/ui/` | Minimal extension loader |
| `tool-counter.ts` | `src/ui/` | Tool usage tracking |
| `conversation-viewer.ts` | `src/ui/` | Conversation history viewer |
| `command-history.ts` | `src/ui/` | Command history tracking |
| `justfilechain` | `util/` | Justfile chain validation and execution |

---

## Import Dependency Graph

```
ui/ (Entry Points)
├── agent-team.ts ──────────────────────────┐
│   ├──→ ../src/ui/themeMap.ts              │
│   ├──→ ../util/memory-export.ts ──────────┼──→ ../src/ui/themeMap.ts
│   └──→ ../util/memory.ts ─────────────────┤
│                                            │
├── agent-chain.ts ──────────────────────────┼── (standalone, no internal imports)
├── cross-agent.ts ──────────────────────────┤
├── pi-pi.ts ────────────────────────────────┤
├── subagent-widget.ts ──────────────────────┤
└── tilldone.ts ─────────────────────────────┘

src/ui/ (Components)
├── themeMap.ts ───────── (leaf, no internal imports)
├── theme-cycler.ts ──→ ./themeMap.ts
├── pure-focus.ts ────→ ./themeMap.ts
├── minimal.ts ─────── (standalone)
├── tool-counter.ts ── (standalone)
├── conversation-viewer.ts ── (standalone)
├── command-history.ts ──── (standalone)
└── agent-team-chain.ts ──→ ../../ui/agent-team.ts
                           └──→ ../src/ui/themeMap.ts

util/ (Utilities)
├── memory.ts ──────── (standalone)
├── memory-export.ts ─ (standalone)
├── memory-tools.ts ──→ ./memory-export.ts
├── agent-switch.ts ──→ ../src/ui/themeMap.ts
├── damage-control.ts ─→ ../src/ui/themeMap.ts
├── pi-loader.ts ─────→ ../src/ui/themeMap.ts
└── justfilechain ──── (references agent-team.ts, agent-team-chain.ts)
```

---

## Usage Patterns

### Common Extension Combinations

| Combination | Purpose |
|-------------|---------|
| `agent-team.ts + agent-team-chain.ts + theme-cycler.ts + damage-control.ts` | Full agent team with theming and error recovery |
| `cross-agent.ts + minimal.ts` | Cross-agent discovery with minimal footprint |
| `subagent-widget.ts + pure-focus.ts + theme-cycler.ts` | Background subagents with focus mode |
| `tilldone.ts + theme-cycler.ts` | Task management with theming |
| `agent-chain.ts + theme-cycler.ts` | Pipeline orchestration with theming |
| `pi-pi.ts + theme-cycler.ts` | Meta-agent building with theming |

### Load Commands

> **Pi 0.70.5+ Warning:** Stacking multiple `-e` flags (`pi -e ext1.ts -e ext2.ts`) is unstable. Always use the justfile pattern below.

```
# Core team mode
just ext-agent-team

# Full chain mode
just run-agent-team-chain
# (loads agent-team, agent-team-chain, theme-cycler, damage-control)

# Discovery mode
just ext-cross-agent

# Subagent mode
just ext-subagent-widget

# Task mode
just ext-tilldone

# Pipeline mode
just ext-agent-chain

# Meta-agent mode
just ext-pi-pi

# Custom stack
just stack "agent-team,damage-control,theme-cycler"
```

---

## Architecture Summary

### Layer Model

```
┌─────────────────────────────────────────────────────┐
│                    ui/ (Entry Layer)                 │
│  agent-team, agent-chain, cross-agent, pi-pi,       │
│  subagent-widget, tilldone                          │
├─────────────────────────────────────────────────────┤
│                   util/ (Middle Layer)               │
│  memory, memory-export, memory-tools, agent-switch, │
│  damage-control, pi-loader                          │
├─────────────────────────────────────────────────────┤
│                 src/ui/ (Base Layer)                 │
│  themeMap, theme-cycler, pure-focus, minimal,       │
│  tool-counter, conversation-viewer, command-history │
└─────────────────────────────────────────────────────┘
```

### Key Observations

1. **`themeMap.ts` is the Universal Dependency:** Imported by files in all three directories. Any changes to it affect the entire extension system.
2. **Memory Export is Central:** `memory-export.ts` is consumed by both `ui/` entry points and `util/` tools, making it a critical shared utility.
3. **Entry Points Are Decoupled:** 5 of 6 `ui/` files don't import from each other, enabling independent loading through the justfile loader.
4. **`agent-team.ts` is the Only Hub:** The sole `ui/` file with multiple dependencies and external consumers.
5. **Justfile Required for Pi 0.70.5+:** Multiple `-e` flags are unstable. All extensions must be loaded via `just ext-<name>` or `just stack "name1,name2"`, which uses `pi-loader.ts` with a single `-e` flag.
6. **Reference Migration Complete:** All files exist in `ref/piwithstuff-main/`, indicating successful migration to the `.pi/extensions/` structure.
7. **Documentation Outpaces Code Consumers:** Most "consumers" are docs, suggesting extensions are designed for direct user loading rather than programmatic composition.

---

## Quick Reference

### By Function

| Need | Extension | Directory |
|------|-----------|-----------|
| Theme management | `themeMap.ts` | `src/ui/` |
| Theme cycling | `theme-cycler.ts` | `src/ui/` |
| Agent team | `agent-team.ts` | `ui/` |
| Pipeline chaining | `agent-chain.ts` | `ui/` |
| Memory export | `memory-export.ts` | `util/` |
| Memory inspection | `memory.ts` | `util/` |
| Cross-agent discovery | `cross-agent.ts` | `ui/` |
| Meta-agent building | `pi-pi.ts` | `ui/` |
| Background subagents | `subagent-widget.ts` | `ui/` |
| Task discipline | `tilldone.ts` | `ui/` |
| Error recovery | `damage-control.ts` | `util/` |
| Extension loading | `pi-loader.ts` | `util/` |

### By Import Count (Most Imported First)

| File | Import Count | Imported By Directories |
|------|--------------|------------------------|
| `themeMap.ts` | 8+ | `src/ui/`, `util/`, `ui/` |
| `memory-export.ts` | 4+ | `util/`, `ui/` |
| `memory.ts` | 2+ | `util/`, `ui/` |
| `agent-team.ts` | 2+ | `src/ui/`, `util/` |
| All others | 0-1 | — |
