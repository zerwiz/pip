# Pi Agents Directory

This directory contains agent definitions, team configurations, and pipeline chains for the Pi Coding Agent ecosystem.

## File Structure

```
.pi/agents/
├── README.md                    # This file
├── agents.yaml                  # Master agent registry (30 agents)
├── teams.yaml                   # Team rosters (13 teams)
├── agent-chain.yaml             # Pipeline chains (14 chains)
├── session-manager.yaml         # Session-specific workflows
├── reviewer.yaml                # Standalone agent config with model + prompt
├── agenttemplate.md             # Template for creating new agents
├── *.md                         # Individual agent definitions (.md files)
├── agents/                      # Agent subdirectory
├── homepageteam/                # Homepage team configurations
├── pi-pi/                       # Pi-Pi meta agent configs
├── special agents/              # Special agent definitions
└── util/                        # Agent utilities
```

## YAML Configuration Files

| File | Purpose | Entries |
|------|---------|---------|
| [`agents.yaml`](agents.yaml) | Master agent registry — defines all agents (name, description, tools) | 30 agents |
| [`teams.yaml`](teams.yaml) | Pre-built team rosters — groups agents by use case | 13 teams |
| [`agent-chain.yaml`](agent-chain.yaml) | Sequential pipeline configs — multi-step workflows | 14 chains |
| [`session-manager.yaml`](session-manager.yaml) | Session-specific workflows | 2 workflows |
| [`reviewer.yaml`](reviewer.yaml) | Standalone agent with model and system prompt | 1 agent |

See [`.pi/docs/AGENT-YAML-CONFIGURATION.md`](../docs/AGENT-YAML-CONFIGURATION.md) for detailed YAML documentation.

## Agent Registry (`agents.yaml`)

### Core Agents (7)

| Agent | Description | Tools |
|-------|-------------|-------|
| `scout` | Fast recon and codebase exploration | read, grep, find, ls |
| `planner` | Architecture and implementation planning | read, grep, find, ls, write |
| `developer` | Implementation and code generation | read, write, edit, bash, grep, find, ls |
| `reviewer` | Code review and quality checks | read, bash, grep, find, ls, write |
| `documenter` | Documentation and README generation | read, write, edit, grep, find, ls |
| `red-team` | Security and adversarial testing | read, bash, grep, find, ls |
| `session-manager` | Session management and coordination | read, write, grep, find, ls |

### Specialist Agents (4)

| Agent | Description | Tools |
|-------|-------------|-------|
| `frontendcoder` | UI/UX implementation and styling | read, write, edit, bash, grep, find, ls |
| `bowser` | Headless browser automation (Playwright) | read, write, ls |
| `ext-builder` | Pi extensions expert | read, write, edit, bash, grep, find, ls |
| `plan-reviewer` | Plan critic — challenges and validates plans | read, grep, find, ls |

### Domain Specialists (2)

| Agent | Description | Tools |
|-------|-------------|-------|
| `netlify-troubleshooter` | CI/CD and Netlify build diagnostics | read, write, edit, bash, grep, find, ls |
| `pi-dev-expert` | Pi Coding Agent ecosystem expert | read, write, edit, bash, grep, find, ls |

### Homepage Team (8)

| Agent | Description |
|-------|-------------|
| `dev-agent` | Homepage development specialist |
| `content-agent` | Homepage content and SEO copy |
| `marketing-agent` | Marketing strategy and positioning |
| `research-agent` | Competitor and context research |
| `design-agent` | Visual design and UI/UX |
| `seo-agent` | Search engine optimization |
| `accessibility-agent` | WCAG compliance and inclusive design |
| `image-agent` | Image selection and optimization |

### Meta Experts / Pi-Pi Team (9)

| Agent | Description |
|-------|-------------|
| `pi-orchestrator` | Coordinates experts, builds Pi components |
| `skill-expert` | Pi skills (SKILL.md format, validation) |
| `agent-expert` | Agent definitions and team orchestration |
| `ext-expert` | Extensions (tools, events, rendering) |
| `tui-expert` | TUI components, overlays, widgets |
| `cli-expert` | CLI arguments, flags, subcommands |
| `config-expert` | settings.json, providers, keybindings |
| `prompt-expert` | Prompt templates, frontmatter, args |
| `theme-expert` | Theme JSON, 51 color tokens, hot reload |
| `keybinding-expert` | Keyboard shortcuts, registerShortcut() |

## Teams (`teams.yaml`)

### Project Teams (10)

| Team | Members | Purpose |
|------|---------|---------|
| `full-dev-team` | scout, planner, developer, reviewer, documenter | Complete implementation pipeline |
| `planning-review-team` | scout, planner, plan-reviewer, reviewer | Architecture and validation |
| `security-research-team` | scout, developer, netlify-troubleshooter, ext-builder, pi-dev-expert | Exploration and analysis |
| `browser-automation-team` | bowser, developer, documenter | Web scraping and testing |
| `session-team` | session-manager, developer, documenter | Session lifecycle operations |
| `build-deploy-team` | developer, netlify-troubleshooter, planner, reviewer | CI/CD and deployment |
| `architecture-team` | planner, plan-reviewer, reviewer, ext-builder, pi-dev-expert | Design and code quality |
| `extensions-team` | ext-builder, developer, documenter, pi-dev-expert | Pi extensions development |
| `fast-exec-team` | planner, developer, scout | Quick plan and implement cycles |
| `maintenance-team` | documenter, session-manager, developer, reviewer | Cleanup and documentation |

### Domain Teams (2)

| Team | Members | Purpose |
|------|---------|---------|
| `homepage-team` | dev-agent, content-agent, design-agent, marketing-agent, research-agent, seo-agent, accessibility-agent, image-agent | Homepage development and optimization |
| `pi-pi-meta-team` | pi-orchestrator, skill-expert, agent-expert, ext-expert, tui-expert, cli-expert, config-expert, prompt-expert, theme-expert, keybinding-expert | Building and configuring Pi itself |

### Global Access (1)

| Team | Members |
|------|---------|
| `all-specialists` | All 30 agents |

## Pipeline Chains (`agent-chain.yaml`)

Chains define sequential workflows where each step uses an agent with a specific prompt. Variables `$INPUT` (previous step output) and `$ORIGINAL` (user's original request) are available.

| Chain | Steps | Purpose |
|-------|-------|---------|
| `plan-build-review` | planner → developer → reviewer | Standard development cycle |
| `plan-build` | planner → developer | Fast two-step without review |
| `scout-flow` | scout → scout → scout | Triple-scout deep recon |
| `plan-review-plan` | planner → plan-reviewer → planner | Iterative planning with critique |
| `full-review` | scout → planner → developer → reviewer | End-to-end pipeline |
| `browser-flow` | scout → developer → bowser → documenter | Browser automation workflow |
| `session-workflow` | session-manager → developer → documenter | Session management workflow |
| `security-research-flow` | scout → ext-builder → pi-dev-expert → developer → reviewer | Security research |
| `deploy-workflow` | scout → netlify-troubleshooter → developer → documenter | CI/CD deployment |
| `extensions-workflow` | pi-dev-expert → ext-builder → developer → documenter → reviewer | Extension development |
| `fast-exec-team` | planner → developer | Quick cycles |
| `docs-workflow` | scout → documenter → developer | Documentation workflow |
| `architecture-review` | planner → plan-reviewer → pi-dev-expert → reviewer | Architecture review |

## How Agent Discovery Works

The `agent-team.ts` orchestrator discovers agents through multiple sources:

1. **`.md` Files**: Scans `*.md` files in agent directories
2. **`agents.yaml`**: Reads the YAML registry listing all agents
3. **`teams.yaml`**: Defines team configurations using agent names

## Adding New Agents

1. Create a `.md` file in this directory
2. Include YAML frontmatter with `name`, `description`, and `tools`
3. Register the agent in `agents.yaml`:
   ```yaml
   my-new-agent:
     name: my-new-agent
     description: My custom agent for specific tasks
     tools: read,write,edit,bash
   ```
4. Add to a team in `teams.yaml` if applicable:
   ```yaml
   my-team:
     - my-new-agent
     - developer
   ```

## Agent Template

Use [`agenttemplate.md`](agenttemplate.md) as a starting point for new agent definitions.

## Best Practices

1. **Use consistent names** — agent keys in YAML must match `.md` filenames
2. **Start with Scout** — let the scout agent explore before planning
3. **Review everything** — always include the reviewer agent for code quality
4. **Document changes** — use the documenter agent to update docs
5. **Respect agent roles** — don't use developer for planning; use planner instead
6. **Minimize tools** — only grant tools an agent actually needs

## Related Documentation

- [Agent YAML Configuration](../docs/AGENT-YAML-CONFIGURATION.md) — Detailed YAML file documentation
- [Pi Extensions Docs](../extensions/README.md) — Extension system documentation
- [Combined Extensions Usage](../docs/COMBINED-EXTENSIONS-USAGE.md) — Full system overview

---

**Version**: 1.0.0 | **Author**: @zerwiz | **License**: MIT
