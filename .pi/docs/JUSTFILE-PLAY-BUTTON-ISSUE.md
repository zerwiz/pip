# Justfile Play Button Issue

## Problem

When clicking the "play button" (Run/Execute) on `justfile` in your editor (VS Code, etc.), you get:

```
Command 'conda' not found, did you mean:
  command 'conga' from snap conga (1.4.0)
bash: ~/pip/justfile: Permission denied
```

## Root Cause

The justfile uses **`just` syntax**, not bash. When you click the play button:

1. Editor tries to run `bash justfile`
2. Bash can't parse `just` syntax (`set dotenv-load := true` is not valid bash)
3. Bash fails and may try to run `conda` (from some path/env issue)
4. Even if it could parse it, justfiles must be run with the `just` command

## Solution

### ❌ Don't Use the Play Button

Justfiles are **not executable bash scripts**. The play button in editors expects bash/sh syntax.

### ✅ Use Terminal Instead

```bash
cd /home/zerwiz/pip

# List all available commands
just

# Run specific targets
just ext-full-stack        # Agent Team + Damage Control + Theme Cycler
just ext-agent-team        # Agent team only
just ext-minimal           # Minimal mode
just ext-damage-control    # Safety auditing
just ext-agent-chain       # Pipeline orchestrator
just ext-pi-pi            # Meta-agent

# Custom stack (arbitrary combination)
just stack "agent-team,damage-control,theme-cycler"
```

### ✅ Configure Editor (Optional)

For VS Code, create `.vscode/tasks.json` to bind the play button to `just`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Justfile",
      "type": "shell",
      "command": "just",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
```

## How Justfiles Work

| Feature | Bash Script | Justfile |
|---------|-------------|----------|
| Syntax | Bash/sh | Custom `just` syntax |
| Execution | `bash file.sh` | `just target` |
| Variables | `VAR=value` | `VAR := value` |
| Imports | `source file` | `import` (not needed) |
| Dependency | N/A | `depends: [other-target]` |

## Common Just Commands

```bash
just                    # List all targets
just ext-full-stack     # Production stack
just ext-agent-team    # Dispatcher orchestrator
just ext-minimal        # Minimal UI
just stack "a,b,c"     # Custom combination
```

## Note on `conda` Error

The `conda` reference is from Rust crate files in `/home/zerwiz/.cargo/registry/` (contains the word "conga"). It's unrelated to the justfile — just a misleading error message from bash failing to parse the file.

---

**Quick Fix**: Always run `just <target>` from terminal. Don't use the play button.
