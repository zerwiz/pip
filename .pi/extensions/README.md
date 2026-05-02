# Pi Extensions System

A modular extension architecture for the Pi Coding Agent, organized into three directories with different roles and boot strategies.

## Architecture

Extensions are loaded through a single-entry dynamic loader (`pi-loader.ts`) via the justfile. Instead of passing multiple `-e` flags, the justfile sets `PI_STACK` with a comma-separated list and loads one orchestrator.

> **Pi 0.70.5+ Requirement:** Stacking multiple `-e` flags is unstable. Always use `just ext-<name>` or `just stack "name1,name2"` instead of `pi -e ext1.ts -e ext2.ts`.

```
just ext-full-stack
  → PI_STACK="agent-team,damage-control,theme-cycler"
  → pi -e .pi/extensions/util/pi-loader.ts
  → pi-loader.ts resolves and initializes each extension in order
```

## Directory Structure

```
.pi/extensions/
├── README.md              # This file
├── src/ui/                # Base layer — shared UI components (11 files)
├── util/                  # Middle layer — utilities and loaders (12 files)
└── ui/                    # Entry layer — primary extensions (6 files)
```

## Extension Loading

### Pi 0.70.5+ Requirement

Stacking multiple `-e` flags is **unstable** in Pi 0.70.5+ due to stricter ESM resolution and sandboxing:

```bash
# ❌ Unstable — causes ESM conflicts and terminal corruption
pi -e ext1.ts -e ext2.ts -e ext3.ts

# ✅ Correct — via justfile with single -e flag
just ext-full-stack
just stack "agent-team,damage-control,theme-cycler"
```

### How It Works

1. **Categorization**: Extensions are categorized by type (utility → function → ui-core → ui-widget)
2. **Conflict Resolution**: Only one UI core extension is allowed (last one wins)
3. **Path Resolution**: Each extension name is searched across 6 possible directories
4. **Initialization**: Each extension's default export is called with the `ExtensionAPI`

### Path Resolution Order

```
1. extensions/<name>.ts
2. extensions/<name>.js
3. .pi/extensions/<name>.ts
4. .pi/extensions/ui/<name>.ts
5. .pi/extensions/util/<name>.ts
6. .pi/extensions/src/ui/<name>.ts
```

### Extension Requirements

Every extension must export a default async function:

```typescript
import { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default async function (pi: ExtensionAPI) {
  // Register tools, commands, event handlers, etc.
}
```

## src/ui/ — Base Layer (11 files)

Shared UI components, themes, and utilities. These are imported by extensions in other directories.

| File | Purpose | Dependencies |
|------|---------|-------------|
| `themeMap.ts` | Theme definitions, apply/get functions, ThemeManager | None |
| `theme-cycler.ts` | `/cycle-theme`, `/next-theme`, `/prev-theme` commands | `themeMap.ts` |
| `pure-focus.ts` | Focus mode toggle, visual noise reduction | `themeMap.ts` |
| `minimal.ts` | Minimal extension loader | None |
| `tool-counter.ts` | Tool usage tracking | None |
| `conversation-viewer.ts` | Conversation history viewer | None |
| `command-history.ts` | Command history tracking | None |
| `agent-team-chain.ts` | Deprecated wrapper for agent-team | `agent-team.ts`, `themeMap.ts` |

### Key Dependency: `themeMap.ts`

The most imported file in the entire extension system. Used by files in all three directories.

## util/ — Middle Layer (12 files)

Utility functions, memory management, loaders, and shared tools.

| File | Purpose | Dependencies |
|------|---------|-------------|
| `memory.ts` | Memory inspection utilities | None |
| `memory-export.ts` | Export memory as JSON, text, markdown, stats | None |
| `memory-tools.ts` | Memory handling tools | `memory-export.ts` |
| `damage-control.ts` | Error recovery and safety auditing | `themeMap.ts` |
| `agent-switch.ts` | Complete agent switching implementation | `themeMap.ts` |
| `pi-loader.ts` | **Dynamic extension loader (orchestrator)** | `manifest.ts` |
| `manifest.ts` | Extension categories and metadata | None |
| `justfilechain` | Justfile chain validation and execution | None |

### Key Utility: `memory-export.ts`

Consumed by both `ui/` entry points and `util/` tools. Provides `exportToJSON`, `exportToText`, `exportToMD`, `exportStats`, `exportFiltered`, `getReadFiles`, `getCreatedFiles`, `exportMemory`, `listExportFormats`, `cleanupExports`.

## ui/ — Entry Layer (6 files)

Primary entry-point extensions. Loaded through the justfile's dynamic loader, not via direct `pi -e` flags.

| File | Purpose | Dependencies |
|------|---------|-------------|
| `agent-team.ts` | Agent team management, memory export, team switching | `themeMap.ts`, `memory-export.ts`, `memory.ts` |
| `agent-chain.ts` | Sequential pipeline orchestrator, `/chain` command | None |
| `cross-agent.ts` | Cross-agent command/skill discovery | None |
| `pi-pi.ts` | Meta-agent builder with parallel research | None |
| `subagent-widget.ts` | `/sub` command for background subagents | None |
| `tilldone.ts` | Task discipline system with progress tracking | None |

### Hub: `agent-team.ts`

The only `ui/` file with multiple dependencies and external consumers. Imports from `themeMap.ts`, `memory-export.ts`, and `memory.ts`. Consumed by `agent-team-chain.ts` in `src/ui/`.

## Justfile Targets

### Group 1: Basic Extensions

| Target | Stack |
|--------|-------|
| `ext-pure-focus` | `pure-focus` |
| `ext-minimal` | `minimal,theme-cycler` |
| `ext-cross-agent` | `cross-agent,minimal` |
| `ext-purpose-gate` | `purpose-gate,minimal` |
| `ext-tool-counter` | `tool-counter` |
| `ext-tool-counter-widget` | `tool-counter-widget,minimal` |
| `ext-subagent-widget` | `subagent-widget,pure-focus,theme-cycler` |
| `ext-tilldone` | `tilldone,theme-cycler` |

### Group 2: Agent Extensions

| Target | Stack |
|--------|-------|
| `ext-agent-team` | `agent-team,theme-cycler` |
| `ext-system-select` | `system-select,minimal,theme-cycler` |
| `ext-damage-control` | `damage-control,minimal,theme-cycler` |
| `ext-agent-chain` | `agent-chain,theme-cycler` |

### Group 3: Advanced Stacks

| Target | Stack |
|--------|-------|
| `ext-pi-pi` | `pi-pi,theme-cycler` |
| `ext-full-stack` | `agent-team,damage-control,theme-cycler` |

### Utilities

| Target | Stack |
|--------|-------|
| `ext-session-replay` | `session-replay,minimal` |
| `ext-theme-cycler` | `theme-cycler,minimal` |
| `stack <list>` | `{{ list }}` (arbitrary) |

## Usage Maps

Detailed usage documentation is available in `.pi/docs/`:

| Document | Coverage |
|----------|----------|
| [UI Extensions Usage](../docs/UI-EXTENSIONS-USAGE.md) | `src/ui/` (11 files) |
| [Util Extensions Usage](../docs/UTIL-EXTENSIONS-USAGE.md) | `util/` (12 files) |
| [Main UI Extensions Usage](../docs/MAIN-UI-EXTENSIONS-USAGE.md) | `ui/` (6 files) |
| [Combined Extensions Usage](../docs/COMBINED-EXTENSIONS-USAGE.md) | All three directories |
| [Justfile Startup Mechanism](../docs/JUSTFILE-STARTUP-MECHANISM.md) | How extensions are launched |

## Adding Extensions

1. Place your `.ts` file in the appropriate directory:
   - `ui/` — Primary entry-point extensions
   - `util/` — Utility functions and shared tools
   - `src/ui/` — UI components and themes

2. Export a default async function:
   ```typescript
   export default async function (pi: ExtensionAPI) {
     // Your extension code
   }
   ```

3. Register in `util/manifest.ts` (for categorized loading):
   ```typescript
   "my-extension": {
     category: "function",
     description: "My extension description"
   }
   ```

4. Add a justfile target:
    ```justfile
    ext-my-extension:
        @just run-pi "my-extension,theme-cycler"
    ```

> **Note:** Extensions are loaded via `just ext-<name>`, never via multiple `pi -e` flags. Pi 0.70.5+ made stacking `-e` flags unstable.

## Dependency Graph

```
ui/ (Entry Points)
├── agent-team.ts ──→ themeMap.ts, memory-export.ts, memory.ts
├── agent-chain.ts  ── (standalone)
├── cross-agent.ts  ── (standalone)
├── pi-pi.ts        ── (standalone)
├── subagent-widget.ts ── (standalone)
└── tilldone.ts     ── (standalone)

src/ui/ (Components)
├── themeMap.ts     ── (leaf, no internal imports)
├── theme-cycler.ts ──→ themeMap.ts
├── pure-focus.ts   ──→ themeMap.ts
└── agent-team-chain.ts ──→ agent-team.ts, themeMap.ts

util/ (Utilities)
├── memory.ts       ── (standalone)
├── memory-export.ts ── (standalone)
├── memory-tools.ts ──→ memory-export.ts
├── damage-control.ts ──→ themeMap.ts
├── agent-switch.ts ──→ themeMap.ts
├── pi-loader.ts    ──→ manifest.ts, themeMap.ts
└── justfilechain   ── (references agent-team.ts)
```

## Key Observations

1. **`themeMap.ts` is the universal dependency** — imported across all three directories
2. **5 of 6 `ui/` files are standalone** — no internal imports, independently loadable
3. **`agent-team.ts` is the only hub** — multiple dependencies and external consumers
4. **No cross-imports within `ui/`** — entry points are decoupled from each other
5. **Memory export is central** — consumed by both `ui/` entry points and `util/` tools

---

**Version**: 1.0.0 | **Author**: @zerwiz | **License**: MIT
