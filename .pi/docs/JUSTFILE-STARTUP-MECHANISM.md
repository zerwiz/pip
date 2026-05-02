# Justfile Extension Startup Mechanism

## Overview

The justfile uses a **single-entry dynamic loader** pattern to start extensions. Instead of passing multiple `-e` flags directly to `pi`, it sets an environment variable and loads a single orchestrator (`pi-loader.ts`) that resolves and initializes all requested extensions.

> **Why This Exists:** Pi 0.70.5+ made stacking multiple `-e` flags (`pi -e ext1.ts -e ext2.ts -e ext3.ts`) unstable due to stricter ESM resolution and sandboxing. The justfile + `pi-loader.ts` pattern works around this by using a single `-e` flag.

---

## Pi 0.70.5+ Breaking Change

### Before (v0.70.3 — Unstable Now)
```bash
pi -e extensions/agent-team.ts -e extensions/theme-cycler.ts -e extensions/damage-control.ts
```

### After (v0.70.5+ — Correct)
```bash
# Via justfile (recommended)
just ext-full-stack

# Or custom stack
just stack "agent-team,theme-cycler,damage-control"
```

**What changed:**
- Multiple `-e` flags cause ESM resolution conflicts and async initialization races
- Multiple extensions controlling the same UI elements (like the footer) caused terminal corruption and flickering
- The loader uses absolute `file://` URIs to satisfy v0.70.5's stricter module resolution requirements

---

## How It Works

### Step 1: Justfile Target Sets `PI_STACK`

Each target in the justfile calls `just run-pi "comma,separated,list"`:

```justfile
run-pi stack:
    @export PI_STACK="{{ stack }}" && pi -e .pi/extensions/util/pi-loader.ts
```

Example:
```bash
just run-pi "agent-team,damage-control,theme-cycler"
```

This sets `PI_STACK="agent-team,damage-control,theme-cycler"` and runs pi with a single `-e` flag pointing to `pi-loader.ts`.

### Step 2: `pi-loader.ts` Reads `PI_STACK`

The loader reads the environment variable and splits it:

```typescript
const stackEnv = process.env.PI_STACK || "";
const extensionNames = stackEnv.split(",").map((ext) => ext.trim());
```

### Step 3: Extensions Are Categorized

The loader consults `EXTENSION_MANIFEST` to categorize each extension:

| Category | Load Priority | Examples |
|----------|---------------|----------|
| `utility` | 1st | `damage-control`, `memory-export` |
| `function` | 2nd | `agent-team`, `agent-chain` |
| `ui-core` | 3rd | `minimal`, `pure-focus` |
| `ui-widget` | 4th | `tool-counter-widget`, `subagent-widget` |
| `unknown` | 5th | Any unrecognized name |

### Step 4: UI Core Conflict Resolution

If multiple `ui-core` extensions are specified, **only the last one wins**:

```
PI_STACK="minimal,pure-focus,theme-cycler"
→ Discards: minimal, theme-cycler
→ Keeps: pure-focus
```

A warning is logged:
```
[PI Loader] ⚠️  UI Conflict: Multiple UI Cores detected. Keeping only "pure-focus".
```

### Step 5: Extensions Are Resolved by Path

For each extension name, the loader searches these directories in order:

```
1. extensions/<name>.ts
2. extensions/<name>.js
3. .pi/extensions/<name>.ts
4. .pi/extensions/ui/<name>.ts
5. .pi/extensions/util/<name>.ts
6. .pi/extensions/src/ui/<name>.ts
```

First match wins.

### Step 6: Extensions Are Loaded and Initialized

```typescript
const module = await import(`file://${foundPath}`);
const factory = module.default;
if (typeof factory === "function") {
    await factory(pi);
}
```

Each extension must export a `default` async function that receives the `ExtensionAPI` object.

---

## All Justfile Targets

### Group 1: Basic Extensions

| Target | Stack | Purpose |
|--------|-------|---------|
| `ext-pure-focus` | `pure-focus` | Strip footer and status line |
| `ext-minimal` | `minimal,theme-cycler` | Model name + context meter |
| `ext-cross-agent` | `cross-agent,minimal` | Load commands from other AI agent dirs |
| `ext-purpose-gate` | `purpose-gate,minimal` | Declare intent before working |
| `ext-tool-counter` | `tool-counter` | Customized footer with stats |
| `ext-tool-counter-widget` | `tool-counter-widget,minimal` | Tool counts in below-editor widget |
| `ext-subagent-widget` | `subagent-widget,pure-focus,theme-cycler` | `/sub` with live streaming |
| `ext-tilldone` | `tilldone,theme-cycler` | Task-driven discipline |

### Group 2: Agent Extensions

| Target | Stack | Purpose |
|--------|-------|---------|
| `ext-agent-team` | `agent-team,theme-cycler` | Dispatcher with team select |
| `ext-system-select` | `system-select,minimal,theme-cycler` | `/system` persona picker |
| `ext-damage-control` | `damage-control,minimal,theme-cycler` | Safety auditing |
| `ext-agent-chain` | `agent-chain,theme-cycler` | Sequential pipeline |

### Group 3: Advanced Stacks

| Target | Stack | Purpose |
|--------|-------|---------|
| `ext-pi-pi` | `pi-pi,theme-cycler` | Meta-agent with parallel research |
| `ext-full-stack` | `agent-team,damage-control,theme-cycler` | Full production stack |

### Group: Utilities

| Target | Stack | Purpose |
|--------|-------|---------|
| `ext-session-replay` | `session-replay,minimal` | Scrollable session timeline |
| `ext-theme-cycler` | `theme-cycler,minimal` | Theme cycling controls |
| `stack <list>` | `{{ list }}` | Arbitrary stack on the fly |

### Group: Agent-Team-Chain Suite

| Target | Purpose |
|--------|---------|
| `build-agent-team-chain` | Echoes build validation steps |
| `test-agent-team-chain` | Runs tests if `tests/` dir exists |
| `run-agent-team-chain` | Runs `agent-team,agent-team-chain,theme-cycler,damage-control` |
| `verify-agent-team-chain` | Validates file existence, imports, tool registration, exports, justfile integration, error handling |

---

## Usage Examples

### Quick Start
```bash
just ext-minimal          # Minimal mode with theme cycler
just ext-full-stack       # Full agent team + damage control
just stack "minimal,pure-focus"   # Arbitrary combination
```

### Custom Stack
```bash
just stack "agent-team,damage-control,theme-cycler"
```

### Verify Extension Health
```bash
just verify-agent-team-chain
```

---

## Why This Design?

1. **Single `-e` flag:** Pi 0.70.5+ is more stable with one `-e` flag instead of multiple.
2. **Categorized loading:** Ensures utilities load before UI components that depend on them.
3. **Conflict resolution:** Prevents incompatible UI cores from fighting over the footer.
4. **Flexible discovery:** Searches multiple directories so extensions can be organized logically.
5. **Error isolation:** One failing extension doesn't crash the entire stack.

---

## File Locations

```
justfile                              # Entry point targets
.pi/extensions/util/pi-loader.ts      # Dynamic loader orchestrator
.pi/extensions/util/manifest.ts       # Extension categories and metadata
.pi/extensions/ui/                    # Primary extensions (agent-team, etc.)
.pi/extensions/util/                  # Utility extensions (damage-control, etc.)
.pi/extensions/src/ui/                # UI components (minimal, pure-focus, etc.)
```
