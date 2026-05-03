# Extension System

## Overview
 
This directory (`extensions/`) is the **primary location for all Pi extensions**.
 
## Directory Structure
 
```
pip/
├── extensions/                 # Primary extension location
│   └── README.md              # This file
└── justfile                   # Loads extensions via pi-loader
```
 
## Loading
 
Extensions are loaded via the justfile using `pi-loader.ts`:
 
```bash
just ext-full-stack
  → PI_STACK="agent-team,damage-control,theme-cycler"
  → pi -e .pi/extensions/util/pi-loader.ts
```
 
The `pi-loader.ts` resolver searches multiple directories to find extensions.

## Creating New Extensions
 
### Step 1: Create the Extension File
 
```bash
# Create in root extensions/ directory
vi extensions/my-extension.ts
```
 
### Step 2: Implement Default Factory
 
Every extension must export a default factory function:
 
```typescript
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
 
export default function (pi: ExtensionAPI) {
  // Your extension logic here
  pi.registerCommand("my-command", {
    description: "My custom command",
    handler: async () => {
      // Command handler
    },
  });
}
```
 
### Step 3: Register in justfile
 
Add a justfile target:
```just
ext-my-extension:
    @just run-pi "my-extension,theme-cycler"
```

### Step 2: Implement Default Factory

Every extension must export a default factory function:

```typescript
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  // Your extension logic here
  pi.registerCommand("my-command", {
    description: "My custom command",
    handler: async () => {
      // Command handler
    },
  });
}
```

### Step 3: Test

```bash
pi -e extensions/my-new-extension.ts
# OR via justfile target
just run-pi "my-new-extension,theme-cycler"
```

## Extension Categories

Extensions are automatically categorized by the `pi-loader` based on their registration:

| Category | Purpose | Examples |
|----------|---------|----------|
| `ui-core` | Controls main UI layout/footer | `minimal`, `tool-counter` |
| `ui-widget` | Adds widgets (panels, overlays) | `subagent-widget`, `session-replay` |
| `function` | Core agent functionality | `agent-team`, `agent-chain` |
| `utility` | Helper utilities | `damage-control`, `theme-cycler` |

## Loading in justfile

```just
# Single extension
ext-my-extension:
    @just run-pi "my-extension,theme-cycler"

# Multiple extensions
ext-full-stack:
    @just run-pi "agent-team,damage-control,theme-cycler"
```

## Extension Categories
 
Extensions are automatically categorized by the `pi-loader` based on their registration:
 
| Category | Purpose | Examples |
|----------|---------|----------|
| `ui-core` | Controls main UI layout/footer | `minimal`, `tool-counter` |
| `ui-widget` | Adds widgets (panels, overlays) | `subagent-widget`, `session-replay` |
| `function` | Core agent functionality | `agent-team`, `agent-chain` |
| `utility` | Helper utilities | `damage-control`, `theme-cycler` |
 
## Justfile Targets
 
```just
# Single extension
ext-my-extension:
    @just run-pi "my-extension,theme-cycler"
 
# Full stack
ext-full-stack:
    @just run-pi "agent-team,damage-control,theme-cycler"
```
 
## Extension Manifest
 
See `.pi/extensions/util/manifest.ts` for the official extension registry.

## Best Practices

1. **Always register hooks** in `session_start` and `session_shutdown`
2. **Validate tool registrations** to avoid duplicates
3. **Handle errors** gracefully in all async handlers
4. **Use `themeMap.ts`** for automatic theme assignment
5. **Document your extension** in header comments

## Available Themes

Extensions in `extensions/` automatically get themed via `themeMap.ts`:

- `catppuccin-mocha` — Soft, reflective history
- `cyberpunk` — Multi-agent futuristic
- `dracula` — Rich orchestration palette
- `gruvbox` — Grounded, earthy safety
- `midnight-ocean` — Deep sequential pipeline
- `nord` — Professional, calming
- `ocean-breeze` — Cross-boundary, connecting
- `rose-pine` — Warm creative meta-agent
- `synthwave` — Neon, it's a theme tool
- `tokyo-night` — Intentional, sharp focus

## See Also
 
- [`.pi/docs/MIGRATION-GUIDE.md`](../.pi/docs/MIGRATION-GUIDE.md) — Architecture migration guide
- [`.pi/docs/JUSTFILE-STARTUP-MECHANISM.md`](../.pi/docs/JUSTFILE-STARTUP-MECHANISM.md) — Startup mechanism
- [`.pi/docs/COMBINED-EXTENSIONS-USAGE.md`](../.pi/docs/COMBINED-EXTENSIONS-USAGE.md) — Usage maps
- [`.pi/agents/README.md`](../.pi/agents/README.md) — Agent system docs