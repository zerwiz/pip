# PIP - Project Integration Platform

A powerful agent-based system for automating complex tasks with specialized AI skills and extensions.

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/zerwiz/pip.git
cd pip

# Install dependencies
just install

# Run the system
just run

# Build for production
just build
```

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Agents](#agents)
- [Extensions](#extensions)
- [Skills](#skills)
- [Configuration](#configuration)
- [Development](#development)
- [Migration](#migration)
- [Contributing](#contributing)
- [License](#license)

## About

PIP is a modular platform for building AI-powered automation systems with specialized agents, skills, and extensions. It supports multiple programming languages (TypeScript, Python) and integrates seamlessly with various AI models and services.

## Features

- **Specialized Agents**: 30+ pre-built agents for different domains
- **AI Skills**: 48+ specialized AI skills from z.ai migration
- **Extensions System**: Modular extension architecture
- **Multi-language Support**: TypeScript, Python, and more
- **Theme System**: 11 pre-configured themes
- **Memory Management**: Advanced memory export and tools
- **Agent Teams**: Collaborative agent workspaces
- **Justfile Build System**: Fast and reliable build automation

## Installation

### Prerequisites

- Node.js 18+
- Python 3.10+
- Just (build tool)
- Git

### Setup

```bash
# Install system dependencies
just install

# Run tests
just test

# Build for production
just build

# Start development server
just dev
```

## Architecture

```
pip/
├── .github/           # GitHub workflows and configs
├── .pi/               # Main workspace directory
│   ├── agents/        # Agent definitions and docs
│   ├── docs/          # Project documentation
│   ├── extensions/    # Functional utilities
│   ├── npm/           # npm packages
│   ├── py/            # Python modules
│   ├── src/           # TypeScript source
│   ├── themes/        # Theme configurations
│   ├── plans/         # Planning and strategy docs
│   └── .context/      # Runtime context metadata
├── justfile           # Build system configuration
└── package.json       # NPM dependencies
```

## Project Structure

```
/home/zerwiz/pip/
├── justfile                    # Build automation
└── .pi/                        # Main workspace
    ├── agents/                 # Agent system
    │   ├── agents/            # Individual agent docs
    │   ├── util/              # Agent utilities
    │   ├── homepageteam/      # Home page team
    │   └── README.md, SUMMARY.md
    ├── docs/                  # All project documentation
    ├── extensions/            # Extensions (CRITICAL - MIXED BOOT)
    │   ├── theme-cycler.ts    # Boots regular www.pi.dev way
    │   ├── themeMap.ts        # Boots regular www.pi.dev way
    │   ├── ui/                # TUI extensions (justfile boot)
    │   ├── util/              # Feature extensions (justfile boot)
    │   └── src/               # Extra functions (justfile boot)
    ├── plans/                 # Migration and strategy docs
    ├── py/                    # Python modules
    ├── src/ui/                # TypeScript UI components
    └── themes/                # 11 color themes
```

## Agents

### Specialized Agents

- **Accessibility Agent** - Accessibility improvements
- **Content Agent** - Content generation and management
- **Design Agent** - Design and UI/UX
- **Dev Agent** - Development tasks
- **Expert Agent** - Expert knowledge queries
- **Image Agent** - Image processing
- **Marketing Agent** - Marketing and copy
- **Research Agent** - Research and analysis
- **SEO Agent** - SEO optimization

### Management Agents

- **Scout** - Discovery and reconnaissance
- **Reviewer** - Code review
- **Planner** - Planning tasks
- **Plan Reviewer** - Plan validation
- **Red Team** - Security testing
- **Session Manager** - Session lifecycle

### Developer Tools

- **Developer** - Development assistance
- **Documenter** - Documentation generation
- **Ext Builder** - Extension building
- **Frontend Coder** - Frontend development
- **PI Dev Expert** - PI-specific expertise

## Extensions

### Extension Boot Rules

⚠️ **CRITICAL**: Extensions have different boot strategies!

| Location | Boot Method | Purpose |
|----------|-------------|---------|
| `/.pi/extensions/` | Regular www.pi.dev | Root extensions (theme-cycler, themeMap) |
| `/.pi/extensions/ui/` | Justfile paths | TUI extensions only |
| `/.pi/extensions/util/` | Justfile paths | Feature utilities |
| `/.pi/extensions/src/` | Justfile paths | Extra functions |

### Root Extensions (www.pi.dev Boot)

- `theme-cycler.ts` - Theme cycling
- `themeMap.ts` - Theme mappings

### TUI Extensions (Justfile Boot)

- `agent-chain.ts` - Agent chaining
- `agent-team-chain.ts` - Team chaining
- `agent-team.ts` - Team management
- `cross-agent.ts` - Cross-agent communication
- `pi-pi.ts` - PI-PI integration
- `subagent-widget.ts` - Subagent widget
- `tilldone.ts` - Completion tracking

### Feature Extensions (Justfile Boot)

- `agent-switch.ts` - Agent switching
- `damage-control.ts` - Damage control
- `memory-export.ts` - Memory export
- `memory-tools.ts` - Memory utilities
- And many more...

## Skills

### Migrated from z.ai

We're migrating 48+ specialized AI skills:

**Content & Writing (11 skills)**
- marketing-mode, content-strategy, seo-content-writer
- blog-writer, writing-plans, storyboard-manager, ai-news-collectors

**Analysis & Research (11 skills)**
- contentanalysis, aminer-daily-paper, aminer-academic-search
- qingyan-research, stock-analysis-skill, finance, and more

**Design & Creativity (6 skills)**
- ui-ux-pro-max, visual-design-foundations, image-understand
- image-edit, podcast-generate, dream-interpreter

**And many more...**

## Configuration

### Core Files

| File | Purpose |
|------|---------|
| `damage-control-rules.yaml` | Safety protocols |
| `teams.yaml` | Agent team definitions |
| `settings.json` | General project settings |
| `tsconfig.json` | TypeScript configuration |

### Extension Configuration

Extensions are configured via the justfile at `justfile`. All non-root extensions boot as specified in this file.

## Usage

### Running Agents

```bash
# Run a specific agent
pi run --agent agent-name

# List all agents
pi list --agents

# Run an extension
pi run --extension extension-name
```

### Using Skills

```bash
# Call a skill
/skill:marketing-mode [arguments]

# Example
/skill:marketing-mode generate content about AI trends
```

## Development

### Building

```bash
just build
just test
just lint
```

### Testing

```bash
just test:unit
just test:integration
just test:e2e
```

### Linting

```bash
just lint
just lint:fix
```

## Migration

### Z.AI to PI Migration

See the migration documentation:

- `/.pi/plans/Z_AI_TO_PI_AGENT_MIGRATION.md` - Complete migration plan
- `/.pi/plans/RECONFIGURATION-PLAN.md` - File movement and reconfiguration

### Migration Phases

1. **Validation**: Review each skill in ref/skills/
2. **Removal**: Strip z.ai branding and APIs
3. **Adaptation**: Convert to PI patterns
4. **Integration**: Update teams.yaml
5. **Testing**: Verify functionality
6. **Deployment**: Push to production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

### Code Style

- Use TypeScript for JavaScript
- Use Python 3.10+ for Python
- Follow existing code patterns
- Write clear documentation
- Add tests for new features

## License

MIT License - See individual files for specific terms.

## Support

For issues or questions:

- Check the documentation in `/.pi/docs/`
- Review agent documentation
- See migration guides
- Contact the project maintainers

## Roadmap

- [ ] Complete z.ai skills migration
- [ ] Add more specialized agents
- [ ] Improve extension system
- [ ] Add more themes
- [ ] Enhance memory management
- [ ] Add more documentation
- [ ] Production readiness

## Acknowledgments

- z.ai for the skills repository
- Community contributors
- Team members for development

---

**Production Ready Status**: In Progress

**Last Updated**: $(date +%Y-%m-%d)

**Repository**: https://github.com/zerwiz/pip