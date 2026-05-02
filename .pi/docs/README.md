# Pi Documentation Library

Complete documentation for the PIP agent platform, organized by category.

## Quick Reference

| Need | Document |
|------|----------|
| Full project structure | [STRUCTURE.md](STRUCTURE.md) |
| How to run extensions | [JUSTFILE-STARTUP-MECHANISM.md](JUSTFILE-STARTUP-MECHANISM.md) |
| Extension usage maps | [COMBINED-EXTENSIONS-USAGE.md](COMBINED-EXTENSIONS-USAGE.md) |
| Agent YAML configs | [AGENT-YAML-CONFIGURATION.md](AGENT-YAML-CONFIGURATION.md) |
| Migration guide | [MIGRATION-GUIDE.md](MIGRATION-GUIDE.md) |
| Daily checklist | [CHECKLIST.md](CHECKLIST.md) |

---

## Architecture & Structure

| Document | Description | Size |
|----------|-------------|------|
| [STRUCTURE.md](STRUCTURE.md) | Complete project structure documentation — all directories, files, configuration, and runtime context at every level | ~1050 lines |

---

## Extension System

### Usage Maps

| Document | Coverage | Description |
|----------|----------|-------------|
| [UI-EXTENSIONS-USAGE.md](UI-EXTENSIONS-USAGE.md) | `src/ui/` (11 files) | Maps how each file in `.pi/extensions/src/ui/` is consumed, imported, and related to other modules. Includes consumer tables, dependency graphs, and key observations | ~250 lines |
| [UTIL-EXTENSIONS-USAGE.md](UTIL-EXTENSIONS-USAGE.md) | `util/` (12 files) | Maps how each file in `.pi/extensions/util/` is consumed, imported, and related. Covers memory, loaders, damage-control, and shared utilities | ~280 lines |
| [MAIN-UI-EXTENSIONS-USAGE.md](MAIN-UI-EXTENSIONS-USAGE.md) | `ui/` (6 files) | Maps how each file in `.pi/extensions/ui/` is consumed. Covers agent-team, agent-chain, cross-agent, pi-pi, subagent-widget, tilldone | ~220 lines |
| [COMBINED-EXTENSIONS-USAGE.md](COMBINED-EXTENSIONS-USAGE.md) | All 3 directories | Unified view of all extension directories with full dependency graph, architecture layer model, import counts, and usage patterns | ~300 lines |

### Startup & Loading

| Document | Description |
|----------|-------------|
| [JUSTFILE-STARTUP-MECHANISM.md](JUSTFILE-STARTUP-MECHANISM.md) | How the justfile starts extensions — the single-entry dynamic loader pattern, `PI_STACK` env var, `pi-loader.ts` orchestration, categorized loading, UI conflict resolution, path resolution, and all justfile targets with their stacks. **Covers the Pi 0.70.5+ breaking change** that made stacking multiple `-e` flags unstable. |

### Extension-Specific

| Document | Description |
|----------|-------------|
| [AGENT-TEAM-CHAIN-TEST.md](AGENT-TEAM-CHAIN-TEST.md) | Documents the `agent-team-chain.ts` extension — agent team functionality, memory management, cleanup, justfile integration, extension loading rules, and file location strategy |

---

## Agent System

| Document | Description |
|----------|-------------|
| [AGENT-YAML-CONFIGURATION.md](AGENT-YAML-CONFIGURATION.md) | Complete documentation of all 5 YAML files in `.pi/agents/` — `agents.yaml` (30 agents), `teams.yaml` (13 teams), `agent-chain.yaml` (14 chains), `session-manager.yaml`, `reviewer.yaml`. Includes agent categories, team rosters, pipeline chains, cross-file relationships, and quick reference |

---

## Feature Documentation

| Document | Description |
|----------|-------------|
| [PLAN-MODE.md](PLAN-MODE.md) | Plan Mode feature for the Agent Team system — forces the Dispatcher Agent to propose a plan and get user approval before executing work. Covers `isPlanMode` state toggle, `propose_plan` tool, and command integration |

---

## Migration & History

| Document | Description |
|----------|-------------|
| [MIGRATION-GUIDE.md](MIGRATION-GUIDE.md) | Agent extension architecture migration guide — extension location strategy (`.pi/extensions/` vs `extensions/`), consolidation rules, tool registration cleanup, file organization, and VSC extension system compliance |
| [UPDATE-2026-05-02.md](UPDATE-2026-05-02.md) | System update log — recursive agent discovery, standardized import architecture, enhanced TUI visibility, code robustness improvements, and remaining TODOs |

---

## Operational

| Document | Description |
|----------|-------------|
| [Extension Checklist](../extensions/CHECKLIST.md) | Daily operational checklist for the agent team system (Pi 0.70.5+ updated) |

## Legacy Archive

| Directory | Description |
|-----------|-------------|
| `olddocs/` | Historical planning documents, migration summaries, and reference guides from the z.ai era |

---

## Document Inventory

All 12 documents at a glance:

| # | Document | Category | Lines |
|---|----------|----------|-------|
| 1 | [STRUCTURE.md](STRUCTURE.md) | Architecture | ~1050 |
| 2 | [MIGRATION-GUIDE.md](MIGRATION-GUIDE.md) | Migration | ~515 |
| 3 | [CHECKLIST.md](CHECKLIST.md) | Operational | ~344 |
| 4 | [COMBINED-EXTENSIONS-USAGE.md](COMBINED-EXTENSIONS-USAGE.md) | Extensions | ~300 |
| 5 | [UTIL-EXTENSIONS-USAGE.md](UTIL-EXTENSIONS-USAGE.md) | Extensions | ~280 |
| 6 | [UI-EXTENSIONS-USAGE.md](UI-EXTENSIONS-USAGE.md) | Extensions | ~250 |
| 7 | [MAIN-UI-EXTENSIONS-USAGE.md](MAIN-UI-EXTENSIONS-USAGE.md) | Extensions | ~220 |
| 8 | [AGENT-YAML-CONFIGURATION.md](AGENT-YAML-CONFIGURATION.md) | Agents | — |
| 9 | [JUSTFILE-STARTUP-MECHANISM.md](JUSTFILE-STARTUP-MECHANISM.md) | Extensions | — |
| 10 | [AGENT-TEAM-CHAIN-TEST.md](AGENT-TEAM-CHAIN-TEST.md) | Extensions | ~44 |
| 11 | [PLAN-MODE.md](PLAN-MODE.md) | Features | ~101 |
| 12 | [UPDATE-2026-05-02.md](UPDATE-2026-05-02.md) | History | ~48 |

---

## Documentation by Topic

### Start Here
1. [STRUCTURE.md](STRUCTURE.md) — Understand the project layout
2. [COMBINED-EXTENSIONS-USAGE.md](COMBINED-EXTENSIONS-USAGE.md) — Understand the extension system
3. [AGENT-YAML-CONFIGURATION.md](AGENT-YAML-CONFIGURATION.md) — Understand the agent system

### Daily Operations
- [CHECKLIST.md](CHECKLIST.md) — Run through before each session
- [JUSTFILE-STARTUP-MECHANISM.md](JUSTFILE-STARTUP-MECHANISM.md) — Reference for starting extensions

### Deep Dives
- [UI-EXTENSIONS-USAGE.md](UI-EXTENSIONS-USAGE.md) — `src/ui/` details
- [UTIL-EXTENSIONS-USAGE.md](UTIL-EXTENSIONS-USAGE.md) — `util/` details
- [MAIN-UI-EXTENSIONS-USAGE.md](MAIN-UI-EXTENSIONS-USAGE.md) — `ui/` details

### History & Migration
- [MIGRATION-GUIDE.md](MIGRATION-GUIDE.md) — Architecture migration
- [UPDATE-2026-05-02.md](UPDATE-2026-05-02.md) — Latest system update

---

**Total Documents**: 12 | **Total Lines**: ~3200+
