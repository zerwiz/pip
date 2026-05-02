# UI Extensions Source (`src/ui/`) — Usage Map

Generated: 2026-05-02

## Overview

This document maps every file in `.pi/extensions/src/ui/` to the consumers that import or reference it across the codebase.

---

## 1. `themeMap.ts`

**Purpose:** Central theme assignment registry. Maps extension filenames to default themes (e.g. `minimal` → `synthwave`, `pure-focus` → `everforest`). Exports `applyExtensionDefaults()` which applies both theme and terminal title on session boot.

**Used by (direct imports):**

| Consumer | Path |
|---|---|
| `agent-chain.ts` | `.pi/extensions/ui/agent-chain.ts` |
| `agent-team.ts` | `.pi/extensions/ui/agent-team.ts` |
| `cross-agent.ts` | `.pi/extensions/ui/cross-agent.ts` |
| `pi-pi.ts` | `.pi/extensions/ui/pi-pi.ts` |
| `subagent-widget.ts` | `.pi/extensions/ui/subagent-widget.ts` |
| `tilldone.ts` | `.pi/extensions/ui/tilldone.ts` |
| `system-select.ts` | `.pi/extensions/util/system-select.ts` |
| `damage-control.ts` | `.pi/extensions/util/damage-control.ts` |
| `purpose-gate.ts` | `.pi/extensions/util/purpose-gate.ts` |
| `session-replay.ts` | `.pi/extensions/util/session-replay.ts` |
| `minimal.ts` | `.pi/extensions/src/ui/minimal.ts` (self) |
| `pure-focus.ts` | `.pi/extensions/src/ui/pure-focus.ts` (self) |
| `theme-cycler.ts` | `.pi/extensions/src/ui/theme-cycler.ts` (self) |
| `tool-counter.ts` | `.pi/extensions/src/ui/tool-counter.ts` (self) |
| `tool-counter-widget.ts` | `.pi/extensions/src/ui/tool-counter-widget.ts` (self) |

**Summary:** Every UI extension in the project imports `applyExtensionDefaults` from `themeMap.ts`. It is the most widely depended-on file in this directory.

---

## 2. `agent-widget.ts`

**Purpose:** Defines the `AgentWidget` class — a persistent TUI widget that renders a tree of running/completed/queued agents above the editor with animated spinners, live stats (turns, tool uses, tokens, duration), and activity descriptions. Exports types (`Theme`, `UICtx`, `AgentActivity`, `AgentDetails`), constants (`SPINNER`, `ERROR_STATUSES`), and formatting helpers (`formatTokens`, `formatTurns`, `formatMs`, `describeActivity`).

**Used by:**

| Consumer | Path | Imports |
|---|---|---|
| `manager.ts` | `.pi/extensions/src/ui/manager.ts` | `UICtx`, `AgentActivity`, `AgentWidget`, `Theme`, `ERROR_STATUSES` |
| `conversation-viewer.ts` | `.pi/extensions/src/ui/conversation-viewer.ts` | Re-declares equivalent `Theme` and `AgentActivity` interfaces (loose coupling) |

**Indirectly used by:** Any extension that uses `manager.ts` or `conversation-viewer.ts`.

---

## 3. `manager.ts`

**Purpose:** `AgentManager` class with production-ready migration features: error callbacks with 10s timeout, debounced stop keys (`ctrl+q`), automatic status clearing on agent stop, persistent running-agent counter (O(1) instead of O(n)), and optimized `setStatus()` usage.

**Used by:**

| Consumer | Path |
|---|---|
| *(internal only)* | — |

**Notes:** No other file in the current codebase directly imports `manager.ts`. It is a self-contained module that depends on `agent-widget.ts`. Likely intended to be consumed by a higher-level orchestrator or the main `agent-team.ts` extension in `.pi/extensions/ui/`.

---

## 4. `conversation-viewer.ts`

**Purpose:** `ConversationViewer` class — a scrollable, live-updating TUI overlay for viewing an agent's conversation history. Subscribes to session events for real-time streaming. Supports keyboard navigation (arrow keys, PageUp/PageDown, Home/End, Escape/Q to close). Renders user messages, assistant responses, tool calls, tool results, and bash executions with proper width clamping and ANSI handling.

**Used by:**

| Consumer | Path |
|---|---|
| `conversation-viewer.test.ts` | `.pi/extensions/src/ui/conversation-viewer.test.ts` (tests) |

**Notes:** No other file currently imports `ConversationViewer`. Likely invoked dynamically at runtime (e.g., via a command or keybinding) rather than static import. The reference copy at `ref/piwithstuff-main/ref/pi-subagents-master/src/index.ts` shows it being dynamically imported: `await import("./ui/conversation-viewer.js")`.

---

## 5. `conversation-viewer.test.ts`

**Purpose:** Vitest test suite for `ConversationViewer`. Contains 15+ tests verifying that no rendered line exceeds the viewport width across various scenarios: empty messages, plain text, long lines, ANSI codes, URLs, tables, bash execution output, tool calls, narrow terminals, and mixed unicode. Also includes safety-net tests for upstream `wrapTextWithAnsi` bugs.

**Used by:**

| Consumer | Path |
|---|---|
| *(test file — not imported by production code)* | — |

**Run with:** `vitest` (or equivalent test runner).

---

## 6. `agent-team-chain.ts`

**Purpose:** VSC extension that enables agent team functionality with memory management, team switching, and cleanup. Provides tools for memory export (`memory-export:json`, `memory-export:text`, etc.), automatic daily cleanup of old exports, export rate limiting (max 100), and shutdown handling. Imports `initialize()` from `../../ui/agent-team`.

**Used by:**

| Consumer | Path |
|---|---|
| `justfile` | `/home/zerwiz/pip/justfile` (line 132 — import validation) |
| `justfilechain` | `.pi/extensions/util/justfilechain` (build/test/run/verify targets) |

**Notes:** Referenced in justfile targets for building, testing, and running. The justfile validates that it imports from `agent-team.ts`. Documentation references exist in `.pi/docs/AGENT-TEAM-CHAIN-TEST.md`, `.pi/docs/MIGRATION-GUIDE.md`, and `.pi/docs/UPDATE-2026-05-02.md`.

---

## 7. `minimal.ts`

**Purpose:** Compact footer extension showing model ID and a 10-block context usage bar (e.g. `[###-------] 30%`).

**Used by:**

| Consumer | Path |
|---|---|
| *(standalone extension)* | Loaded via `just ext-minimal` |

**Notes:** Uses `themeMap.ts` for defaults. No other code imports it; it is a leaf extension loaded through the justfile loader.

---

## 8. `pure-focus.ts`

**Purpose:** Strips all footer and status line UI for distraction-free mode. Sets footer renderer to return empty lines.

**Used by:**

| Consumer | Path |
|---|---|
| *(standalone extension)* | Loaded via `just ext-pure-focus` |

**Notes:** Uses `themeMap.ts` for defaults. Leaf extension, not imported by anything else.

---

## 9. `theme-cycler.ts`

**Purpose:** Keyboard shortcuts and command for cycling through available themes.
- `Shift+X` — cycle forward
- `Shift+Q` — cycle backward
- `/theme` — open picker or switch by name

Shows current theme in status line and a color swatch widget (auto-dismisses after 3s).

**Used by:**

| Consumer | Path |
|---|---|
| *(standalone extension)* | Loaded via `just ext-theme-cycler` |

**Notes:** Uses `themeMap.ts` for defaults. Leaf extension. Referenced in `THEME_MAP` itself (maps to `synthwave`).

---

## 10. `tool-counter.ts`

**Purpose:** Rich two-line footer extension:
- Line 1: model name + context meter (left), tokens in/out + cost (right)
- Line 2: cwd + git branch (left), tool call tally (right)

Demonstrates `setFooter`, `footerData.getGitBranch()`, `onBranchChange()`, and session branch traversal.

**Used by:**

| Consumer | Path |
|---|---|
| *(standalone extension)* | Loaded via `just ext-tool-counter` |

**Notes:** Uses `themeMap.ts` for defaults. Leaf extension.

---

## 11. `tool-counter-widget.ts`

**Purpose:** Persistent widget above the editor showing per-tool call counts with color-coded badges. Format: `Tools (N): [Bash 3] [Read 7] [Write 2]`. Assigns unique background colors from a dark palette to each tool type.

**Used by:**

| Consumer | Path |
|---|---|
| *(standalone extension)* | Loaded via `just ext-tool-counter-widget` |

**Notes:** Uses `themeMap.ts` for defaults. Uses `@mariozechner/pi-tui` `Box` and `Text` components. Leaf extension.

---

## Dependency Graph

```
themeMap.ts (most depended-on)
├── agent-chain.ts (ui/)
├── agent-team.ts (ui/)
├── cross-agent.ts (ui/)
├── pi-pi.ts (ui/)
├── subagent-widget.ts (ui/)
├── tilldone.ts (ui/)
├── system-select.ts (util/)
├── damage-control.ts (util/)
├── purpose-gate.ts (util/)
├── session-replay.ts (util/)
├── minimal.ts (src/ui/)        ← leaf extension
├── pure-focus.ts (src/ui/)     ← leaf extension
├── theme-cycler.ts (src/ui/)   ← leaf extension
├── tool-counter.ts (src/ui/)   ← leaf extension
└── tool-counter-widget.ts (src/ui/) ← leaf extension

agent-widget.ts
├── manager.ts (src/ui/)
└── conversation-viewer.ts (src/ui/) (loose — re-declares types)

manager.ts
└── (no consumers yet)

conversation-viewer.ts
└── conversation-viewer.test.ts

agent-team-chain.ts
├── justfile (validation)
└── justfilechain (build/test/run/verify)
```

## Categories

| Category | Files |
|---|---|
| **Shared dependency** | `themeMap.ts` |
| **Core UI components** | `agent-widget.ts`, `manager.ts`, `conversation-viewer.ts` |
| **Leaf extensions (footer)** | `minimal.ts`, `tool-counter.ts` |
| **Leaf extensions (widget)** | `tool-counter-widget.ts` |
| **Leaf extensions (theme)** | `theme-cycler.ts`, `pure-focus.ts` |
| **Agent orchestration** | `agent-team-chain.ts` |
| **Tests** | `conversation-viewer.test.ts` |
