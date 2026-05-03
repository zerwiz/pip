# Pi Agent System Documentation

A comprehensive reference for the Pi Agent Platform — a modular, multi-host AI deployment system with 30+ specialized agents, 13 team configurations, and 14 pipeline chains.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Agent Categories & Specializations](#agent-categories---specializations)
3. [Available Agents by Directory](#available-agents-by-directory)
4. [Active Team Configurations](#active-team-configurations)
5. [Pipeline Chains](#pipeline-chains)
6. [System Capabilities](#system-capabilities)
7. [Operational Protocols](#operational-protocols)
8. [Extensions & Integration](#extensions---integration)

---

## System Architecture

### High-Level Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              PIP                                            │
├──────────────────────────────────────────────────────────────────────────┤
│  🏗️  Entry Layer: justfile (Entry Point)                                   │
│      └─> Sets PI_STACK env var → loads pi-loader.ts                        │
├──────────────────────────────────────────────────────────────────────────┤
│  🛠️  Middle Layer: .pi/extensions/                                         │
│      ├─> Entry Points (ui/): agent-team.ts, agent-chain.ts, pi-pi.ts      │
│      ├─> Utility Layer (util/): memory-tools, damage-control, pi-loader   │
│      └─> Base Layer (src/ui/): themes, widgets, components                 │
├──────────────────────────────────────────────────────────────────────────┤
│  🤖 Agent Layer: .pi/agents/                                               │
│      ├─> agents.yaml (30 agents)                                            │
│      ├─> teams.yaml (13 teams)                                              │
│      ├─> agent-chain.yaml (14 chains)                                       │
│      ├─> session-manager.yaml (session workflows)                           │
│      ├─> agents/ (homepage team)                                            │
│      ├─> specialagents/ (domain experts)                                    │
│      └─> pi-pi/ (meta experts)                                              │
└──────────────────────────────────────────────────────────────────────────┘
```

### Core Components

| Component | Purpose | Location |
|-----------|---------|----------|
| **justfile** | Build automation & extension launcher | `/justfile` |
| **pi-loader.ts** | Dynamic extension loader | `.pi/extensions/util/` |
| **Damage Control** | Safety auditing & error recovery | `.pi/extensions/util/` |
| **Memory System** | Multi-scope memory management | `.pi/extensions/util/` |
| **Agent Orchestrator** | Team coordination | `.pi/agents/agents.yaml` |
| **Session Manager** | Chat session lifecycle | `.pi/agents/session-manager.yaml` |

---

## Agent Categories & Specializations

### 📦 Core Development Agents (7)

The foundational agents that handle the complete development lifecycle.

| Agent | Specialization | Tools | Use Case |
|-------|---------------|-------|----------|
| **scout** | Fast Reconnaissance | read, grep, find, ls | Codebase exploration, file discovery, documentation storage locations |
| **planner** | Architecture & Planning | read, grep, find, ls, write | Architecture design, implementation planning, resource allocation |
| **developer** | Code Implementation | read, write, edit, bash, grep, find, ls | Code generation, feature implementation, bug fixes |
| **reviewer** | Code Review & QC | read, bash, grep, find, ls, write | Code quality checks, security audits, validation |
| **documenter** | Documentation | read, write, edit, grep, find, ls | README generation, doc updates, changelog maintenance |
| **red-team** | Security Testing | read, bash, grep, find, ls | Adversarial testing, vulnerability scanning, security audits |
| **session-manager** | Session Coordination | read, write, grep, find, ls | Chat session management, metadata retrieval, history coordination |

### 🎨 Domain Specialists (4)

Agents specialized in specific development domains and platforms.

| Agent | Specialization | Tools | Use Case |
|-------|---------------|-------|----------|
| **frontendcoder** | UI/UX Implementation | read, write, edit, bash, grep, find, ls | Component generation, styling, responsive design |
| **bowser** | Browser Automation | read, write, ls | Headless browser automation using Playwright CLI |
| **ext-builder** | Extensions Development | read, write, edit, bash, grep, find, ls | Pi extensions, tools, events, rendering, overrides |
| **plan-reviewer** | Plan Critique | read, grep, find, ls | Challenges and validates implementation plans |

### 🌐 Platform Experts (2)

Agents with deep knowledge of specific platforms and technologies.

| Agent | Specialization | Tools | Use Case |
|-------|---------------|-------|----------|
| **netlify-troubleshooter** | CI/CD & Netlify | read, write, edit, bash, grep, find, ls | Build-pipeline optimization, dependency resolution, diagnostics |
| **pi-dev-expert** | Pi Ecosystem | read, write, edit, bash, grep, find, ls | Core primitives, extensions, skills, terminal orchestration |

### 🏠 Homepage Team (8)

A dedicated team for building professional websites and landing pages.

| Agent | Specialization | Tools | Use Case |
|-------|---------------|-------|----------|
| **dev-agent** | Homepage Development | read, write, edit, bash, grep, find, ls | Turns designs into functional, high-performance webpages |
| **content-agent** | Content Creation | read, write, edit, bash, grep, find, ls | Compelling copy, SEO optimization, engagement maximization |
| **marketing-agent** | Marketing Strategy | read, write, bash, grep, find, ls | Positioning, conversion optimization, campaign strategies |
| **research-agent** | Research & Context | read, grep, find, ls, bash, web-search | Competitor analysis, content validation, context gathering |
| **design-agent** | Visual Design | read, write, edit, bash, grep, find, ls | UI/UX design, beautiful accessible layouts |
| **seo-agent** | SEO Optimization | read, write, edit, bash, grep, find, ls | Search engine optimization, UX maintenance |
| **accessibility-agent** | WCAG Compliance | read, write, edit, bash, grep, find, ls | Inclusive design, accessibility standards |
| **image-agent** | Visual Assets | read, write, edit, bash, grep, find, ls | Image selection, optimization, visual design |

### 🧠 Meta Experts / Pi-Pi Team (13)

Specialized meta-agents for building and configuring the Pi system itself.

#### Pi-Pi Core (7)

| Agent | Specialization | Tools | Use Case |
|-------|---------------|-------|----------|
| **pi-orchestrator** | Pi Coordination | read, write, edit, bash, grep, find, ls, query_experts | Coordinates experts, builds Pi components |
| **skill-expert** | Skills Management | read, grep, find, ls, bash | SKILL.md format, validation, command registration |
| **agent-expert** | Agent Definitions | read, grep, find, ls, bash | persona formats, teams.yaml structure, orchestration |
| **ext-expert** | Extensions | read, write, edit, bash, grep, find, ls | Tools, events, rendering overrides |
| **tui-expert** | TUI Components | read, grep, find, ls, bash | Components, overlays, widgets, keyboard input |
| **cli-expert** | CLI Interface | read, grep, find, ls, bash | Arguments, flags, environment variables, subcommands |
| **config-expert** | Configuration | read, grep, find, ls, bash | settings.json, providers, models, keybindings |

#### Pi-Pi UI (6)

| Agent | Specialization | Tools | Use Case |
|-------|---------------|-------|----------|
| **prompt-expert** | Prompt Templates | read, grep, find, ls, bash | Single-file .md, frontmatter, positional args |
| **theme-expert** | Themes | read, grep, find, ls, bash | JSON format, 51 color tokens, hot reload |
| **keybinding-expert** | Keybindings | read, grep, find, ls, bash | registerShortcut(), modifier combos |

### 🎯 Special Agents (40+)

Domain-specific and advanced capability agents available through specialagents/.

#### Research & Analysis (8)

| Agent | Specialization | Tools |
|-------|---------------|-------|
| **research-assistant** | Research & Context Gathering | read, grep, find, ls, bash, web-search, fetch_content |
| **market-analyzer** | Market & Competitive Analysis | read, grep, find, ls, bash, web-search, fetch_content |
| **content-analyzer** | Deep Content Analysis | read, grep, find, ls, bash, web-search, fetch_content |
| **content-strategist** | Content Strategy | read, write, edit, bash, grep, find, ls, web-search |
| **academic-search** | Academic Research | read, grep, find, ls, bash, web-search, fetch_content |
| **open-academic** | Open Academic Resources | read, grep, find, ls, bash, web-search, fetch_content |
| **ai-news-collector** | AI Industry News | read, grep, find, ls, bash, web-search, fetch_content |
| **daily-paper** | Daily Paper Summaries | read, grep, find, ls, bash, web-search, fetch_content |

#### Web Tools (8)

| Agent | Specialization | Tools |
|-------|---------------|-------|
| **browser-agent** | Browser Automation | read, write, edit, bash, grep, find, ls |
| **web-content-fetcher** | Content Extraction | read, write, edit, bash, grep, find, ls, web_search, fetch_content |
| **web-search-engine** | Multi-Engine Search | read, grep, find, ls, bash, web_search, fetch_content |
| **meta-search** | Advanced Meta-Search | read, grep, find, ls, bash, web_search |
| **llm-integrator** | LLM Integration | read, write, edit, bash, grep, find, ls |
| **vision-language** | Multimodal Vision | read, grep, find, ls, bash, web_search, fetch_content |
| **image-analyzer** | Image Analysis | read, grep, find, ls, web_search, fetch_content |
| **video-analyzer** | Video Analysis | read, write, edit, bash, grep, find, ls, web_search, fetch_content |

#### Content Creation (12)

| Agent | Specialization | Tools |
|-------|---------------|-------|
| **seo-writer** | SEO Content Writing | read, write, edit, bash, grep, find, ls, web_search |
| **blog-author** | Blog Writing | read, write, edit, bash, grep, find, ls, web_search |
| **presentation-creator** | Presentations | read, write, edit, bash, grep, find, ls |
| **podcast-creator** | Podcast Scripts | read, write, edit, bash, grep, find, ls |
| **storyboard-creator** | Storyboards | read, write, edit, bash, grep, find, ls |
| **chart-creator** | Data Visualization | read, write, edit, bash, grep, find, ls |
| **writing-planner** | Writing Structure | read, write, edit, bash, grep, find, ls |
| **skill-builder** | Skill Development | read, write, edit, bash, grep, find, ls |
| **skill-finder** | Skill Discovery | read, grep, find, ls, bash, web_search |
| **skill-reviewer** | Skill Auditing | read, bash, grep, find, ls, write |
| **skill-reviewer** | Skill Code Review | read, bash, grep, find, ls, write |

#### Creative & AI Tools (6)

| Agent | Specialization | Tools |
|-------|---------------|-------|
| **ui-ux-designer** | UI/UX Design | read, write, edit, bash, grep, find, ls |
| **visual-designer** | Visual Design | read, write, edit, bash, grep, find, ls |
| **mindfulness-coach** | Mindfulness & Meditation | read, grep, find, ls, bash, web_search |
| **anti-manipulation** | Critical Thinking | read, grep, find, ls, bash, web_search |
| **dream-analyzer** | Dream Interpretation | read, grep, find, ls, bash, web_search |
| **auto-target** | Automated Tracking | read, grep, find, ls, bash |

#### Finance & Professional (5)

| Agent | Specialization | Tools |
|-------|---------------|-------|
| **finance-advisor** | Financial Advice | read, grep, find, ls, bash, web_search, fetch_content |
| **stock-analyzer** | Stock Analysis | read, grep, find, ls, bash, web_search, fetch_content |
| **fortune-analyzer** | Wealth Analysis | read, grep, find, ls, bash, web_search |
| **gift-advisor** | Gift Recommendations | read, grep, find, ls, bash, web_search |
| **spreadsheet-processor** | Data Analysis | read, write, edit, bash, grep, find, ls |
| **document-processor** | Document Processing (PDF, DOCX) | read, write, edit, bash, grep, find, ls |

#### Developer Tools (4)

| Agent | Specialization | Tools |
|-------|---------------|-------|
| **fullstack-developer** | Full-Stack Development | read, write, edit, bash, grep, find, ls, web_search, fetch_content |
| **coding-agent** | Code Development | read, write, edit, bash, grep, find, ls |
| **execute-plan** | Execution Planning | read, write, edit, bash, grep, find, ls |
| **coding-agent** | Code Development | read, write, edit, bash, grep, find, ls |

---

## Available Agents by Directory

### Root Agents Directory (`.pi/agents/`)

30 core agents + configuration files:

```
.pi/agents/
├── agents.yaml                    # Master registry (30 agents)
├── teams.yaml                     # Team configurations (13 teams)
├── agent-chain.yaml               # Pipeline chains (14 chains)
├── session-manager.yaml           # Session workflows (2 flows)
├── reviewer.yaml                  # Standalone agent config
├── agenttemplate.md               # Agent creation template
├── CHECKLIST.md                   # Agent creation checklist
├── README.md                      # Agent directory docs
├── bowser.md                      # Browser automation agent
├── developer.md                   # Development agent
├── documenter.md                  # Documentation agent
├── ext-builder.md                 # Extensions builder
├── frontendcoder.md               # Frontend coding agent
├── netlify-agent.md               # Netlify troubleshooting
├── netlify.md                     # Netlify deployment
├── pi-dev-expert.md               # Pi ecosystem expert
├── planner.md                     # Planning agent
├── plan-reviewer.md               # Plan critique agent
├── red-team.md                    # Security testing agent
├── reviewer.md                    # Code review agent
├── scout.md                       # Reconnaissance agent
├── session-manager.md             # Session management agent
├── specialagents/                 # 40+ domain specialists
│   └── *.md                        # Individual specialist agents
├── teams.yaml                     # Team definitions
├── homepageteam/                  # Homepage team (8 agents)
│   ├── dev-agent.md               # Development specialist
│   ├── content-agent.md           # Content specialist
│   ├── marketing-agent.md         # Marketing specialist
│   ├── research-agent.md          # Research specialist
│   ├── design-agent.md            # Design specialist
│   ├── seo-agent.md               # SEO specialist
│   ├── accessibility-agent.md     # Accessibility specialist
│   └── image-agent.md             # Visual specialist
└── pi-pi/                         # Pi-Pi meta agents (7 agents)
    ├── pi-orchestrator.md
    ├── skill-expert.md
    ├── agent-expert.md
    ├── ext-expert.md
    ├── tui-expert.md
    ├── cli-expert.md
    ├── config-expert.md
    ├── prompt-expert.md
    ├── theme-expert.md
    └── keybinding-expert.md
```

### Special Agents Directory (`.pi/agents/specialagents/`)

40+ agents with specialized capabilities:

- academic-search, ai-news-collector, anti-manipulation, auto-target
- blog-author, browser-agent, chart-creator, coding-agent
- content-analyzer, content-strategist, daily-paper, document-processor
- dream-analyzer, execution-planner, ffmpeg, finance-advisor, finance-tools
- fortune-analyzer, fullstack-developer, gift-advisor, image-analyzer
- image-editor, interview-forensics, interview-specialist, llm-integrator
- market-analyzer, marketing-expert, marketing-vault, meta-search
- mindfulness-coach, open-academic, podcast-creator, presentation-creator
- research-assistant, seo-writer, shader-extractor, skill-builder
- skill-finder, skill-reviewer, speech-to-text, spreadsheet-processor
- stock-analyzer, storyboard-creator, ui-ux-designer, video-analyzer
- vision-language, visual-designer, vlm-tracker, web-content-fetcher
- web-search-engine, writing-planner

---

## Active Team Configurations

### Project Teams (10)

Teams for general development and specialized tasks.

| Team | Agents | Purpose |
|------|--------|---------|
| **full-dev-team** | scout, planner, developer, reviewer, documenter | Complete implementation pipeline |
| **planning-review-team** | scout, planner, plan-reviewer, reviewer | Architecture and validation |
| **security-research-team** | scout, developer, netlify-troubleshooter, ext-builder, pi-dev-expert | Exploration and analysis |
| **browser-automation-team** | bowser, developer, documenter | Web scraping and testing |
| **session-team** | session-manager, developer, documenter | Session lifecycle operations |
| **build-deploy-team** | developer, netlify-troubleshooter, planner, reviewer | CI/CD and deployment |
| **architecture-team** | planner, plan-reviewer, reviewer, ext-builder, pi-dev-expert | Design and code quality |
| **extensions-team** | ext-builder, developer, documenter, pi-dev-expert | Pi extensions development |
| **fast-exec-team** | planner, developer, scout | Quick plan and implement cycles |
| **maintenance-team** | documenter, session-manager, developer, reviewer | Cleanup and documentation |

### Domain Teams (2)

Teams for specialized domain work.

| Team | Agents | Purpose |
|------|--------|---------|
| **homepage-team** | dev-agent, content-agent, design-agent, marketing-agent, research-agent, seo-agent, accessibility-agent, image-agent | Homepage development and optimization |
| **pi-pi-meta-team** | pi-orchestrator, skill-expert, agent-expert, ext-expert, tui-expert, cli-expert, config-expert, prompt-expert, theme-expert, keybinding-expert | Building and configuring Pi itself |

### Global Access (1)

| Team | Agents |
|------|--------|
| **all-specialists** | All 30 agents |

---

## Pipeline Chains

Sequential workflows where each step uses an agent with a specific prompt. Available variables: `$INPUT` (previous step output) and `$ORIGINAL` (user's original request).

| Chain | Steps | Purpose |
|-------|-------|---------|
| **plan-build-review** | planner → developer → reviewer | Standard development cycle |
| **plan-build** | planner → developer | Fast two-step without review |
| **scout-flow** | scout → scout → scout | Triple-scout deep recon |
| **plan-review-plan** | planner → plan-reviewer → planner | Iterative planning with critique |
| **full-review** | scout → planner → developer → reviewer | End-to-end pipeline |
| **browser-flow** | scout → developer → bowser → documenter | Browser automation workflow |
| **session-workflow** | session-manager → developer → documenter | Session management workflow |
| **security-research-flow** | scout → ext-builder → pi-dev-expert → developer → reviewer | Security research |
| **deploy-workflow** | scout → netlify-troubleshooter → developer → documenter | CI/CD deployment |
| **extensions-workflow** | pi-dev-expert → ext-builder → developer → documenter → reviewer | Extension development |
| **fast-exec-team** | planner → developer | Quick cycles |
| **docs-workflow** | scout → documenter → developer | Documentation workflow |
| **architecture-review** | planner → plan-reviewer → pi-dev-expert → reviewer | Architecture review |
| **session-analysis-flow** | session-manager | Session deep-dive analysis |

---

## System Capabilities

### 🛠️ Tool Capabilities

| Tool | Description | Usage |
|------|-------------|-------|
| **read** | Read file contents | Any file in the project |
| **write** | Write files | Create/overwrite files |
| **edit** | Edit files (targeted replacements) | Precise, non-overlapping edits |
| **bash** | Execute shell commands | File operations, automation |
| **grep** | Search files | Find patterns recursively |
| **find** | File system search | Find files by pattern |
| **ls** | List directory contents | View directory structure |
| **web_search** | Web search | Multi-engine search capabilities |
| **fetch_content** | Web content extraction | Fetch and summarize web pages |

### 🔑 Core System Features

#### Multi-Host Architecture
- Deploy Ollama instances on local and remote hosts
- Parallel agent execution across different hosts
- Model specialization per host workload
- Automatic failover and reassignment

#### Extension System
- Three-layer hierarchy: utility → function → ui-core
- Dynamic loading via pi-loader.ts
- Categorized loading with conflict resolution
- Single `-e` flag loading (Pi 0.70.5+)

#### Damage Control
- 60+ dangerous command pattern rules
- Read-only/no-delete path protections
- Per-path override mechanisms
- Interactive settings modal

#### Memory Management
- Multi-scope memory (user/project/local)
- Export to JSON, text, markdown
- Stats and filtered formats
- Memory export tools

#### Theme System
- 11 pre-configured themes (Catppuccin, Nord, Dracula, etc.)
- 51 color tokens with vars system
- Hot reload capability
- JSON configuration

#### Session Management
- Multi-session coordination
- Session metadata retrieval
- History management
- Cross-session operations

#### Security & Auditing
- Red-team agents for adversarial testing
- Vulnerability scanning
- Security audit reporting
- Damage control rules

### 🌟 Advanced Capabilities

| Capability | Description |
|------------|-------------|
| **Web Access** | Built-in web search and content fetching |
| **Browser Automation** | Playwright-based headless browser control |
| **Image Processing** | Analysis, editing, and generation tools |
| **Video Analysis** | FFmpeg-based frame extraction and analysis |
| **Code Generation** | TypeScript, JavaScript, Python, and more |
| **Documentation** | Automatic README, changelog, and doc generation |
| **Extension Development** | Custom tools, events, rendering, overrides |
| **TUI Components** | Terminal UI widgets and overlays |
| **Prompt Engineering** | Template management and injection |
| **CLI Commands** | Full command-line integration |

### 📊 Performance Features

| Feature | Benefit |
|---------|---------|
| **Parallel Execution** | Run multiple agents simultaneously on different hosts |
| **Model Specialization** | Assign different models to different hosts |
| **Graceful Failover** | Automatic reassignment when hosts become unavailable |
| **Memory Efficiency** | Multi-scope memory prevents redundancy |
| **Tool Optimization** | Each agent gets only necessary tools |
| **Atomic Execution** | One feature at a time, no over-engineering |

---

## Operational Protocols

### Mandatory Operational Protocol (for all agents)

1. **Scout Dependency Protocol**: Before initiating, verify access to a recent `scout` report if applicable. If no report exists, flag to Dispatcher and wait.

2. **Atomic Execution**: Implement one feature, fix, or document at a time. Do not attempt massive tasks in a single pass.

3. **Clarification Gate**: If a task is ambiguous, missing file paths, or lacks clear requirements, halt immediately. Do not guess. Explicitly request clarification.

4. **Directory Integrity**: 
   - Write files in accordance with project structure
   - Build logs/artifacts MUST be saved to: `.pi/build_logs/`
   - Full-file backups MUST be moved to: `.pi/reference/`

5. **Changelog Compliance**: Log completion in `CHANGELOG.md` via `edit` (prepend). Do not overwrite.

6. **Safety First**: `read` relevant files before modifying. Perform dry runs for complex bash commands. Stop immediately on failure.

7. **Validation**: Verify work (syntax, existence, or tests) before signaling completion.

### Strict Edit Protocol (CRITICAL)

- **Prefer the `edit` tool**: Apply changes to specific lines
- **Forbidden Overwrites**: Do not rewrite entire files unless new or >80% changed
- **The Backup & Git Rule** for full file rewrites:
  1. Branch & Push: `git checkout -b rewrite/[TIMESTAMP]/[FILENAME]`
  2. Move existing file to: `.pi/reference/[FILENAME]_[TIMESTAMP]`
  3. Write: Write the new version
  4. Confirm: Report branch pushed and original backed up

### Termination Protocol

- Output exactly `[SIGNAL_COMPLETE]` on a new line when finished
- Provide NO further text after this signal
- Stop immediately

### Review Workflow (NEW: Developer→Reviewer Handoff)

The developer agent follows a mandatory 5-step protocol:

1. Execute & Validate code changes
2. Log to review queue using `bash echo` to `.pi/build_logs/review_requests.md`
3. Dispatch reviewer via `dispatch_agent` tool
4. Await `[REVIEW_COMPLETE]` confirmation
5. Complete task only after reviewer confirms

---

## Extensions & Integration

### Extension Loading

Extensions are started through `justfile` using a single-entry dynamic loader pattern.

```bash
just run-pi "agent-team,damage-control,theme-cycler"
# Sets PI_STACK and runs: pi -e .pi/extensions/util/pi-loader.ts
```

### Extension Directory Structure

```
.pi/extensions/
├── ui/                   # Primary entry-point extensions
│   ├── agent-team.ts
│   ├── agent-chain.ts
│   ├── cross-agent.ts
│   ├── pi-pi.ts
│   ├── subagent-widget.ts
│   └── tilldone.ts
├── util/                # Utility functions
│   ├── pi-loader.ts
│   ├── damage-control.ts
│   ├── memory-export.ts
│   └── memory-tools.ts
└── src/ui/              # Shared UI components
    ├── themeMap.ts
    └── theme-cycler.ts
```

### Extension Catalog (12 utilities + 6 UI)

#### Main UI Extensions (6)

| Extension | Purpose |
|-----------|---------|
| **agent-team.ts** | Agent team management, memory export, team switching |
| **agent-chain.ts** | Sequential pipeline orchestrator |
| **cross-agent.ts** | Cross-agent command/skill discovery |
| **pi-pi.ts** | Meta-agent with parallel research experts |
| **subagent-widget.ts** | Background subagents with live widgets |
| **tilldone.ts** | Task discipline system |

#### Utility Extensions (12)

- `pi-loader.ts`: Dynamic extension loader
- `damage-control.ts`: Error recovery and safety auditing
- `memory-export.ts`: Memory export in multiple formats
- `memory-tools.ts`: Memory tools functions
- `manifest.ts`: Extension metadata
- `types.ts`: Type definitions
- `memory.ts`: Memory functions
- `themeMap.ts`: Theme definitions
- `theme-cycler.ts`: Theme iteration
- `pure-focus.ts`: Stripped-down UI
- `minimal.ts`: Minimal mode
- `tool-counter.ts`: Tool usage tracking

#### Base UI Components (11)

- `themeMap.ts`: Theme definitions
- `theme-cycler.ts`: Theme iteration
- `pure-focus.ts`: Minimal UI
- `minimal.ts`: Minimal mode
- `tool-counter.ts`: Tool usage counter
- `conversation-viewer.ts`: Chat display
- `command-history.ts`: Command history
- `DynamicBorder.ts`: Adaptive boundaries
- `Footer.ts`: Footer component
- `Modal.ts`: Modal dialogs
- `Input.ts`: Input dialogs

---

## References

- [Agent YAML Configuration](../docs/AGENT-YAML-CONFIGURATION.md)
- [Agent Usage Maps](../docs/MAIN-UI-EXTENSIONS-USAGE.md)
- [Justfile Startup Mechanism](../docs/JUSTFILE-STARTUP-MECHANISM.md)
- [Pi Extensions Documentation](../extensions/README.md)
- [Migration Guide](../docs/MIGRATION-GUIDE.md)

---

**System Version**: 0.72.1+  
**Last Updated**: 2026  
**License**: MIT  
**Developer**: @zerwiz
