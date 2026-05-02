# Agent YAML Configuration Files

## Overview

The `.pi/agents/` directory contains five YAML files that define the agent ecosystem. They work together in a layered architecture:

```
agents.yaml        → Agent definitions (who exists)
teams.yaml         → Team rosters (who works together)
agent-chain.yaml   → Pipeline sequences (who works when)
session-manager.yaml → Session-specific workflows
reviewer.yaml      → Standalone agent config with model + prompt
```

### Directory Structure

```
.pi/agents/
├── README.md                    # Overview and registry summary
├── agents.yaml                  # Master agent registry (31 agents)
├── teams.yaml                   # Team rosters (13 teams)
├── agent-chain.yaml             # Pipeline chains (14 chains)
├── session-manager.yaml         # Session-specific workflows
├── reviewer.yaml                # Standalone agent config with model + prompt
├── agenttemplate.md             # Template for creating new agents
├── *.md                         # Individual agent definitions (.md files)
├── agents/                      # Agent subdirectory
├── homepageteam/                # Homepage team configurations
├── pi-pi/                       # Pi-Pi meta agent configs
├── specialagents/               # Special agent definitions
└── util/                        # Agent utilities
```

---

## 1. `agents.yaml` — Master Agent Registry

### Purpose

Defines every agent in the system: name, description, and allowed tools. This is the source of truth for agent discovery. The orchestrator (`agent-team.ts`) discovers agents by scanning `.md` files in `.pi/agents/`, `.claude/agents/`, and `agents/` directories, then matches them against this registry.

### Structure

```yaml
agent-key:
  name: display-name
  description: What the agent does
  tools: read,write,edit,bash,grep,find,ls
```

### Agent Categories (31 Total)

#### Core Agents (7)

| Agent | Description | Tools |
|-------|-------------|-------|
| `scout` | Fast recon and codebase exploration | read, grep, find, ls |
| `planner` | Architecture and implementation planning | read, grep, find, ls, write |
| `developer` | Implementation and code generation | read, write, edit, bash, grep, find, ls |
| `reviewer` | Code review and quality checks | read, bash, grep, find, ls, write |
| `documenter` | Documentation and README generation | read, write, edit, grep, find, ls |
| `red-team` | Security and adversarial testing | read, bash, grep, find, ls |
| `session-manager` | Session management and coordination | read, write, grep, find, ls |

#### Specialist Agents (4)

| Agent | Description | Tools |
|-------|-------------|-------|
| `frontendcoder` | UI/UX implementation and styling | read, write, edit, bash, grep, find, ls |
| `bowser` | Headless browser automation (Playwright) | read, write, ls |
| `ext-builder` | Pi extensions expert | read, write, edit, bash, grep, find, ls |
| `plan-reviewer` | Plan critic — challenges and validates plans | read, grep, find, ls |

#### Domain Specialists (2)

| Agent | Description | Tools |
|-------|-------------|-------|
| `netlify-troubleshooter` | CI/CD and Netlify build diagnostics | read, write, edit, bash, grep, find, ls |
| `pi-dev-expert` | Pi Coding Agent ecosystem expert | read, write, edit, bash, grep, find, ls |

#### Homepage Team (8)

| Agent | Description | Tools |
|-------|-------------|-------|
| `dev-agent` | Homepage development specialist | read, write, edit, bash, grep, find, ls |
| `content-agent` | Homepage content and SEO copy | read, write, edit, bash, grep, find, ls |
| `marketing-agent` | Marketing strategy and positioning | read, write, bash, grep |
| `research-agent` | Competitor and context research | read, grep, find, ls, bash, web_search |
| `design-agent` | Visual design and UI/UX | read, write, edit, bash, grep, find, ls |
| `seo-agent` | Search engine optimization | read, write, edit, bash, grep |
| `accessibility-agent` | WCAG compliance and inclusive design | read, write, edit, bash, grep |
| `image-agent` | Image selection and optimization | read, write, edit, bash, grep |

#### Meta Experts / Pi-Pi Team (10)

| Agent | Description | Tools |
|-------|-------------|-------|
| `pi-orchestrator` | Coordinates experts, builds Pi components | read, write, edit, bash, grep, find, ls, query_experts |
| `skill-expert` | Pi skills (SKILL.md format, validation) | read, grep, find, ls, bash |
| `agent-expert` | Agent definitions and team orchestration | read, grep, find, ls, bash |
| `ext-expert` | Extensions (tools, events, rendering) | read, write, edit, bash, grep, find, ls |
| `tui-expert` | TUI components, overlays, widgets | read, grep, find, ls, bash |
| `cli-expert` | CLI arguments, flags, subcommands | read, grep, find, ls, bash |
| `config-expert` | settings.json, providers, keybindings | read, grep, find, ls, bash |
| `prompt-expert` | Prompt templates, frontmatter, args | read, grep, find, ls, bash |
| `theme-expert` | Theme JSON, 51 color tokens, hot reload | read, grep, find, ls, bash |
| `keybinding-expert` | Keyboard shortcuts, registerShortcut() | read, grep, find, ls, bash |

---

## 2. `teams.yaml` — Team Rosters

### Purpose

Defines pre-built teams as lists of agent keys from `agents.yaml`. Teams are discovered and selected by the dispatch agent in `agent-team.ts`.

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

| Team | Members | Purpose |
|------|---------|---------|
| `all-specialists` | All 31 agents | Full roster access for dispatch |

---

## 3. `agent-chain.yaml` — Pipeline Configurations

### Purpose

Defines sequential pipelines where each step uses an agent from `agents.yaml` with a specific prompt template. Pipelines are selected and run via the `run_chain` tool in `agent-chain.ts`.

### Defined Chains (14)

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

---

## 4. Agent Creation & Standards

### Frontmatter Validation

Every agent `.md` file MUST follow these strict frontmatter rules:

- **`name`**: Lowercase, hyphenated identifier (matches filename). No spaces.
- **`description`**: Human-readable summary (max 80 chars).
- **`tools`**: Comma-separated list of valid Pi tools. **No spaces after commas.**

**Valid example:**
```yaml
---
name: scout
description: Fast recon and codebase exploration
tools: read,grep,find,ls
---
```

### Required Directories

Agents depend on these project-relative paths. They must be created before dispatching agents:

| Directory | Purpose |
|-----------|---------|
| `.pi/build_logs/` | Build artifacts and review request queue (`review_requests.md`) |
| `.pi/reference/` | Backup location for massive refactors |
| `.pi/reviews/` | Audit reports and plan critiques |
| `.pi/planning/` | Implementation and architecture plans |
| `.pi/security_audits/` | Security audit findings |
| `.pi/web_output/` | Browser scraping results and screenshots |
| `.pi/agent-sessions/` | Persistent session state files |

### Operational Protocols

- **Scout First**: Verify a recent `scout` report exists before planning or implementing.
- **Atomic Execution**: Implement one feature or fix at a time.
- **Edit Over Write**: Prefer the `edit` tool for modifications; use `write` only for new files.
- **Validation**: Always `read` files after modification to verify syntax.

---

## 5. Standalone Configuration (`reviewer.yaml`)

Standalone agents like `reviewer.yaml` override the `agents.yaml` definition to include specific model selection and a detailed system prompt for direct execution.

```yaml
name: reviewer
description: Code review and quality checks
tools: read,bash,grep,find,ls,write
models:
  - nemotron-cascade-2:30b
system_prompt: |
  You are the Reviewer agent...
```

---

## Tool Reference

| Category | Tools | Recommended For |
|----------|-------|-----------------|
| **Read-only** | `read,grep,find,ls` | Scout, Researcher, Analyst |
| **Write-capable** | `read,write,edit,grep,find,ls` | Planner, Documenter |
| **Execution-capable** | `read,bash,grep,find,ls` | Reviewer, Security Auditor |
| **Full Access** | `read,write,edit,bash,grep,find,ls` | Developer, Architect |

---

## Universal Agent Template

```markdown
---
name: [agent-name]
description: [Short description of role]
tools: [read,grep,find,ls]
---
You are the [agent-name] agent. Your mission is to [goal].
You are precise, minimal, and disciplined.

## Scope
- Handle: [tasks]
- Do NOT handle: [delegations]

## Guidelines
- Read before modifying
- One change at a time
- Output [SIGNAL_COMPLETE] on success
```
