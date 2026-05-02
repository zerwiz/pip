# Extensions/UI Usage Map

## Purpose

This document maps how each file in `.pi/extensions/ui/` is consumed, imported, and related to other modules. These files are primary entry-point extensions loaded via the justfile's dynamic loader system.

> **Pi 0.70.5+ Note:** Multiple `-e` flags (`pi -e ext1.ts -e ext2.ts`) are unstable. Always use `just ext-<name>` or `just stack "ext1,ext2"` instead.

---

## 1. `agent-team.ts`

**File Path:** `.pi/extensions/ui/agent-team.ts`

**Purpose:** Core agent team management with memory management, team switching, and cleanup. Provides memory export tools (`memory-export:json`, `memory-export:text`, `memory-export:md`, `memory-export:stats`, `memory-export:filtered`), automatic daily cleanup of old exports, export rate limiting (max 100), and shutdown handling. Exports `initialize()` as the main entry point.

**Consumers:**

| Consumer | Location | What It Uses | How Used |
|----------|----------|-------------|----------|
| `agent-team-chain.ts` | `extensions/src/ui/agent-team-chain.ts` | `initialize` | Imports `initialize()` to bootstrap the agent team system |
| `justfilechain` | `extensions/util/justfilechain` | `agent-team.ts` | Validates imports, runs in chain mode with theme-cycler and damage-control |
| Documentation | `.pi/docs/`, `.pi/plans/` | All exports | Referenced in MIGRATION-GUIDE, PLAN-MODE, UPDATE-2026-05-02, etc. |

**Dependencies:**

- `../src/ui/themeMap.ts`
- `../util/memory-export.ts`
- `../util/memory.ts`

**Usage Pattern:**
```
just ext-agent-team
# or
just stack "agent-team,theme-cycler,damage-control"
```

---

## 2. `agent-chain.ts`

**File Path:** `.pi/extensions/ui/agent-chain.ts`

**Purpose:** Sequential pipeline orchestrator — chains multiple agents where each step's output feeds into the next step's prompt. Provides `/chain` command to select and run pipelines. Discovers pipelines across the entire agents folder.

**Consumers:**

| Consumer | Location | What It Uses | How Used |
|----------|----------|-------------|----------|
| Documentation | `.pi/docs/UI-EXTENSIONS-USAGE.md` | File reference | Listed in extension catalog |
| Documentation | `.pi/docs/STRUCTURE.md` | File reference | Listed in directory structure |
| Documentation | `.pi/docs/UPDATE-2026-05-02.md` | Functionality | Notes discovery across agents folder |
| Reference codebase | `ref/piwithstuff-main/` | All exports | Original source exists in reference repo |

**Dependencies:**

- No imports from other `.pi/extensions/` files (standalone)

**Usage Pattern:**
```
just ext-agent-chain
```

---

## 3. `cross-agent.ts`

**File Path:** `.pi/extensions/ui/cross-agent.ts`

**Purpose:** Cross-agent command/skill discovery. Scans `.claude/`, `.gemini/`, `.codex/` directories for commands, skills, and agents, and registers them in Pi. Correctly identifies agents, commands, and skills in nested structures.

**Consumers:**

| Consumer | Location | What It Uses | How Used |
|----------|----------|-------------|----------|
| Documentation | `.pi/docs/UI-EXTENSIONS-USAGE.md` | File reference | Listed in extension catalog |
| Documentation | `.pi/docs/STRUCTURE.md` | File reference | Listed in directory structure |
| Documentation | `.pi/docs/UPDATE-2026-05-02.md` | Functionality | Notes correct nested structure identification |
| Reference codebase | `ref/piwithstuff-main/` | All exports | Original source exists in reference repo |

**Dependencies:**

- No imports from other `.pi/extensions/` files (standalone)

**Usage Pattern:**
```
just ext-cross-agent
```

---

## 4. `pi-pi.ts`

**File Path:** `.pi/extensions/ui/pi-pi.ts`

**Purpose:** Meta-agent that builds Pi agents using parallel research experts for documentation. Uses parallel research experts for documentation gathering and agent construction.

**Consumers:**

| Consumer | Location | What It Uses | How Used |
|----------|----------|-------------|----------|
| Documentation | `.pi/docs/UI-EXTENSIONS-USAGE.md` | File reference | Listed in extension catalog |
| Documentation | `.pi/docs/STRUCTURE.md` | File reference | Listed in directory structure |
| Documentation | `.pi/docs/PLAN-MODE.md` | File reference | Referenced in planning docs |
| Reference codebase | `ref/piwithstuff-main/` | All exports | Original source and specs exist in reference repo |

**Dependencies:**

- No imports from other `.pi/extensions/` files (standalone)

**Usage Pattern:**
```
just ext-pi-pi
```

---

## 5. `subagent-widget.ts`

**File Path:** `.pi/extensions/ui/subagent-widget.ts`

**Purpose:** `/sub <task>` command that spawns background Pi subagents; each gets its own streaming live-progress widget. Now sees all background agents in the tree.

**Consumers:**

| Consumer | Location | What It Uses | How Used |
|----------|----------|-------------|----------|
| Documentation | `.pi/docs/UI-EXTENSIONS-USAGE.md` | File reference | Listed in extension catalog |
| Documentation | `.pi/docs/STRUCTURE.md` | File reference | Listed in directory structure |
| `themeMap.ts` | `extensions/src/ui/themeMap.ts` | File reference | Referenced in usage comment |
| Reference codebase | `ref/piwithstuff-main/` | All exports | Original source exists in reference repo |

**Dependencies:**

- No imports from other `.pi/extensions/` files (standalone)

**Usage Pattern:**
```
just ext-subagent-widget
```

---

## 6. `tilldone.ts`

**File Path:** `.pi/extensions/ui/tilldone.ts`

**Purpose:** Task discipline system — define tasks before starting work; tracks completion state across steps; shows persistent task list in footer with live progress.

**Consumers:**

| Consumer | Location | What It Uses | How Used |
|----------|----------|-------------|----------|
| Documentation | `.pi/docs/UI-EXTENSIONS-USAGE.md` | File reference | Listed in extension catalog |
| Documentation | `.pi/docs/STRUCTURE.md` | File reference | Listed in directory structure |
| Reference codebase | `ref/piwithstuff-main/` | All exports | Original source exists in reference repo |

**Dependencies:**

- No imports from other `.pi/extensions/` files (standalone)

**Usage Pattern:**
```
just ext-tilldone
```

---

## Summary Table

| Extension | Type | Consumers | Dependencies | Standalone |
|-----------|------|-----------|-------------|------------|
| `agent-team.ts` | Agent Management | 3 (code + justfile) | `themeMap.ts`, `memory-export.ts`, `memory.ts` | No |
| `agent-chain.ts` | Pipeline Orchestrator | 0 (code), docs only | None | Yes |
| `cross-agent.ts` | Cross-Agent Discovery | 0 (code), docs only | None | Yes |
| `pi-pi.ts` | Meta-Agent Builder | 0 (code), docs only | None | Yes |
| `subagent-widget.ts` | Background Subagents | 0 (code), docs only | None | Yes |
| `tilldone.ts` | Task Discipline | 0 (code), docs only | None | Yes |

## Key Observations

1. **Loaded via Justfile:** All 6 files are launched through the justfile's `pi-loader.ts` orchestrator, not via direct `pi -e` flags. Pi 0.70.5+ made stacking multiple `-e` flags unstable.
2. **`agent-team.ts` is the Hub:** Only `agent-team.ts` has actual code consumers (`agent-team-chain.ts` imports its `initialize()` function). It also depends on shared utilities (`themeMap.ts`, `memory-export.ts`, `memory.ts`).
3. **Reference Codebase Exists:** All 6 files have corresponding copies in `ref/piwithstuff-main/extensions/`, confirming they were migrated from a reference project.
4. **No Cross-Imports:** None of the 6 files import from each other, keeping them decoupled and independently loadable through the justfile loader.
5. **Justfile Integration:** All extensions are started via `just ext-<name>` or `just stack "name1,name2,name3"`, which sets `PI_STACK` and loads `pi-loader.ts` with a single `-e` flag.
6. **Documentation Heavy:** Most "consumers" are documentation references, suggesting these extensions are well-documented but not deeply integrated into other code modules.

## Directory Structure

```
.pi/extensions/ui/
├── agent-chain.ts      # Sequential pipeline orchestrator
├── agent-team.ts       # Agent team management + memory export (imports themeMap, memory-export, memory)
├── cross-agent.ts      # Cross-agent command/skill discovery
├── pi-pi.ts            # Meta-agent builder with parallel research
├── subagent-widget.ts  # Background subagent spawning with live widgets
└── tilldone.ts         # Task discipline system with progress tracking
```
