# Util Extensions (`extensions/util/`) — Usage Map

Generated: 2026-05-02

## Overview

This document maps every file in `.pi/extensions/util/` to the consumers that import or reference it across the codebase.

---

## 1. `manifest.ts`

**Purpose:** Extension manifest registry. Defines `EXTENSION_MANIFEST` — a lookup table mapping extension names to categories (`ui-core`, `ui-widget`, `function`, `utility`) with conflict declarations. Used by `pi-loader.ts` to resolve stacking conflicts and determine load order.

**Used by:**

| Consumer | Path | Imports |
|---|---|---|
| `pi-loader.ts` | `.pi/extensions/util/pi-loader.ts` | `EXTENSION_MANIFEST` |

**Summary:** Single consumer. Provides metadata that drives the dynamic loader's category-based loading and UI core conflict resolution.

---

## 2. `pi-loader.ts`

**Purpose:** PI Dynamic Smart Loader (v2.0.0). Reads the `PI_STACK` environment variable, categorizes extensions using `manifest.ts`, resolves UI core conflicts (keeps only the last one), and loads them in priority order: Utility → Function → UI Core → Widgets → Unknown. Searches multiple paths for each extension.

**Used by:**

| Consumer | Path |
|---|---|
| *(standalone entry point)* | Loaded via `just <target>` or `just stack "..."` which internally runs `pi -e .pi/extensions/util/pi-loader.ts` |

**Notes:** Leaf module — nothing imports it. It imports and orchestrates other extensions. Depends on `manifest.ts`.

> **Pi 0.70.5+ Context:** This loader exists specifically because stacking multiple `-e` flags became unstable in v0.70.5. The justfile sets `PI_STACK` and passes a single `-e` flag to the loader.

---

## 3. `types.ts`

**Purpose:** Shared type declarations for the agent team system. Exports `TeamConfig`, `AgentConfig`, `ToolOutput`, `TreeItem`, `ValidationIssue`, `MemoryScope`, and `AgentStatusMap`.

**Used by:**

| Consumer | Path | Imports |
|---|---|---|
| `memory.ts` | `.pi/extensions/util/memory.ts` | `MemoryScope` |
| `conversation-viewer.test.ts` | `.pi/extensions/src/ui/conversation-viewer.test.ts` | `AgentRecord` (resolves via `../types.js`) |

**Notes:** Primarily consumed by `memory.ts`. The `MemoryScope` type is also re-declared locally in `memory-export.ts` and `agent-team.ts` (duplication — same string union `"user" | "project" | "local"`).

---

## 4. `memory.ts`

**Purpose:** Persistent agent memory system with thinking display configuration. Handles three memory scopes (`user`, `project`, `local`), provides secure file reading (symlink protection, unsafe name rejection), memory directory management, and builds memory blocks for injection into agent system prompts. Includes `buildThinkingDisplayConfig` for consistent 8-row thinking display across all agent types.

**Used by:**

| Consumer | Path | Imports |
|---|---|---|
| `agent-chain.ts` | `.pi/extensions/ui/agent-chain.ts` | `buildMemoryBlock`, `buildReadOnlyMemoryBlock` |
| `subagent-widget.ts` | `.pi/extensions/ui/subagent-widget.ts` | `buildMemoryBlock` |

**Notes:** Depends on `types.ts` for `MemoryScope`. Has a near-duplicate in `memory-export.ts` (same functions with minor differences).

---

## 5. `memory-export.ts`

**Purpose:** Memory export and scanning utilities. Provides the same core functions as `memory.ts` (`resolveMemoryDir`, `ensureMemoryDir`, `readMemoryIndex`, `buildMemoryBlock`, `buildReadOnlyMemoryBlock`) plus additional export capabilities: `collectAllMemories()` (scans all scopes), `exportMemory()` (JSON/text/MD/preview formats), and `cleanupExports()`.

**Used by:**

| Consumer | Path | Imports |
|---|---|---|
| `memory-tools.ts` | `.pi/extensions/util/memory-tools.ts` | `exportMemory`, `listExportFormats`, `cleanupExports`, and others |
| `agent-team.ts` | `.pi/extensions/ui/agent-team.ts` | `inspectMemory`, `exportToJSON`, `exportToText`, `exportToMD`, `exportStats`, `exportFiltered`, `getReadFiles`, `getCreatedFiles`, `exportMemory`, `listExportFormats`, `cleanupExports` |
| `test_memory_export.py` | `.pi/py/test_memory_export.py` | References for test coverage |

**Notes:** Contains functions that are imported by `memory-tools.ts` but some (`inspectMemory`, `exportToJSON`, etc.) are not defined in this file — they are re-exported, suggesting missing implementations or a future interface.

---

## 6. `memory-tools.ts`

**Purpose:** High-level memory tool registration. Wraps `memory-export.ts` functions into `ExtensionAPI`-compatible tool definitions (`memory_view`, `memory_export`, `memory_stats`, `memory_export_file`). Provides `registerMemoryTools()` and `handleMemoryExport()`.

**Used by:**

| Consumer | Path | Imports |
|---|---|---|
| `agent-team.ts` | `.pi/extensions/ui/agent-team.ts` | `handleMemoryExport` |

**Notes:** Depends on `memory-export.ts`. Re-exports many functions from `memory-export.ts` that are not actually defined there (likely missing implementations).

---

## 7. `agent-switch.ts`

**Purpose:** Complete agent switching implementation. `AgentTeam` class manages multi-agent teams with:
- State machine (`IDLE`, `PENDING`, `CONFIRMING`, `COMPLETE`, `ERROR`, `CANCELLED`)
- Validation (agent status, session expiry, permissions, rate limiting)
- Tool permission checks (capabilities, roles, permission levels)
- Session preservation during switches
- Error recovery
- Command registration (`/agents-switch`, `/agents-status`)

**Used by:**

| Consumer | Path |
|---|---|
| *(no direct importers)* | — |

**Notes:** Imports from `../tools` (`Agent`, `AgentStatus`) which does not appear to exist in the current tree. Self-contained module with no consumers. Likely intended for use by `agent-team.ts` but currently not wired in.

---

## 8. `damage-control.ts`

**Purpose:** Security/safety extension that intercepts tool calls to enforce rules. Features:
- YAML-based rule loading (project or global `damage-control-rules.yaml`)
- Zero-access paths, read-only paths, no-delete paths
- Path overrides with fine-grained permissions (deletions, writes, edits, reads)
- Project isolation (restrict writes to a root directory)
- Deletion protection (ask/allowed/blocked with interactive prompts)
- Damage Control modal UI (tabbed: Status, Rules, Permissions)
- Commands: `/damage-control`, `/dc-set-project`, `/dc-reload`

**Used by:**

| Consumer | Path |
|---|---|
| *(standalone extension)* | Loaded via `just ext-damage-control` |
| `justfile` | `~/pip/justfile` |
| `justfilechain` | `.pi/extensions/util/justfilechain` |

**Notes:** Depends on `themeMap.ts` for defaults. Leaf extension — not imported by other code. Uses `yaml` package for rule parsing.

---

## 9. `purpose-gate.ts`

**Purpose:** Forces the user to declare intent before working. On session start, shows a text input dialog asking "What is the purpose of this agent?" Blocks all prompts until answered. Displays a persistent widget with the purpose statement. Injects purpose into the system prompt on each agent start.

**Used by:**

| Consumer | Path |
|---|---|
| *(standalone extension)* | Loaded via `just ext-purpose-gate` |

**Notes:** Depends on `themeMap.ts` for defaults. Leaf extension. Uses `@mariozechner/pi-tui` `Text` and `truncateToWidth`.

---

## 10. `session-replay.ts`

**Purpose:** `/replay` command that shows a scrollable timeline of the current session. Extracts user prompts, assistant responses, and tool results from the session branch. Renders as a navigable UI with expand/collapse, timestamps, and elapsed time. Uses `Container`, `Box`, `Text`, `Markdown`, `DynamicBorder` from pi-tui.

**Used by:**

| Consumer | Path |
|---|---|
| *(standalone extension)* | Loaded via `just ext-session-replay` |

**Notes:** Depends on `themeMap.ts` for defaults. Leaf extension.

---

## 11. `system-select.ts`

**Purpose:** `/system` command for switching system prompts. Scans `.pi/agents/`, `.claude/agents/`, `.gemini/agents/`, `.codex/agents/` (project and global) for agent definition `.md` files with frontmatter. Allows selecting an agent to prepend its body to the system prompt and restrict available tools to the agent's declared tool set.

**Used by:**

| Consumer | Path |
|---|---|
| *(standalone extension)* | Loaded via `just ext-system-select` |

**Notes:** Depends on `themeMap.ts` for defaults (imports from `../src/ui/themeMap.js`). Leaf extension.

---

## 12. `justfilechain`

**Purpose:** Justfile targets for `agent-team-chain` — build, test, run, and verify integration. Defines the production run command stacking `agent-team.ts`, `agent-team-chain.ts`, `theme-cycler.ts`, and `damage-control.ts`.

**Used by:**

| Consumer | Path |
|---|---|
| `justfile` | `~/pip/justfile` |

**Notes:** Not a TypeScript source file. Referenced by the root justfile for agent-team-chain lifecycle management.

---

## Dependency Graph

```
manifest.ts
└── pi-loader.ts (standalone entry point)

types.ts
├── memory.ts
│   ├── agent-chain.ts (ui/)
│   └── subagent-widget.ts (ui/)
└── conversation-viewer.test.ts (src/ui/) [via ../types.js]

memory-export.ts
├── memory-tools.ts
│   └── agent-team.ts (ui/)
└── agent-team.ts (ui/) [direct]

memory-tools.ts
└── agent-team.ts (ui/)

agent-switch.ts
└── (no consumers — imports from nonexistent ../tools)

damage-control.ts (leaf extension — depends on themeMap.ts)

purpose-gate.ts (leaf extension — depends on themeMap.ts)

session-replay.ts (leaf extension — depends on themeMap.ts)

system-select.ts (leaf extension — depends on themeMap.ts)

justfilechain
└── justfile (root)
```

## Categories

| Category | Files |
|---|---|
| **Shared types** | `types.ts` |
| **Shared manifest** | `manifest.ts` |
| **Loader/orchestrator** | `pi-loader.ts` |
| **Memory system** | `memory.ts`, `memory-export.ts`, `memory-tools.ts` |
| **Agent orchestration** | `agent-switch.ts` |
| **Leaf extensions (safety)** | `damage-control.ts` |
| **Leaf extensions (workflow)** | `purpose-gate.ts`, `session-replay.ts`, `system-select.ts` |
| **Build config** | `justfilechain` |

## Key Observations

1. **`memory.ts` vs `memory-export.ts` duplication:** Both files implement the same core functions (`resolveMemoryDir`, `ensureMemoryDir`, `readMemoryIndex`, `buildMemoryBlock`, `buildReadOnlyMemoryBlock`) with minor differences in error messages and formatting. `memory.ts` adds thinking display config; `memory-export.ts` adds bulk scanning and multi-format export.

2. **`MemoryScope` defined in 3 places:** `types.ts`, `memory-export.ts`, and re-declared in `agent-team.ts`. All are identical: `"user" | "project" | "local"`.

3. **`agent-switch.ts` has broken imports:** Imports from `../tools` (`Agent`, `AgentStatus`) which does not exist in the current tree. No other file imports `agent-switch.ts`.

4. **`memory-tools.ts` re-exports missing functions:** Imports `inspectMemory`, `exportToJSON`, `exportToText`, `exportToMD`, `exportStats`, `exportFiltered`, `getReadFiles`, `getCreatedFiles` from `memory-export.ts`, but these are not defined in `memory-export.ts`.

5. **All leaf extensions depend on `themeMap.ts`:** `damage-control.ts`, `purpose-gate.ts`, `session-replay.ts`, and `system-select.ts` all call `applyExtensionDefaults()` from `../src/ui/themeMap`.
