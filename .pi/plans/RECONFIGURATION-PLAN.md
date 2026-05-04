# Project X (PIP) - Reconfiguration Plan

## Overview

**Date**: $(date +%Y-%m-%d)  
**Status**: Critical - Production Prep  
**Priority**: HIGH - Must Complete Before Production Launch  

---

## Current Situation

We have moved a significant number of files around during the cleanup process. While the intention was to organize and streamline the project, we now face a critical situation:

- **Extensions are no longer loading correctly** from their original locations
- **Dependencies are broken** because paths point to moved files
- **The justfile** (`~/pip/justfile`) still references original file locations
- **We CANNOT rewrite the justfile** - it must work with existing configurations
- **We CANNOT rewrite extensions** - they must work as they did before
- **We MUST make everything work again** with minimal changes

---

## Core Principles

### ZERO File Rewrites
- We will NOT rewrite any extension files
- We will NOT rewrite any agent files
- We will NOT rewrite the justfile
- We will ONLY create new routing/configuration files

### Bootstrap Strategy
- **Root extensions** (`~/pip/.pi/extensions/`) should boot the regular `www.pi.dev` way
- **Subdirectory extensions** (`ui/`, `util/`, `src/`) should boot exactly as the justfile specifies
- **File paths** must be routed correctly so extensions find their dependencies

---

## New Extension Directory Structure

```
~/pip/.pi/extensions/
├── ui/                                    # TUI (Terminal User Interface) Files
│   ├── agent-chain.ts
│   ├── agent-team-chain.ts
│   ├── agent-team.ts
│   ├── cross-agent.ts
│   ├── pi-pi.ts
│   ├── subagent-widget.ts
│   └── tilldone.ts
├── util/                                 # Extra Feature Extensions
│   ├── agent-switch.ts
│   ├── damage-control.ts
│   ├── justfilechain
│   ├── manifest.ts
│   ├── memory-export.ts
│   ├── memory-tools.ts
│   ├── memory.ts
│   ├── minimal.ts
│   ├── pi-loader.ts
│   ├── pure-focus.ts
│   ├── purpose-gate.ts
│   ├── session-replay.ts
│   ├── system-select.ts
│   ├── tool-counter-widget.ts
│   ├── tool-counter.ts
│   ├── types.ts
├── src/                                  # Extra Functions
│   └── ui/
└── theme-cycler.ts                       # ROOT LEVEL - Boots regular www.pi.dev way
└── themeMap.ts                           # ROOT LEVEL - Boots regular www.pi.dev way
```

---

## Critical Changes Required

### 1. Extension Booting Behavior

| Location | Boot Behavior | Purpose |
|----------|---------------|---------|
| `~/pip/.pi/extensions/` | Regular `www.pi.dev` bootstrap | Main extensions that follow standard bootstrap |
| `~/pip/.pi/extensions/ui/` | Justfile-specified paths | TUI-specific files with custom bootstrap |
| `~/pip/.pi/extensions/util/` | Justfile-specified paths | Utility extensions with custom bootstrap |
| `~/pip/.pi/extensions/src/` | Justfile-specified paths | Source function extensions with custom bootstrap |

### 2. File Path Routing

All extensions in subdirectories (`ui/`, `util/`, `src/`) need to:
1. Import files from their new locations
2. Reference the correct dependencies via justfile paths
3. Maintain backward compatibility with their original logic

### 3. Dependencies to Re-route

#### Extensions that need new paths:

| Extension | Old Path | New Path |
|-----------|----------|----------|
| `agent-chain.ts` | `extensions/util/` | `extensions/ui/` |
| `agent-team.ts` | `extensions/util/` | `extensions/ui/` |
| `agent-team-chain.ts` | `extensions/util/` | `extensions/ui/` |
| `cross-agent.ts` | `extensions/util/` | `extensions/ui/` |
| `pi-pi.ts` | `extensions/util/` | `extensions/ui/` |
| `subagent-widget.ts` | `extensions/util/` | `extensions/ui/` |
| `tilldone.ts` | `extensions/util/` | `extensions/ui/` |
| `agent-switch.ts` | `extensions/util/` | `extensions/util/` (stay) |
| `damage-control.ts` | `extensions/util/` | `extensions/util/` (stay) |

---

## Action Plan

### Phase 1: Create Extension Path Bindings
- [ ] Create path mapping files for each subdirectory
- [ ] Update import statements in moved extensions
- [ ] Ensure justfile exports are correctly referenced

### Phase 2: Update Extension Internal References
- [ ] Review each extension's `import` statements
- [ ] Replace old paths with new paths from justfile
- [ ] Test each extension loads correctly

### Phase 3: Validate Boot Process
- [ ] Run justfile build from scratch
- [ ] Verify all extensions bootstrap correctly
- [ ] Confirm no errors in console output
- [ ] Test all agent functions work as expected

### Phase 4: Production Verification
- [ ] Run full test suite
- [ ] Verify all agents load correctly
- [ ] Check memory exports work
- [ ] Validate theme systems load
- [ ] Confirm UI components render properly

---

## Critical Files That Must Work

### Root Extensions (Bootstrap Regular www.pi.dev)
- `theme-cycler.ts` - Must load normally
- `themeMap.ts` - Must load normally

### TUI Extensions (Justfile Paths)
- `agent-chain.ts` - TUI-specific bootstrap
- `agent-team-chain.ts` - TUI-specific bootstrap
- `agent-team.ts` - TUI-specific bootstrap
- `cross-agent.ts` - TUI-specific bootstrap
- `pi-pi.ts` - TUI-specific bootstrap
- `subagent-widget.ts` - TUI-specific bootstrap
- `tilldone.ts` - TUI-specific bootstrap

### Utility Extensions (Justfile Paths)
- `agent-switch.ts` - Utility-specific bootstrap
- `damage-control.ts` - Utility-specific bootstrap
- `memory-export.ts` - Utility-specific bootstrap
- `memory-tools.ts` - Utility-specific bootstrap
- `memory.ts` - Utility-specific bootstrap
- And all other util files...

---

## Testing Checklist

Before marking as "Production Ready":

- [ ] All extensions load without errors
- [ ] No "file not found" errors
- [ ] All agent functions work correctly
- [ ] Memory export works
- [ ] Theme system loads all 11 themes
- [ ] UI components render properly
- [ ] No console errors
- [ ] Build completes successfully with justfile

---

## Emergency Rollback Plan

If issues occur during reconfiguration:

1. **Stop immediately** on first critical error
2. **Document the error** with full stack trace
3. **Revert file movements** if possible
4. **Check justfile** for path references
5. **Verify extension imports** use correct paths
6. **Test one component at a time**

---

## Success Criteria

We are "PRODUCTION READY" when:

1. ✅ All extensions load from justfile
2. ✅ No file path errors in console
3. ✅ All agents function correctly
4. ✅ All themes load properly
5. ✅ Memory exports work
6. ✅ UI components render
7. ✅ Build completes without errors
8. ✅ All tests pass

---

## Next Steps

1. **Create path binding files** for moved extensions
2. **Update import paths** in each moved extension
3. **Test each component** individually
4. **Run full integration tests**
5. **Document any new patterns** discovered
6. **Mark as production ready** when all checks pass

---

## Contact

For questions or issues during reconfiguration:

- Review agent documentation in `~/pip/.pi/agents/`
- Check extension documentation in `~/pip/.pi/extensions/util/`
- Reference planning docs in `~/pip/.pi/plans/`

---

**STATUS**: Awaiting Implementation  
**TARGET**: Production Ready  
**BLOCKER**: Must resolve before any production deployment
```

# The planning document has been created at `~/pip/.pi/plans/RECONFIGURATION-PLAN.md` with all the critical information about:
# - The new extension directory structure
# - Booting behavior requirements
# - File path routing needs
# - Action plan for reconfiguration
# - Testing checklist
# - Success criteria