# Changelog

All notable changes to PIP (Pi Agent Platform).

## [Unreleased]

### Added

- **Required agent directories** — `.pi/build_logs/`, `.pi/reference/`, `.pi/referencefiles/`, `.pi/reviews/`, `.pi/planning/`, `.pi/security_audits/`, `.pi/web_output/` for developer/reviewer workflow
- **Review request queue** — `.pi/build_logs/review_requests.md` for developer→reviewer handoff
- **Agent creation checklist** — `.pi/agents/CHECKLIST.md` with directory validation, YAML formatting, and path verification rules
- **Pi 0.70.5+ compatibility layer** — Justfile-based single-entry extension loader (`pi-loader.ts`) replaces unstable stacked `-e` flags
- **Implementation plan** — `.pi/plans/IMPLEMENT-MISSING-FEATURES.md` with 10 phases to restore plan mode system, tools, commands, and system prompt enhancements to `agent-team.ts`
- **Agent system** — 30 specialized agents across 5 categories (Core, Specialists, Domain, Homepage, Meta Experts) defined in `.pi/agents/`
- **Team rosters** — 13 pre-built teams in `agents/teams.yaml` (project teams, domain teams, global access)
- **Pipeline chains** — 14 sequential workflow chains in `agents/agent-chain.yaml` with `$INPUT` and `$ORIGINAL` variable templates
- **Session workflows** — Session management and analysis workflows in `agents/session-manager.yaml`
- **Extension system** — Three-layer extension architecture:
  - Entry layer (`extensions/ui/`) — 6 primary extensions (agent-team, agent-chain, cross-agent, pi-pi, subagent-widget, tilldone)
  - Middle layer (`extensions/util/`) — 12 utilities (pi-loader, damage-control, memory, manifest, types, etc.)
  - Base layer (`extensions/src/ui/`) — 10 shared UI components (themeMap, theme-cycler, pure-focus, minimal, etc.)
- **Dynamic extension loader** (`pi-loader.ts`) — Single-entry loader with categorized loading order, UI core conflict resolution, and multi-directory path resolution
- **Justfile startup system** — `run-pi` helper with ~25 targets for different extension stacks
- **Extension manifest** — Categorized extension metadata (ui-core, ui-widget, function, utility) with conflict resolution
- **Damage control system** — 60+ dangerous command pattern rules, read-only/no-delete path protections, per-path override rules, interactive settings modal
- **Theme system** — 11 pre-configured themes (catppuccin-mocha, cyberpunk, dracula, everforest, gruvbox, midnight-ocean, nord, ocean-breeze, rose-pine, synthwave, tokyo-night)
- **Memory system** — Multi-scope memory (user/project/local) with export to JSON, text, markdown, stats, and filtered formats
- **Python modules** — Model resolver, model selector, models, prompt templates, and test suites
- **Documentation library** — Documentation covering structure, extension usage maps, startup mechanism, YAML configuration, migration guide, and plan mode
- **Cross-agent discovery** — Scans `.claude/`, `.gemini/`, `.codex/` directories for commands, skills, and agents
- **Legacy docs archive** — `.pi/docs/olddocs/` stores reference planning docs, migration summaries, and legacy guides
- **Extension checklist** — Moved to `.pi/extensions/CHECKLIST.md` with Pi 0.70.5+ updated procedures

### Changed

- **Pi 0.70.5+ breaking change** — Multiple `-e` flags (`pi -e ext1.ts -e ext2.ts`) are unstable; all extensions now loaded via justfile with single `-e` flag to `pi-loader.ts`
- **Removed all hardcoded paths from agent definitions** — 16 references across 11 agent files converted from `/piwithstuff/` and `/pip/` to relative `.pi/...` paths
- **Documentation sweep** — All 8 README/docs updated to reflect justfile-first loading pattern, removed outdated `pi -e` multi-flag examples
- **Extension checklist** — Moved from `.pi/docs/CHECKLIST.md` to `.pi/extensions/CHECKLIST.md`, updated for Pi 0.70.5+ loading procedures
- **STRUCTURE.md** — Added reference to `.pi/docs/olddocs/` legacy archive directory
- Standardized import architecture across all extensions with correct relative paths to `themeMap.ts`, `memory-export.ts`, and `memory.ts`
- Migrated from z.ai skills to Pi-native extension patterns
- Moved extensions from flat structure to three-layer hierarchy (`ui/`, `util/`, `src/ui/`)
- Consolidated extension loading to single `-e` flag via `pi-loader.ts` for Pi 0.70.5+ stability
- Deprecated `agent-team-chain.ts` wrapper in favor of direct `agent-team.ts` usage

### Updated

- **May 2, 2026** — Converted all agent paths from hardcoded `/piwithstuff/` and `/pip/` to relative `.pi/...` paths (11 files, 16 references)
- **May 2, 2026** — Documentation updated for Pi 0.70.5+ justfile-first extension loading (README, STRUCTURE.md, all usage maps, justfile docs)
- **May 2, 2026** — Created implementation plan for missing features in `agent-team.ts` (plan mode system, list_team_agents tool, commands, system prompt updates)
- **May 2, 2026** — Recursive agent discovery across all `.pi/agents/` subdirectories, enhanced TUI tree view for `list_agents`, removed duplicate tool registrations, added `getTeamsCatalog` helper, standardized on `import * as path`
- All `ui/` extensions updated for recursive directory scanning (agent-team, agent-chain, subagent-widget, cross-agent)

### Removed

- Duplicate state declarations (module-level exports shadowing closure-scoped variables in `agent-team.ts`)
- Empty `loadAgentsInternal()` stub function
- Broken external exports (`initialize`, `setActiveTools`) referencing closure-scoped variables
- Duplicate tool registrations and redundant function definitions (`parseAgentsYaml`, etc.)
- `conversation-viewer.test.ts` — test coverage satisfied by `truncateToWidth` safety net in implementation

### Fixed

- **agent-team.ts** — Restored `loadAgents(cwd)` with full inline implementation (scanAgentDirs, parse teams.yaml, fallback roster)
- **agent-team.ts** — Removed duplicate state declarations that shadowed closure-scoped variables
- **agent-team-chain.ts** — Fixed missing `pi` module import and removed unused exports
- **tilldone.ts** — Restored session_switch handler and fixed unknown type errors
- **cross-agent.ts** — Moved to Main UI location (.pi/extensions/ui/) as intended
- **agent-team-chain.ts** — Moved to Feature UI location (.pi/extensions/src/ui/) with all original capabilities preserved

### Updated

- **STRUCTURE.md** — Updated to document that all UI things are in .pi/extensions/ui/ and feature UIs are in .pi/extensions/src/ui/; added legacy docs archive reference

---

## Legend

- **Added** — New features, files, or capabilities
- **Changed** — Modified behavior or architecture
- **Updated** — Improvements to existing features
- **Removed** — Deleted files or deprecated features
