# Extension Operational Checklist

**For Pi 0.70.5+ — Justfile-first extension loading**

---

## Extension Loading (Pi 0.70.5+)

### [ ] Use justfile, never stacked `-e` flags

```bash
# CORRECT — via justfile
just ext-full-stack
just stack "agent-team,damage-control,theme-cycler"

# WRONG — unstable in 0.70.5
# pi -e ext1.ts -e ext2.ts -e ext3.ts
```

### [ ] Available just targets

| Target | Stack | Purpose |
|--------|-------|---------|
| `ext-agent-team` | agent-team,theme-cycler | Dispatcher with team select |
| `ext-full-stack` | agent-team,damage-control,theme-cycler | Production stack |
| `ext-agent-chain` | agent-chain,theme-cycler | Sequential pipeline |
| `ext-minimal` | minimal,theme-cycler | Minimal mode |
| `ext-pure-focus` | pure-focus | Distraction-free |
| `ext-damage-control` | damage-control,minimal,theme-cycler | Safety auditing |
| `ext-subagent-widget` | subagent-widget,pure-focus,theme-cycler | Background subagents |
| `ext-tilldone` | tilldone,theme-cycler | Task discipline |
| `stack "a,b,c"` | custom | Arbitrary combination |

### [ ] Verify loading

- [ ] Extension loads without ESM resolution errors
- [ ] No "Multiple UI Cores detected" warnings (unless intentional)
- [ ] All tools register without duplicate name conflicts
- [ ] Widget renders correctly (if applicable)

---

## Pre-Launch Checks

### [ ] Extension files exist

```bash
# Verify core extensions are present
ls .pi/extensions/ui/agent-team.ts
ls .pi/extensions/util/pi-loader.ts
ls .pi/extensions/util/manifest.ts
ls .pi/extensions/src/ui/themeMap.ts
```

### [ ] No duplicate tool registrations

- [ ] Each tool name appears exactly once across loaded extensions
- [ ] `agent-team.ts` does not have duplicate `list_teams`, `list_agents`, `list_active_team`
- [ ] No cross-extension tool name collisions

### [ ] Extension manifest is current

- [ ] `.pi/extensions/util/manifest.ts` includes your extension name and category
- [ ] Category is correct: `ui-core`, `ui-widget`, `function`, or `utility`

### [ ] Import paths resolve

- [ ] Extensions in `ui/` use `../util/` and `../src/ui/` relative paths
- [ ] Extensions in `util/` use `./` and `../src/ui/` relative paths
- [ ] `themeMap.ts` is imported via `../src/ui/themeMap.ts` or `./themeMap.ts`

---

## Post-Launch Verification

### [ ] Team roster loads

- [ ] Widget shows specialist agents (not "No active specialists loaded.")
- [ ] Active team name displays in footer
- [ ] Context usage bar renders correctly

### [ ] Tools respond

- [ ] `list_teams` — shows teams from `teams.yaml`
- [ ] `list_agents` — shows agents from `agents.yaml`
- [ ] `list_active_team` — shows currently loaded agents
- [ ] `dispatch_agent` — spawns child process with correct model and tools
- [ ] `switch_team` — swaps roster without errors
- [ ] `manage_team` — add/remove agents from active roster
- [ ] `save_memory` — writes to project memory scope

### [ ] Agent discovery works

- [ ] Scans `agents/`, `.claude/agents/`, `.pi/agents/` directories
- [ ] Merges YAML definitions from `agents.yaml` with `.md` frontmatter
- [ ] Teams load from `.pi/agents/teams.yaml`

---

## Memory System

### [ ] Memory directories exist

```bash
# Check all three scopes
ls .pi/agent-memory/          # project scope
ls ~/.pi/agent-memory/        # user scope (global)
ls .pi/agent-memory-local/    # local scope (dev overrides)
```

### [ ] Memory export works

- [ ] `memory-export:json` — writes to `.pi/memory-export.json`
- [ ] `memory-export:md` — writes to `.pi/memory-export.md`
- [ ] `memory-export:text` — writes to `.pi/memory-export.txt`
- [ ] `memory-export:preview` — shows preview without writing

### [ ] Memory safety

- [ ] Agent names are alphanumeric (no directory traversal)
- [ ] No symlinks in memory directories
- [ ] MEMORY.md files respect 200-line read limit

---

## Damage Control

### [ ] Safety system active

- [ ] `damage-control.ts` loaded first in the stack
- [ ] Rules file exists: `.pi/damage-control-rules.yaml`
- [ ] Dangerous patterns blocked: `rm -rf`, `git push --force`, cloud CLI secrets
- [ ] Read-only paths protected: `.env`, SSH keys, cloud credentials
- [ ] No-delete paths enforced: `.git/`, `LICENSE`, `README`, CI configs

### [ ] Error handling

- [ ] Agent spawn failures show clear error message
- [ ] Tool registration conflicts are caught (not silent failures)
- [ ] Missing memory directories are created automatically
- [ ] Widget render failures don't crash the session

---

## State Management

### [ ] Session lifecycle

- [ ] `session_start` hook fires — loads agents, activates team, sets footer
- [ ] `before_agent_start` hook fires — injects agent catalog and directives
- [ ] Running agents show elapsed time, tool count, context usage
- [ ] Completed agents show checkmark and final status

### [ ] Per-agent state tracked

- [ ] `status`: idle / running / done / error
- [ ] `elapsed`: milliseconds since dispatch
- [ ] `toolCount`: number of tool calls made
- [ ] `contextPct`: percentage of context window used
- [ ] `sessionFile`: path to persistent session JSON
- [ ] `runCount`: number of times agent has been dispatched

---

## Before Committing Changes

### [ ] Test extension loading

- [ ] Load each extension individually: `just ext-<name>`
- [ ] Load common stacks: `just ext-full-stack`, `just ext-agent-chain`
- [ ] Verify no console errors or ESM resolution failures
- [ ] Confirm tools register and respond to invocations

### [ ] Test agent workflows

- [ ] Dispatch an agent task and verify output
- [ ] Switch teams and verify roster changes
- [ ] Save memory and verify file is written
- [ ] Export memory and verify output format

### [ ] Test chains (if applicable)

- [ ] Define chain in `.pi/agents/agent-chain.yaml`
- [ ] Run via `run_chain` tool
- [ ] Verify step output flows to next step's `$INPUT`
- [ ] Confirm `$ORIGINAL` variable persists across all steps

### [ ] Update documentation

- [ ] Update relevant usage maps in `.pi/docs/`
- [ ] Update this checklist if procedures changed
- [ ] Update `CHANGELOG.md` with description of changes
- [ ] Ensure extension is registered in `manifest.ts`

---

## Troubleshooting

### Tools not showing

1. Verify loading via justfile (`just ext-<name>`, NOT `pi -e`)
2. Check extension file exists in `.pi/extensions/` or subdirectory
3. Look for duplicate tool name registrations
4. Verify `pi.setActiveTools([...])` includes your tool in `session_start`
5. Check `manifest.ts` has your extension registered

### Extension fails to load (ESM error)

1. Pi 0.70.5+ requires absolute `file://` URIs for dynamic imports
2. `pi-loader.ts` handles this automatically — ensure you're using it
3. Never pass multiple `-e` flags directly to `pi`
4. Check import paths inside the extension use relative paths correctly

### Widget not rendering

1. Verify `widgetCtx` is set in `session_start`
2. Check `updateWidget()` is called after state changes
3. Ensure `pi.ui.setWidget()` is called with valid render function
4. Look for `RangeError` in progress bar calculations (should be clamped 0-5)

### Agents not loading

1. Check `.pi/agents/` directory has `.md` files with YAML frontmatter
2. Verify `teams.yaml` exists at `.pi/agents/teams.yaml`
3. Confirm `loadAgents(cwd)` is called in `session_start`
4. Check `scanAgentDirs(cwd)` finds files in `agents/`, `.claude/agents/`, `.pi/agents/`

### Memory not persisting

1. Verify correct scope: `user` (~/.pi/), `project` (.pi/), `local` (.pi/...-local/)
2. Check memory directory permissions
3. Ensure agent name is safe (alphanumeric, no special chars)
4. Review memory block injection in `before_agent_start` system prompt

---

## Quick Reference

| Need | Command |
|------|---------|
| Start extensions | `just ext-<name>` or `just stack "a,b,c"` |
| List targets | `just` |
| Run plain pi | `just pi` |
| Check extension files | `ls .pi/extensions/ui/ .pi/extensions/util/ .pi/extensions/src/ui/` |
| Check memory | `ls .pi/agent-memory/` |
| Check agents | `ls .pi/agents/*.md` |
| View changelog | `cat CHANGELOG.md` |
| View structure | `cat .pi/docs/STRUCTURE.md` |

---

**Updated**: May 2, 2026 — Pi 0.70.5+ compatibility
