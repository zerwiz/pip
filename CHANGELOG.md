# Changelog

All notable changes to PIP (Pi Agent Platform).

## [Unreleased]

### Added

- **Templates directory** — `.pi/templates/` with subdirectories for extensions, agents, skills, prompt-templates, and themes
- **Extension templates** — `basic-tool.ts`, `event-handler.ts`, `custom-command.ts`, `ui-widget.ts`, `plan-mode.ts` in `.pi/templates/extensions/`
- **Agent templates** — `generic-agent.md`, `coding-agent.md`, `research-agent.md`, `agent-with-memory.md` in `.pi/templates/agents/`
- **Skill templates** — `web-search/SKILL.md`, `code-review/SKILL.md`, `doc-generator/SKILL.md` in `.pi/templates/skills/`
- **Prompt templates** — `review.md`, `component.md`, `explain.md` in `.pi/templates/prompt-templates/`
- **Theme templates** — `dark-theme.json`, `light-theme.json`, `nord-theme.json` in `.pi/templates/themes/`
- **Documentation links file** — `.pi/docs/pi-documentation-links.md` with ALL Pi documentation URLs and template locations
- **Required agent directories** — `.pi/build_logs/`, `.pi/reference/`, `.pi/referencefiles/`, `.pi/reviews/`, `.pi/planning/`, `.pi/security_audits/`, `.pi/web_output/` for developer/reviewer workflow
- **Review request queue** — `.pi/build_logs/review_requests.md` for developer→reviewer handoff
- **Real hand-off dispatch sequence** — Developer agent now has mandatory 5-step protocol:
  1. Execute & Validate code changes
  2. Log to review queue using bash echo to `.pi/build_logs/review_requests.md`
  3. Dispatch reviewer via `dispatch_agent` tool
  4. Await `[REVIEW_COMPLETE]` confirmation
  5. Complete task only after reviewer confirms
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
  - Base layer (`extensions/src/ui/`) — 10 shared UI components (themeMap, themecycler, pure-focus, minimal, etc.)
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
- **Skill subsystem migration** — All 49 skills ported from `ref/skills/` to `.pi/skills/` with full subsystem components
- **Missing skills created** — `image-edit`, `llm`, `qingyan-research`, `skill-vetter`
- **skill.json files** — Generated for all 49 skills with valid script references
- **Agent-skill alignment** — All 46 special agents mapped to correct skills in `agents.yaml` and agent `.md` files
- **Test script** — `.pi/scripts/test-skill.sh` for validating skill integrity
- **Skills README** — `.pi/skills/README.md` with full inventory and status tracking
- **Migration plan** — `.pi/plans/refmigration/SKILL-AGENT-ALIGNMENT-PLAN.md` with phased approach and progress tracking

### Changed

- **Pi 0.70.5+ breaking change** — Multiple `-e` flags (`pi -e ext1.ts -e ext2.ts`) are unstable; all extensions now loaded via justfile with single `-e` flag to `pi-loader.ts`
- **Removed all hardcoded paths from agent definitions** — 16 references across 11 agent files converted from `/pipwithstuff/` and `~/pip/` to relative `.pi/...` paths
- **Documentation sweep** — All 8 README/docs updated to reflect justfile-first loading pattern, removed outdated `pi -e` multi-flag examples
- **Extension checklist** — Moved from `.pi/docs/CHECKLIST.md` to `.pi/extensions/CHECKLIST.md`, updated for Pi 0.70.5+ loading procedures
- **STRUCTURE.md** — Added reference to `.pi/docs/olddocs/` legacy archive directory
- **Standardized import architecture** across all extensions with correct relative paths to `themeMap.ts`, `memory-export.ts`, and `memory.ts`
- **Migrated from z.ai skills to Pi-native extension patterns**
- **Moved extensions from flat structure to three-layer hierarchy (`ui/`, `util/`, `src/ui/`)**
- **Consolidated extension loading to single `-e` flag via `pi-loader.ts` for Pi 0.70.5+ stability**
- **Deprecated `agent-team-chain.ts` wrapper in favor of direct `agent-team.ts` usage**
- **Sanitization complete** — Removed Chinese characters from all Python/TypeScript files in `.pi/skills/`
- **Open-source migration** — Replaced all `zai`/`ZAI` references with open-source alternatives (Ollama, Whisper, Coqui TTS)
- **File integrity fix** — Re-ported 42 corrupted Python/TypeScript files from `ref/skills/` to `.pi/skills/`
- **Directory standardization** — Moved `xlsx.py` to `scripts/` for `spreadsheet-processing`, moved `src/` to `scripts/` for `stock-analysis`

### Updated

- **May 2, 2026** — Replaced `firecrawl` with `pi-web-access` tools (`web_search`, `fetch_content`) in 11 agent files
- **May 2, 2026** — Added `web_search,fetch_content` to tools list in all agent definitions for web access capability
- **May 2, 2026** — Updated all 11 agent files to be aware of `.pi/templates/` and to check `.pi/docs/pi-documentation-links.md` for updates
- **May 2, 2026** — Created `.pi/docs/pi-documentation-links.md` with ALL Pi documentation URLs and template locations
- **May 2, 2026** — Converted all agent paths from hardcoded `/pipwithstuff/` and `~/pip/` to relative `.pi/...` paths (11 files, 16 references)
- **May 2, 2026** — Documentation updated for Pi 0.70.5+ justfile-first extension loading (README, STRUCTURE.md, all usage maps, justfile docs)
- **May 2, 2026** — Created implementation plan for missing features in `agent-team.ts` (plan mode system, list_team_agents tool, commands, system prompt updates)
- **May 2, 2026** — Recursive agent discovery across all `.pi/agents/` subdirectories, enhanced TUI tree view for `list_agents`, removed duplicate tool registrations, added `getTeamsCatalog` helper, standardized on `import * as path`
- **May 4, 2026** — Updated `SKILL-AGENT-ALIGNMENT-PLAN.md` with completed phases and progress tracking (v1.4.0)
- **May 4, 2026** — Fixed `skill.json` script references across 49 skills to point to actual existing files
- **May 4, 2026** — Updated agent definitions in `.pi/agents/specialagents/` with correct skill mappings
- **May 4, 2026** — Updated `.pi/agents/agents.yaml` with skill fields for all 46 special agents

### Removed

- Duplicate state declarations (module-level exports shadowing closure-scoped variables in `agent-team.ts`)
- Empty `loadAgentsInternal()` stub function
- Broken external exports (`initialize`, `setActiveTools`) referencing closure-scoped variables
- Duplicate tool registrations and redundant function definitions (`parseAgentsYaml`, etc.)
- `conversation-viewer.test.ts` — test coverage satisfied by `truncateToWidth` safety net in implementation
- **ref/ directory** — Added to `.gitignore` (reference files no longer tracked)

### Fixed

- **May 2, 2026 (Stability & Transparency Update)** — Fixed critical errors and added observability features for Pi 0.72.1:
  - **agent-team.ts**: Added full transparency to `dispatch_agent` and `enter_plan_mode`. The UI now notifies the user of all outgoing tasks and incoming sub-agent responses in real-time.
  - **agent-team.ts**: Implemented dynamic `/thinking` command to change agent reasoning depth (off, low, medium, high) without restarting.
  - **agent-team.ts**: Set thinking level to **high** as the default standard for all sessions.
  - **agent-team.ts**: Fixed runtime error by correctly using `pi.setThinkingLevel` instead of invalid `ctx.setThinking`.
  - **agent-team.ts**: Fixed TAB-induced parse error, missing `path` import, and added `pi.` prefix to `setActiveTools`. Updated frontmatter regex for robust cross-platform parsing.
  - **agent-team-chain.ts**: Complete refactor from broken wrapper to standard extension; fixed invalid `pi` module imports.
  - **UI Core Components**: Fixed `DynamicBorder` imports in `subagent-widget.ts`, `tilldone.ts`, and `pi-pi.ts` (moved from `pi-tui` to `pi-coding-agent`).
  - **pi-pi.ts**: Fixed syntax error in `truncate` helper and missing `pad` variable in expert card rendering.
  - **tilldone.ts**: Removed invalid `@mariozechner/pi-ai` dependency; migrated to standard Typebox types.
  - **memory-tools.ts**: Fixed broken imports of non-existent functions from `memory-export.ts`.
- **agent-team.ts** — Restored `loadAgents(cwd)` with full inline implementation (scanAgentDirs, parse teams.yaml, fallback roster)
- **agent-team.ts** — Removed duplicate state declarations that shadowed closure-scoped variables
- **agent-team-chain.ts** — Fixed missing `pi` module import and removed unused exports
- **tilldone.ts** — Restored session_switch handler and fixed unknown type errors
- **cross-agent.ts** — Moved to Main UI location (.pi/extensions/ui/) as intended
- **agent-team-chain.ts** — Moved to Feature UI location (.pi/extensions/src/ui/) with all original capabilities preserved
- **settings.json** — Fixed missing model property value (was empty, set to default model)
- **agent-chain.ts** — Fixed memory import path (changed `./memory.ts` to `../util/memory.js`)
- **agent-chain.ts** — Fixed tool result types to include required `details` property
- **agent-chain.ts** — Fixed null handling for context usage percentage in footer rendering
- **Corrupted Python/TS files** — Re-ported 42 files from `ref/skills/` to `.pi/skills/` (May 4, 2026)
- **skill.json references** — Fixed all script references to point to existing files (May 4, 2026)
- **Directory structure** — Standardized `src/` → `scripts/` for `stock-analysis` and `xlsx.py` location for `spreadsheet-processing`

### Updated

- **STRUCTURE.md** — Updated to document that all UI things are in .pi/extensions/ui/ and feature UIs are in .pi/extensions/src/ui/; added legacy docs archive reference

---

## Legend


- **Added** — New features, files, or capabilities
- **Changed** — Modified behavior or architecture
- **Updated** — Improvements to existing features
- **Removed** — Deleted files or deprecated features
