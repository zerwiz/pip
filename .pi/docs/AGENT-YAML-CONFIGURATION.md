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

---

## 1. `agents.yaml` — Master Agent Registry

### Purpose

Defines every agent in the system: name, description, and allowed tools. This is the source of truth for agent discovery.

### Structure

```yaml
agent-key:
  name: display-name
  description: What the agent does
  tools: read,write,edit,bash,grep,find,ls
```

### Agent Categories

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
| `research-agent` | Competitor and context research | read, grep, find, ls, bash, web-search |
| `design-agent` | Visual design and UI/UX | read, write, edit, bash, grep, find, ls |
| `seo-agent` | Search engine optimization | read, write, edit, bash, grep |
| `accessibility-agent` | WCAG compliance and inclusive design | read, write, edit, bash, grep |
| `image-agent` | Image selection and optimization | read, write, edit, bash, grep |

#### Meta Experts / Pi-Pi Team (9)

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

### Total

**30 agents** across 5 categories.

---

## 2. `teams.yaml` — Team Rosters

### Purpose

Defines pre-built teams as lists of agent keys from `agents.yaml`. Teams are discovered and selected by the dispatch agent in `agent-team.ts`.

### Structure

```yaml
team-name:
  - agent-key-1
  - agent-key-2
  - agent-key-3
```

### Project Teams (9)

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
| `all-specialists` | All 30 agents | Full roster access for dispatch |

---

## 3. `agent-chain.yaml` — Pipeline Configurations

### Purpose

Defines sequential pipelines where each step uses an agent from `agents.yaml` with a specific prompt template. Pipelines are selected and run via the `run_chain` tool in `agent-chain.ts`.

### Structure

```yaml
chain-name:
  description: What the pipeline does
  steps:
    - agent: agent-key
      prompt: Template using $INPUT and $ORIGINAL variables
```

### Prompt Variables

| Variable | Meaning |
|----------|---------|
| `$INPUT` | Output from the previous step (or user input for first step) |
| `$ORIGINAL` | The original user request (available in all steps) |

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

### Agent Usage Frequency in Chains

| Agent | Chain Count |
|-------|-------------|
| `scout` | 7 |
| `developer` | 10 |
| `planner` | 6 |
| `reviewer` | 5 |
| `documenter` | 5 |
| `plan-reviewer` | 2 |
| `ext-builder` | 2 |
| `pi-dev-expert` | 2 |
| `bowser` | 1 |
| `session-manager` | 1 |
| `netlify-troubleshooter` | 1 |

---

## 4. `session-manager.yaml` — Session Workflows

### Purpose

Defines session-specific workflows for the session-manager agent to query, list, and analyze chat sessions.

### Structure

```yaml
workflow-name:
  description: What the workflow does
  steps:
    - agent: session-manager
      prompt: Session-specific template
```

### Defined Workflows (2)

| Workflow | Steps | Purpose |
|----------|-------|---------|
| `session-management-flow` | session-manager | List all sessions with metadata |
| `session-analysis-flow` | session-manager | Deep-dive analysis of a specific session (uses `$SESSION_ID`) |

### Unique Variables

| Variable | Meaning |
|----------|---------|
| `$SESSION_ID` | Identifier for a specific session |
| `$INPUT` | User request or prior output |

---

## 5. `reviewer.yaml` — Standalone Agent Config

### Purpose

A self-contained agent definition with model selection and a system prompt. Unlike entries in `agents.yaml`, this file includes execution details.

### Structure

```yaml
name: reviewer
description: Code review and quality checks
tools: read,bash,grep,find,ls
models:
  - nemotron-cascade-2:30b
system_prompt: |
  You are a code reviewer agent...
```

### Key Fields

| Field | Value | Purpose |
|-------|-------|---------|
| `name` | `reviewer` | Agent identifier |
| `description` | Code review and quality checks | Human-readable summary |
| `tools` | read, bash, grep, find, ls | Allowed tool set |
| `models` | nemotron-cascade-2:30b | LLM model to use |
| `system_prompt` | Full instructions | Agent behavior definition |

### System Prompt Directives

- Review code for bugs, security issues, style problems, and improvements
- Run tests if available
- Be concise and use bullet points
- **Do NOT modify files**

---

## Cross-File Relationships

### Dependency Flow

```
agents.yaml (defines all agents)
    ↓
teams.yaml (groups agents into teams)
    ↓
agent-chain.yaml (sequences agents into pipelines)
    ↓
session-manager.yaml (session-specific agent workflows)

reviewer.yaml (standalone — overrides agents.yaml definition with model + prompt)
```

### Reference Integrity

- Every agent key in `teams.yaml` must exist in `agents.yaml`
- Every agent key in `agent-chain.yaml` steps must exist in `agents.yaml`
- `session-manager.yaml` only uses the `session-manager` agent defined in `agents.yaml`
- `reviewer.yaml` duplicates the `reviewer` entry from `agents.yaml` but adds model and system prompt

### Consuming Code

| YAML File | Consumer | Location |
|-----------|----------|----------|
| `agents.yaml` | `cross-agent.ts`, `agent-team.ts` | `.pi/extensions/ui/` |
| `teams.yaml` | `agent-team.ts` | `.pi/extensions/ui/` |
| `agent-chain.yaml` | `agent-chain.ts` | `.pi/extensions/ui/` |
| `session-manager.yaml` | `session-manager` agent | — |
| `reviewer.yaml` | Agent loader | — |

> **Note:** Extensions are loaded via the justfile (`just ext-agent-team`, etc.), not through direct `pi -e` flags. Pi 0.70.5+ made stacking multiple `-e` flags unstable.

---

## Quick Reference

### Need a Team?

```
full-dev-team         → General development
homepage-team         → Website work
pi-pi-meta-team       → Pi configuration
extensions-team       → Extension development
browser-automation-team → Web scraping
```

### Need a Chain?

```
plan-build-review     → Standard dev cycle
plan-build            → Quick implementation
full-review           → Scout through review
scout-flow            → Deep codebase exploration
browser-flow          → Web automation
security-research-flow → Security audit
```

### Need an Agent?

```
scout                 → Explore codebase
planner               → Create plans
developer             → Write code
reviewer              → Review code
documenter            → Write docs
bowser                → Browser automation
ext-builder           → Build extensions
session-manager       → Manage sessions
```
