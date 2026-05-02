# Pi Agents Directory

This directory contains specialist agent definitions for the Pi Coding Agent ecosystem. Each agent is identified by its `specialist_id` for reliable discovery and dispatch by the sipatch agent.

## 🎯 How Agent Discovery Works

The `agent-team.ts` orchestrator discovers agents through multiple sources:

1. **`.md` Files**: Scans `*.md` files in agent directories
2. **`agents.yaml`**: Reads the YAML registry listing all agents by `specialist_id`
3. **`teams.yaml`**: Defines team configurations using agent names

## 📋 Available Agents

All agents below are registered in `agents.yaml` by their `specialist_id`:

| Agent Name | Specialist ID | Description |
|------------|---------------|-------------|
| `bowser` | `bowser` | Headless browser automation using Playwright CLI |
| `developer` | `developer` | Implementation and code generation specialist |
| `documenter` | `documenter` | Documentation and README generation specialist |
| `ext-builder` | `ext-builder` | Pi extensions expert for custom tools and skills |
| `frontend-coder` | `frontend-coder` | UI/UX implementation and component generation |
| `netlify-troubleshooter` | `netlify-troubleshooter` | CI/CD diagnostics and build-pipeline optimization |
| `pi-dev-expert` | `pi-dev-expert` | Pi Coding Agent ecosystem specialist |
| `plan-reviewer` | `plan-reviewer` | Plan critic for reviewing implementation plans |
| `planner` | `planner` | Architecture and implementation planning specialist |
| `reviewer` | `reviewer` | Code review and quality checks agent |
| `scout` | `scout` | Fast recon and codebase exploration agent |
| `session-manager` | `session-manager` | Session management and lifecycle coordination |

## 🏗️ Team Configurations

See `teams.yaml` for available team configurations. Teams are organized by use case:

- **full-dev-team**: Complete development workflow (scout → planner → developer → reviewer → documenter)
- **planning-review-team**: Architecture and validation focus
- **browser-automation-team**: Web scraping and testing workflows
- **session-team**: Session lifecycle operations
- **build-deploy-team**: CI/CD and deployment workflows
- **extensions-team**: Pi extensions development
- **security-research-team**: Security analysis and research

## 🔗 Agent Chains

See `agent-chain.yaml` for predefined multi-agent workflows:

- **plan-build-review**: Standard development cycle
- **plan-build**: Fast two-step implementation
- **scout-flow**: Triple-scout deep recon
- **browser-flow**: Browser automation workflow
- **session-workflow**: Session management workflow
- **deploy-workflow**: CI/CD deployment workflow
- **extensions-workflow**: Extension development workflow

## 📁 File Structure

```
.pi/agents/
├── README.md                    # This file
├── agents.yaml                  # Agent registry by specialist_id
├── teams.yaml                   # Team configurations
├── agent-chain.yaml            # Multi-agent workflow chains
├── scout.md                     # Scout agent definition
├── planner.md                   # Planner agent definition
├── developer.md                 # Developer agent definition
├── reviewer.md                  # Reviewer agent definition
├── documenter.md                # Documenter agent definition
├── ext-builder.md               # Extension builder definition
├── frontend-coder.md            # Frontend coder definition
├── netlify-agent.md             # Netlify troubleshooter definition
├── pi-dev-expert.md             # Pi dev expert definition
├── plan-reviewer.md             # Plan reviewer definition
├── session-manager.md           # Session manager definition
├── bowser.md                    # Bowser agent definition
├── bowser                       # Alias for bowser.md
├── teams.yaml                   # Team configurations
└── agents.yaml                  # Agent registry
```

## 🔧 Usage

### Dispatch Individual Agents

```bash
pi scout.md "Explore the codebase and identify: [request]"
pi planner.md "Create a plan for: [request]"
pi developer.md "Implement this plan: [plan]"
pi reviewer.md "Review this implementation: [code]"
```

### Use a Team

```bash
pi --team full-dev-team "Build a feature"
pi --team browser-automation-team "Scrape this website"
pi --team extensions-team "Create a custom tool"
```

### Use a Chain

```bash
pi --chain plan-build-review "Plan, build, and review: [request]"
pi --chain scout-flow "Triple-scout analysis: [request]"
```

### Manage Teams

```bash
pi --tool manage_team list
pi --tool manage_team add full-dev-team documenter
pi --tool manage_team remove full-dev-team reviewer
```

## 🎓 Best Practices

1. **Use `specialist_id`**: Always reference agents by their `specialist_id` for reliable identification
2. **Start with Scout**: Let the scout agent explore the codebase before planning
3. **Review Everything**: Always use the reviewer agent for code quality
4. **Document Changes**: Use the documenter agent to update documentation
5. **Respect Agent Roles**: Don't use the developer agent for planning; use the planner instead

## ⚙️ Configuration Files

### agents.yaml

Registry of all available agents. Each agent must have a `specialist_id` field for reliable identification:

```yaml
scout:
  description: Fast recon and codebase exploration agent
  specialist_id: scout
  models:
    - gpt-4-turbo-preview
    - gpt-3.5-turbo
  tools:
    - write
    - find
    - grep
    - read
```

### teams.yaml

Team configurations that group agents for specific workflows:

```yaml
full-dev-team:
  - scout
  - planner
  - developer
  - reviewer
  - documenter
```

### agent-chain.yaml

Predefined multi-agent workflow chains:

```yaml
plan-build-review:
  description: "Plan, implement, and review — the standard development cycle"
  steps:
    - agent: planner
      prompt: "Plan the implementation for: $INPUT"
    - agent: developer
      prompt: "Implement the following plan:\n\n$INPUT"
    - agent: reviewer
      prompt: "Review this implementation for bugs, style, and correctness:\n\n$INPUT"
```

## 🚀 Quick Start

1. **Discover Available Agents**:
   ```bash
   pi --tool dispatch list_agents
   ```

2. **See Available Teams**:
   ```bash
   pi --tool dispatch list_teams
   ```

3. **Test the Scout Agent**:
   ```bash
   pi scout.md "Scan the codebase and report: [request]"
   ```

4. **Run a Full Chain**:
   ```bash
   pi --chain plan-build-review "Build a new feature"
   ```

5. **Manage Teams**:
   ```bash
   pi --tool manage_team list
   pi --tool manage_team activate full-dev-team
   ```

## 📚 Related Documentation

- [Pi Extensions Docs](https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/extensions.md)
- [Agent Template](./agenttemplate.md)
- [Agent Chain Reference](./agent-chain.md)

## 🛠️ Adding New Agents

To add a new agent:

1. Create a `.md` file in this directory
2. Include YAML frontmatter with `specialist_id`, `name`, `description`, and `tools`
3. Register the agent in `agents.yaml`
4. Add to a team in `teams.yaml` if applicable

Example:

```markdown
---
specialist_id: my-new-agent
name: my-new-agent
description: My custom agent for specific tasks
models: null
tools: [read, write, edit, bash]
---
Your agent prompt goes here...
```

Then add to `agents.yaml`:

```yaml
my-new-agent:
  description: My custom agent for specific tasks
  specialist_id: my-new-agent
  models: null
  tools:
    - read
    - write
    - edit
    - bash
```

---

*Version: 1.0.0* | *Author: @zerwiz* | *License: MIT*

**Critical**: Every agent must be registered by their `specialist_id:` field for reliable discovery by the sipatch agent!