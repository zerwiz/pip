# Extension Location Strategy

## Overview

This directory (`extensions/`) is the **primary location for all Pi extensions**. It follows a clean, forward-looking architecture where:

- **Existing legacy extensions** remain in `.pi/extensions/` (read-only, historical)
- **New extensions** should be created here going forward

## Directory Structure

```
pip/
├── extensions/                 # ← NEW: Primary extension location
│   ├── agent-team.ts          # Team dispatcher
│   ├── agent-chain.ts         # Chain orchestrator
│   ├── damage-control.ts      # Safety layer
│   ├── theme-cycler.ts        # Theme switching
│   ├── minimal.ts             # Minimal UI
│   └── util/                  # Shared utilities
├── .pi/extensions/            # ← LEGACY: Historical extensions
│   ├── theme-cycler.ts        # Legacy copy
│   ├── themeMap.ts            # Legacy theme mappings
│   └── util/                  # Legacy utilities
└── justfile                   # Uses both locations via pi-loader
```

## Loading Order

The `pi-loader.ts` extension resolver checks locations in this order:

1. `extensions/${extName}.ts` or `.js` (NEW extensions)
2. `.pi/extensions/${extName}.ts` (LEGACY extensions)

This ensures backward compatibility while encouraging new development in `extensions/`.

## Creating New Extensions

### Step 1: Create in `extensions/`

```bash
mkdir extensions/my-new-extension.ts
vi extensions/my-new-extension.ts
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

## Migration Notes

- Existing extensions in `.pi/extensions/` will continue to work
- New development should focus on `extensions/`
- Documentation updates reflect the new location strategy
- Legacy extensions remain read-only for reference

## Extension Manifest

See `extensions/util/manifest.ts` for the official extension registry.

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

- `.pi/docs/MIGRATION-GUIDE.md` — Detailed migration steps
- `.pi/docs/CHECKLIST.md` — Daily maintenance checklist
- `.pi/extensions/themeMap.ts` — Theme mapping reference
- `util/manifest.ts` — Extension registry