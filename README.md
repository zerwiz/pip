# PIP - Pi Agent Platform

A modular agent-based system for automating complex tasks with specialized AI agents, skills, and extensions built on the Pi Coding Agent ecosystem.

## Quick Start

```bash
# Clone repository
git clone https://github.com/zerwiz/pip.git
cd pip

# List available just targets
just

# Run with a specific extension stack
just ext-minimal           # Minimal mode with theme cycler
just ext-full-stack        # Agent team + damage control + themes
just ext-agent-team        # Dispatcher with team select
just ext-agent-chain       # Sequential pipeline orchestrator
```

## Table of Contents

- [Architecture](#architecture)
- [Agents](#agents)
- [Extensions](#extensions)
- [Justfile Startup System](#justfile-startup-system)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  justfile (Entry)                    │
│  Sets PI_STACK env var → loads pi-loader.ts          │
├─────────────────────────────────────────────────────┤
│              .pi/extensions/ui/ (Entry Points)       │
│  agent-team, agent-chain, cross-agent, pi-pi,       │
│  subagent-widget, tilldone                          │
├─────────────────────────────────────────────────────┤
│             .pi/extensions/util/ (Middle Layer)      │
│  memory, memory-export, damage-control, pi-loader,  │
│  agent-switch, memory-tools                         │
├─────────────────────────────────────────────────────┤
│            .pi/extensions/src/ui/ (Base Layer)       │
│  themeMap, theme-cycler, pure-focus, minimal,       │
│  tool-counter, conversation-viewer, command-history │
├─────────────────────────────────────────────────────┤
│                 .pi/agents/ (Agent System)           │
│  agents.yaml, teams.yaml, agent-chain.yaml, 30+     │
│  agent definitions (.md files)                      │
└─────────────────────────────────────────────────────┘
```

## Agents

The system includes **30 specialized agents** organized into teams and chains.

### Key Agent Categories

| Category | Agents | Purpose |
|----------|--------|---------|
| Core | scout, planner, developer, reviewer, documenter, red-team, session-manager | General development lifecycle |
| Specialists | frontendcoder, bowser, ext-builder, plan-reviewer | Domain-specific tasks |
| Domain | netlify-troubleshooter, pi-dev-expert | Platform-specific expertise |
| Homepage Team | dev-agent, content-agent, design-agent, marketing-agent, research-agent, seo-agent, accessibility-agent, image-agent | Website development |
| Meta Experts | pi-orchestrator, skill-expert, agent-expert, ext-expert, tui-expert, cli-expert, config-expert, prompt-expert, theme-expert, keybinding-expert | Pi system configuration |

### Team & Chain System

- **`agents.yaml`** — Master registry defining all agents (name, description, tools)
- **`teams.yaml`** — Pre-built team rosters (13 teams)
- **`agent-chain.yaml`** — Sequential pipeline configurations (14 chains)
- **`session-manager.yaml`** — Session-specific workflows
- **`reviewer.yaml`** — Standalone agent with model + system prompt

See [`.pi/agents/README.md`](.pi/agents/README.md) for full agent documentation.

## Extensions

Extensions are loaded via the justfile's dynamic loader system. **Pi 0.70.5+ made stacking multiple `-e` flags unstable** due to stricter ESM resolution and sandboxing. The justfile solves this by using a single `pi -e` flag pointing to `pi-loader.ts`, which orchestrates all extension initialization.

```bash
# ✅ Correct — via justfile
just ext-full-stack

# ❌ Unstable in 0.70.5 — multiple -e flags
pi -e ext1.ts -e ext2.ts -e ext3.ts
```

### Extension Directories

| Directory | Files | Role |
|-----------|-------|------|
| `src/ui/` | 11 | Shared UI components, themes, utilities |
| `util/` | 12 | Utility functions, memory management, loaders |
| `ui/` | 6 | Primary entry-point extensions |

### Key Extensions

| Extension | Directory | Purpose |
|-----------|-----------|---------|
| `agent-team.ts` | `ui/` | Agent team management, memory export, team switching |
| `agent-chain.ts` | `ui/` | Sequential pipeline orchestrator |
| `cross-agent.ts` | `ui/` | Cross-agent command/skill discovery |
| `pi-pi.ts` | `ui/` | Meta-agent with parallel research experts |
| `subagent-widget.ts` | `ui/` | Background subagents with live widgets |
| `tilldone.ts` | `ui/` | Task discipline system |
| `themeMap.ts` | `src/ui/` | Theme definitions (shared dependency) |
| `memory-export.ts` | `util/` | Memory export in JSON, text, markdown |
| `damage-control.ts` | `util/` | Error recovery and safety auditing |
| `pi-loader.ts` | `util/` | Dynamic extension loader (orchestrator) |

See [`.pi/extensions/README.md`](.pi/extensions/README.md) for full extension documentation.

## Justfile Startup System

All extensions are started through the justfile using a single-entry dynamic loader pattern. **This is required for Pi 0.70.5+** because stacking multiple `-e` flags is unstable.

```bash
just run-pi "agent-team,damage-control,theme-cycler"
```

This sets `PI_STACK="agent-team,damage-control,theme-cycler"` and runs:
```bash
pi -e .pi/extensions/util/pi-loader.ts
```

The loader then:
1. Categorizes extensions by priority (utility → function → ui-core → ui-widget)
2. Resolves UI core conflicts (only one footer-controlling UI allowed)
3. Searches multiple directories to find each extension file
4. Loads and initializes each extension in order

### Common Targets

| Target | Stack | Purpose |
|--------|-------|---------|
| `ext-minimal` | minimal,theme-cycler | Minimal mode |
| `ext-pure-focus` | pure-focus | Stripped-down UI |
| `ext-agent-team` | agent-team,theme-cycler | Full agent team |
| `ext-full-stack` | agent-team,damage-control,theme-cycler | Production stack |
| `ext-agent-chain` | agent-chain,theme-cycler | Pipeline mode |
| `ext-subagent-widget` | subagent-widget,pure-focus,theme-cycler | Background tasks |
| `ext-tilldone` | tilldone,theme-cycler | Task management |
| `stack <list>` | custom | Arbitrary combination |

See [`.pi/docs/JUSTFILE-STARTUP-MECHANISM.md`](.pi/docs/JUSTFILE-STARTUP-MECHANISM.md) for the complete startup documentation.

## Project Structure

```
pip/
├── justfile                         # Build automation & extension launcher
├── package.json                     # NPM dependencies
├── README.md                        # This file
├── .pi/
│   ├── agents/                      # Agent system
│   │   ├── agents.yaml              # Master agent registry (30 agents)
│   │   ├── teams.yaml               # Team rosters (13 teams)
│   │   ├── agent-chain.yaml         # Pipeline chains (14 chains)
│   │   ├── session-manager.yaml     # Session workflows
│   │   ├── reviewer.yaml            # Standalone agent config
│   │   ├── *.md                     # Individual agent definitions
│   │   ├── agents/                  # Agent subdirectory
│   │   ├── homepageteam/            # Homepage team configs
│   │   ├── pi-pi/                   # Pi-Pi meta agent configs
│   │   ├── special agents/          # Special agent definitions
│   │   └── util/                    # Agent utilities
│   ├── build_logs/                  # Developer artifacts, review queue
│   ├── planning/                    # Planner agent output
│   ├── reviews/                     # Reviewer audit reports
│   ├── reference/                   # Backup for massive refactors
│   ├── referencefiles/              # Alternative backup path
│   ├── security_audits/             # Red-team findings
│   ├── web_output/                  # Browser automation artifacts
│   ├── extensions/                  # Extension system
│   │   ├── src/ui/                  # UI components (11 files)
│   │   ├── util/                    # Utilities (12 files)
│   │   └── ui/                      # Entry points (6 files)
│   ├── docs/                        # Project documentation
│   │   ├── UI-EXTENSIONS-USAGE.md   # src/ui/ usage map
│   │   ├── UTIL-EXTENSIONS-USAGE.md # util/ usage map
│   │   ├── MAIN-UI-EXTENSIONS-USAGE.md # ui/ usage map
│   │   ├── COMBINED-EXTENSIONS-USAGE.md # Combined overview
│   │   ├── JUSTFILE-STARTUP-MECHANISM.md # Justfile startup docs
│   │   └── AGENT-YAML-CONFIGURATION.md  # YAML config docs
│   ├── themes/                      # Theme configurations
│   ├── plans/                       # Migration and strategy docs
│   ├── src/ui/                      # TypeScript UI components
│   └── .context/                    # Runtime context metadata
└── ref/                             # Reference codebases
```

## Documentation

### Usage Maps

| Document | Coverage |
|----------|----------|
| [UI Extensions Usage](.pi/docs/UI-EXTENSIONS-USAGE.md) | `src/ui/` (11 files) |
| [Util Extensions Usage](.pi/docs/UTIL-EXTENSIONS-USAGE.md) | `util/` (12 files) |
| [Main UI Extensions Usage](.pi/docs/MAIN-UI-EXTENSIONS-USAGE.md) | `ui/` (6 files) |
| [Combined Extensions Usage](.pi/docs/COMBINED-EXTENSIONS-USAGE.md) | All three directories |
| [Justfile Startup Mechanism](.pi/docs/JUSTFILE-STARTUP-MECHANISM.md) | How extensions are launched |
| [Agent YAML Configuration](.pi/docs/AGENT-YAML-CONFIGURATION.md) | Agent YAML files explained |

### Key Docs

- [`.pi/agents/README.md`](.pi/agents/README.md) — Agent system documentation
- [`.pi/extensions/README.md`](.pi/extensions/README.md) — Extension system documentation
- [`.pi/docs/MIGRATION-GUIDE.md`](.pi/docs/MIGRATION-GUIDE.md) — Migration from reference codebase
- [`.pi/docs/STRUCTURE.md`](.pi/docs/STRUCTURE.md) — Full project structure

## Development

### Prerequisites

- Node.js 18+
- Just (build tool)
- Git

### Justfile Commands

```bash
just                    # List all available targets
just pi                 # Run plain pi
just ext-minimal        # Run with minimal extensions
just ext-full-stack     # Run full production stack
just stack "a,b,c"      # Run custom extension stack
just build-agent-team-chain  # Build agent-team-chain
just test-agent-team-chain   # Test agent-team-chain
just verify-agent-team-chain # Verify agent-team-chain
```

### Adding Extensions

1. Place your `.ts` file in the appropriate directory (`ui/`, `util/`, or `src/ui/`)
2. Export a default async function that receives the `ExtensionAPI`
3. Add a justfile target using `just run-pi "your-extension"`
4. Register in `manifest.ts` if using categorized loading

### Adding Agents

1. Create a `.md` file in `.pi/agents/`
2. Include YAML frontmatter with `specialist_id`, `name`, `description`, and `tools`
3. Register in `agents.yaml`
4. Add to a team in `teams.yaml` if applicable

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Code Style

- Follow existing code patterns
- Write clear documentation
- Update relevant usage maps when adding extensions

## License

MIT License

---

**Repository**: https://github.com/zerwiz/pip
**Status**: Active Development
