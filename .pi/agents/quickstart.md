# Quick Start Guide: Homepage Builder Team

## What is this team?

A multi-agent Pi system that builds professional, SEO-optimized, accessible homepages automatically.

## How to Use

### Build a Homepage Automatically

```bash
pi "Build a homepage for my portfolio"
```

The system will automatically:
1. Research the industry
2. Design the homepage
3. Write compelling copy
4. Implement the code
5. Optimize for SEO
6. Verify accessibility

### Focus on Specific Aspects

**Design-focused:**
```bash
/design-agent "Create a homepage layout for"
```

**Content-focused:**
```bash
/content-agent "Write homepage copy for"
```

**Development:**
```bash
/dev-agent "Build homepage code for"
```

**SEO:**
```bash
/seo-agent "Optimize this homepage for SEO"
```

## Available Agents

### Core Building Agents
| Agent | Role | Use Case |
|-------|------|----------|
| `design-agent` | UI/UX | Visual design and layout |
| `content-agent` | Copywriting | Engagement and conversion |
| `dev-agent` | Development | Code implementation |
| `research-agent` | Research | Market analysis |
| `marketing-agent` | Strategy | Positioning and CRO |

### Visual & Asset Agents
| Agent | Role | Use Case |
|-------|------|----------|
| `image-agent` | Visuals | Image selection |
| `vision-agent` | Design | Visual creation |

### Technical Agents
| Agent | Role | Use Case |
|-------|------|----------|
| `seo-agent` | SEO | Search optimization |
| `accessibility-agent` | A11y | WCAG compliance |

### Media Agents
| Agent | Role | Use Case |
|-------|------|----------|
| `blog-agent` | Writing | Blog content |
| `podcast-agent` | Audio | Podcast creation |

### Data & Analysis
| Agent | Role | Use Case |
|-------|------|----------|
| `news-agent` | News | News aggregation |
| `charts-agent` | Visualization | Data visualization |
| `excel-agent` | Analysis | Data analysis |

## Common Commands

### Build a Simple Homepage
```bash
pi "Create a simple homepage about"
```

### Build a Business Homepage
```bash
pi --team business-site-team "Build homepage for business"
```

### Use Visual Design Focus
```bash
/design-agent "Design a creative homepage"
```

### Focus on SEO
```bash
/seo-agent "Optimize for search engines"
```

### Accessibility Check
```bash
/accessibility-agent "Audit accessibility"
```

### Quick Content Update
```bash
/content-agent "Update homepage content"
```

### Complete Homepage Build
```bash
pi --team homepage-builder-team "Build complete homepage"
```

## Skills Integration

All agents can call Pi skills from `/home/zerwiz/pihomepage/skills`:

```bash
pi "Build homepage using marketing-mode skill"
```

This will load the marketing-mode skill for marketing tasks.

## Team Combinations

### Complete Homepage Build
```bash
pi --team homepage-builder-team "Full homepage build"
```

**Agents involved:**
- research-agent (strategy)
- design-agent (visuals)
- content-agent (copy)
- dev-agent (code)
- seo-agent (optimization)
- accessibility-agent (compliance)

### Quick Build
```bash
/design-agent + /dev-agent "Quick build"
```

### Design + Content
```bash
/design-agent "Design phase"
/content-agent "Content phase"
/dev-agent "Implementation phase"
```

## Session Management

### Persistent Build

```bash
pi --session homepage-build.json "Continuous build"
```

This maintains context across multiple agent invocations.

### Individual Testing

```bash
# Test a single agent
/design-agent "Create layout"

# Continue session
pi -c --session homepage-build.json
```

## Best Practices

1. **Start with research** (`research-agent`)
2. **Get design approved** (`design-agent`)
3. **Review content** (`content-agent`)
4. **Implement** (`dev-agent`)
5. **SEO review** (`seo-agent`)
6. **Accessibility check** (`accessibility-agent`)
7. **Iterate** using any agent as needed

## Example Workflow

```bash
# Phase 1: Research
pi/research-agent "Analyze business for homepage"

# Phase 2: Design
pi/design-agent "Create homepage layout"
pi/image-agent "Select images for homepage"

# Phase 3: Content
pi/content-agent "Write homepage content"

# Phase 4: Development
pi/dev-agent "Build homepage code"

# Phase 5: SEO
pi/seo-agent "Optimize for SEO"

# Phase 6: Accessibility
pi/accessibility-agent "Verify accessibility"
```

## Tips

- Use `grep` to review agent outputs
- Use `find` to locate created files
- Use `read` to review generated content
- Iterate with multiple agents as needed
- Combine agents in custom pipelines

## Available Teams

Teams defined in `teams.yaml`:
- `homepage-builder-team` - Complete workflow
- `quick-build-team` - Rapid creation
- `accessibility-first-team` - Inclusive design
- `seo-optimization-team` - Search focus
- `creative-design-team` - Visual focus
- `business-site-team` - Business homepages

## Need Help?

Agents will help if you're unsure about a step. Ask them:
- "How to improve?"
- "What's next?"
- "Any issues to fix?"

## See Also

- `/home/zerwiz/pihomepage/.pi/agents/README.md` - Full documentation
- `/home/zerwiz/pihomepage/.pi/agents/teams.yaml` - Team configs
- `/home/zerwiz/pihomepage/.pi/agents/agents/` - All agent definitions
