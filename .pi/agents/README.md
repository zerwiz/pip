# Pi Homepage Builder Agent Team

A comprehensive multi-agent team for building professional, SEO-optimized, accessible, and conversion-focused homepages.

## Available Agents

### 🎨 Core Building Agents
- **design-agent** - UI/UX specialist for visual design
- **content-agent** - Copywriting and engagement optimization
- **dev-agent** - Developer for implementation
- **research-agent** - Research and competitor analysis
- **marketing-agent** - Marketing strategy and positioning

### 🖼️ Visual Assets
- **image-agent** - Image selection and optimization
- **vision-agent** - Visual design and creation

### 📈 Performance & SEO
- **seo-agent** - SEO optimization
- **analytics-agent** - Performance tracking
- **web-agent** - Web development

### ♿ Accessibility & UX
- **accessibility-agent** - WCAG compliance

### 📝 Content & Media
- **blog-agent** - Blog content creation
- **podcast-agent** - Audio/podcast creation

### 📄 Documents
- **docx-agent** - Document formatting
- **pdf-agent** - PDF creation
- **ppt-agent** - Presentation creation

### 🔍 Analytics & Data
- **news-agent** - News aggregation
- **charts-agent** - Visualization
- **excel-agent** - Data analysis

### 🧪 Testing & Quality
- **code-agent** - Code quality
- **webdev-agent** - Web development

## Teams Configuration

```yaml
homepage-builder:  # Primary team
  - design-agent
  - content-agent
  - dev-agent
  - research-agent
  - marketing-agent
  - image-agent
  - seo-agent
  - accessibility-agent

seo-team:
  - research-agent
  - content-agent
  - seo-agent
  - analytics-agent

creative-team:
  - design-agent
  - image-agent
  - blog-agent
  - vision-agent

content-pipeline:
  - research-agent
  - content-agent
  - design-agent
  - dev-agent
```

## Usage Examples

### Build a Complete Homepage
```bash
pi "Build a homepage for my personal portfolio"
```

This will:
1. Use research-agent to analyze market
2. Use design-agent for layout
3. Use content-agent for copy
4. Use dev-agent to implement
5. Use accessibility-agent to verify
6. Use seo-agent to optimize

### Focus on SEO
```bash
pi "Create a homepage for a local business, optimized for SEO"
```

### Focus on Design
```bash
pi "Design a creative homepage for an art portfolio"
```

### Focus on Content
```bash
pi "Build a content hub with blog section"
```

### Full Build Pipeline
```bash
pi --team homepage-builder "Create homepage"
```

### Quick Visual Design
```bash
/pi/agents/design-agent.md "Create a homepage layout"
```

## Agent Communication

Agents work in coordinated pipeline:

1. **Research phase**: research-agent analyzes market
2. **Design phase**: design-agent + image-agent create visuals
3. **Content phase**: content-agent + marketing-agent craft copy
4. **Development phase**: dev-agent implements
5. **SEO phase**: seo-agent optimizes
6. **Accessibility phase**: accessibility-agent verifies
7. **Review phase**: All agents review and refine

## Best Practices

1. **Start with research**: Let research-agent analyze first
2. **Use appropriate team**: Choose team matching your goal
3. **Let agents collaborate**: Trust their expertise
4. **Review outputs**: Check all agent recommendations
5. **Iterate**: Refine based on feedback

## Skills Integration

Each agent can call relevant skills from `/home/zerwiz/pihomepage/skills`:
- Use docx-agent for documents
- Use charts-agent for data viz
- Use image-agent for visual assets
- Use content-agent for copy
- And more...

## Team Orchestration

The team orchestrates automatically:
- Primary team runs on session start
- Agents can be called individually for specific tasks
- Skills are loaded on-demand
- Results are collected and refined

## Session Management

Use for building homepages:
```bash
pi --session homepages.json "Build homepage"
```

Or run individual agents:
```bash
pi/design-agent.md "Create layout for"
```

## Contributing

To add new agents:
1. Copy `expert-agent.md` as template
2. Define specific role and tools
3. Add to `agents.yaml`
4. Document in this README

## License

MIT License - See individual skill files for specific terms.