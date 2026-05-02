# Agent Team Chain Extension - Documentation

## Overview

This file documents the `agent-team-chain.ts` extension for that enables agent team functionality with proper memory management, cleanup, and justfile integration.


## File Location

```
piwithstuff/
└── .pi/extensions/
    └── ui/
        ├── agent-team-chain.ts          # Fixed extension (516 lines)
        └── AGENT-TEAM-CHAIN-TEST.md     # This documentation
```

**Note**: Extensions in `.pi/extensions/` are loaded via justfile (`/home/zerwiz/pip/justfile`). New custom extensions should be created in `/home/zerwiz/pip/extensions/`.

## Extension Loading Summary

- **`.pi/extensions/`**: Loaded via justfile (DO NOT use `pi -e`)
  - theme-cycler.ts, themeMap.ts
  - agent-team.ts, agent-chain.ts
  - damage-control.ts
  - All utilities

- **`extensions/`**: For future new development
  - Custom extensions
  - Theme extensions
  - New utilities

Use `just run-pi "extension1,extension2"` to load extensions via justfile targets.

## Status: ✅ Implementation Complete

- ✅ All imports properly from agent-team.ts
- ✅ No duplicate tool registrations
- ✅ All variables properly declared
- ✅ No duplicate event hooks
- ✅ Justfile integration commands added
- ✅ Error handling and memory cleanup
- ✅ VSC extension system compliant

