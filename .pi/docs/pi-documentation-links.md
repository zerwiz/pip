# Pi Documentation Links & References

This document contains all the official Pi documentation links and references that agents should use to stay updated on features.

## Core Documentation Links

### Getting Started
- **Main README**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/README.md
  - Quick start, providers, interactive mode, sessions, customization, CLI reference
  - Official site: https://pi.dev

### Extension Development
- **Extensions Docs**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/extensions.md
  - Extension API, events, custom tools, UI components, examples
  - Key imports: `@mariozechner/pi-coding-agent`, `typebox`, `@mariozechner/pi-tui`
  - Extension locations: `~/.pi/agent/extensions/`, `.pi/extensions/`

### Skills (Agent Skills Standard)
- **Skills Docs**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/skills.md
  - Skill structure, SKILL.md format, frontmatter fields, validation
  - Locations: `~/.pi/agent/skills/`, `.pi/skills/`
  - Standard: https://agentskills.io/specification

### Themes
- **Themes Docs**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/themes.md
  - Theme format, 51 color tokens, color values, examples
  - Theme schema: https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/src/modes/interactive/theme/theme-schema.json
  - Locations: `~/.pi/agent/themes/`, `.pi/themes/`

### Settings & Configuration
- **Settings Docs**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/settings.md
  - All settings: model, thinking, UI, compaction, retry, sessions, providers
  - Locations: `~/.pi/agent/settings.json`, `.pi/settings.json`

- **Providers Docs**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/providers.md
  - All providers: Anthropic, OpenAI, Azure, Bedrock, Google, Mistral, Groq, etc.
  - API keys, OAuth, custom providers, resolution order

### User Interface
- **Keybindings Docs**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/keybindings.md
  - All keybinding IDs, default bindings, custom configuration
  - Config file: `~/.pi/agent/keybindings.json`

- **TUI Docs**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/tui.md
  - Component interface, built-in components, custom components, theming, patterns
  - Package: `@mariozechner/pi-tui`

### Prompt Templates
- **Prompt Templates Docs**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/prompt-templates.md
  - Template format, arguments, argument-hints, usage
  - Locations: `~/.pi/agent/prompts/`, `.pi/prompts/`

### Additional Documentation
- **Session Format**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/session-format.md
- **Compaction**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/compaction.md
- **Models**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/models.md
- **Custom Provider**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/custom-provider.md
- **RPC Mode**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/rpc.md
- **SDK**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/sdk.md
- **Development**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/development.md
- **Packages**: https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/packages.md

## Web Access Tools (pi-web-access)

### Package Information
- **npm**: https://www.npmjs.com/package/pi-web-access
- **GitHub**: https://github.com/nicobailon/pi-web-access
- **Version**: 0.10.6 (latest)

### Available Tools
- **web_search**: Search the web via Exa, Perplexity, or Gemini
  - `web_search({ query: "..." })`
  - `web_search({ queries: ["...", "..."] })`
  - Supports: `numResults`, `recencyFilter`, `domainFilter`, `provider`, `includeContent`, `workflow`

- **fetch_content**: Fetch URL content (web pages, GitHub repos, YouTube, PDFs, videos)
  - `fetch_content({ url: "https://..." })`
  - Handles: web pages, GitHub repos (auto-clone), YouTube videos, PDFs, local videos

- **code_search**: Search for code examples via Exa MCP
  - `code_search({ query: "..." })`

## Template Locations

### Local Templates (Keep Updated!)
- **Extension Templates**: `.pi/templates/extensions/`
  - `basic-tool.ts` - Basic tool template
  - `event-handler.ts` - Event handler template
  - `custom-command.ts` - Custom command template
  - `ui-widget.ts` - UI widget template
  - `plan-mode.ts` - Plan mode template

- **Agent Templates**: `.pi/templates/agents/`
  - `generic-agent.md` - Generic specialist agent
  - `coding-agent.md` - Coding specialist
  - `research-agent.md` - Research specialist
  - `agent-with-memory.md` - Agent with persistent memory

- **Skill Templates**: `.pi/templates/skills/`
  - `web-research/SKILL.md` - Web research skill
  - `code-review/SKILL.md` - Code review skill
  - `doc-generator/SKILL.md` - Documentation generator skill

- **Prompt Templates**: `.pi/templates/prompt-templates/`
  - `review.md` - Code review prompt
  - `component.md` - Component creation prompt
  - `explain.md` - Code explanation prompt

- **Theme Templates**: `.pi/templates/themes/`
  - `dark-theme.json` - Dark theme template
  - `light-theme.json` - Light theme template
  - `nord-theme.json` - Nord theme template

## Agent Update Workflow

When agents need to check for new features or updates:

1. **Check Pi documentation** for new features:
   ```typescript
   fetch_content({ url: "https://raw.githubusercontent.com/badlogic/pi-mono/refs/heads/main/packages/coding-agent/docs/extensions.md" })
   ```

2. **Compare with local templates** in `.pi/templates/`:
   - Read local template
   - Compare with latest docs
   - Update template if new features exist

3. **Update templates when needed**:
   - Use `edit` to add new patterns
   - Use `write` to create new template files
   - Document changes in CHANGELOG.md

4. **Notify user of updates**:
   - Use `save_memory` to record update
   - Notify via `ctx.ui.notify()`

## Important Notes

- Templates in `.pi/templates/` are **reference implementations**
- Agents should **check web documentation** before creating new extensions/agents
- **pi-web-access** tools (`web_search`, `fetch_content`) are available in all agents
- When docs show new features not in templates, **update the templates**
- Keep CHANGELOG.md updated with all changes
