# Pi Agents Directory

This directory contains agent definitions, team configurations, and pipeline chains for the Pi Coding Agent ecosystem.

## File Structure

```
.pi/agents/
├── README.md                    # This file
├── agents.yaml                  # Master agent registry (24 agents)
├── teams.yaml                   # Team rosters (8 teams)
├── agent-chain.yaml             # Pipeline chains (12 chains)
├── agents/                      # Core agent definitions (10 agents)
├── pi-pi/                       # Pi-Pi meta expert definitions (10 agents)
├── specialagents/               # Special agent definitions (4 agents)
└── util/                        # Agent utilities
```

## YAML Configuration Files

| File | Purpose | Entries |
|------|---------|---------|
| [`agents.yaml`](agents.yaml) | Master agent registry — defines all active agents | 24 agents |
| [`teams.yaml`](teams.yaml) | Pre-built team rosters — groups agents by use case | 8 teams |
| [`agent-chain.yaml`](agent-chain.yaml) | Sequential pipeline configs — multi-step workflows | 12 chains |

## Agent Registry (`agents.yaml`)

### Core Agents (.pi/agents/agents/)

| Agent | Description | Tools |
|-------|-------------|-------|
| `scout` | Fast recon and codebase exploration | read, grep, find, ls |
| `planner` | Architecture and implementation planning | read, grep, find, ls, write |
| `developer` | Implementation and code generation | read, write, edit, bash, grep, find, ls |
| `reviewer` | Code review and quality checks | read, bash, grep, find, ls, write |
| `documenter` | Documentation and README generation | read, write, edit, grep, find, ls |
| `red-team` | Security and adversarial testing | read, bash, grep, find, ls |
| `frontend-coder` | UI/UX implementation and styling | read, write, edit, bash, grep, find, ls |
| `bowser` | Headless browser automation (Playwright) | read, write, ls |
| `indexer` | Scans directory and writes INDEX.md | read, write, edit, grep, find, ls, bash |
| `plan-reviewer` | Plan critic — challenges and validates plans | read, grep, find, ls |

### Special Agents (.pi/agents/specialagents/)

| Agent | Description | Tools |
|-------|-------------|-------|
| `netlify-troubleshooter` | CI/CD and Netlify build diagnostics | read, write, edit, bash, grep, find, ls |
| `pi-dev-expert` | Pi Coding Agent ecosystem expert | read, write, edit, bash, grep, find, ls |
| `ralph` | Queue worker for file-based HTML tasks | read, write, edit, bash, grep, find, ls |
| `session-manager` | Session management and coordination | read, write, grep, find, ls |

### Meta Experts / Pi-Pi Team (.pi/agents/pi-pi/)

| Agent | Description |
|-------|-------------|
| `pi-orchestrator` | Coordinates experts, builds Pi components |
| `skill-expert` | Pi skills expert |
| `agent-expert` | Agent definitions expert |
| `ext-builder` | Pi extensions expert |
| `tui-expert` | Pi TUI expert |
| `cli-expert` | Pi CLI expert |
| `config-expert` | Pi configuration expert |
| `prompt-expert` | Pi prompt templates expert |
| `theme-expert` | Pi themes expert |
| `keybinding-expert` | Pi keyboard shortcut expert |

## Teams (`teams.yaml`)

| Team | Members | Purpose |
|------|---------|---------|
| `full-dev-team` | scout, planner, developer, reviewer, documenter | Complete implementation pipeline |
| `planning-review-team` | scout, planner, plan-reviewer, reviewer | Architecture and validation |
| `security-research-team` | scout, developer, netlify-troubleshooter, ext-builder, pi-dev-expert, red-team | Exploration and analysis |
| `browser-automation-team` | bowser, developer, documenter | Web scraping and testing |
| `session-team` | session-manager, developer, documenter | Session lifecycle operations |
| `architecture-team` | planner, plan-reviewer, reviewer, ext-builder, pi-dev-expert | Design and code quality |
| `pi-pi-meta-team` | pi-orchestrator, skill-expert, agent-expert, ext-builder, tui-expert, cli-expert, config-expert, prompt-expert, theme-expert, keybinding-expert | Building and configuring Pi itself |
| `all-agents` | All 24 agents | Full roster access |

## How Agent Discovery Works

The `agent-team.ts` orchestrator discovers agents through multiple sources:

1. **`.md` Files**: Scans `*.md` files in agent directories
2. **`agents.yaml`**: Reads the YAML registry listing all agents
3. **`teams.yaml`**: Defines team configurations using agent names

---

**Version**: 1.1.0 | **Author**: @zerwiz | **License**: MIT
