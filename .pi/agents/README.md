# Pi Homepage Builder Agent Team

A comprehensive multi-agent team for building professional, SEO-optimized, accessible, and conversion-focused homepages.

**Critical**
Every agent needs to be by their `specialist_id:`


`agent-team.ts` file scans agents from these directories:
- join(cwd, "agents")
- join(cwd, ".claude", "agents")
- join(cwd, ".pi", "agents")

`scanAgentDirs` function that reads `.md` 
`loadAgents` function 
`agents.yaml` function 

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
# Homepage Builder Agent Team Summary

## ✅ Successfully Created Homepage Builder Team

### 🎯 Core Agents (9 Specialized Agents)

1. **expert-agent** - Agent architecture and team orchestration expert
2. **design-agent** - UI/UX specialist for visual homepage design
3. **content-agent** - Copywriting and engagement optimization
4. **dev-agent** - Code implementation for functionality
5. **research-agent** - Market analysis and competitor research
6. **marketing-agent** - Marketing strategy and CRO
7. **seo-agent** - Search engine optimization
8. **accessibility-agent** - WCAG compliance and inclusive design
9. **image-agent** - Image selection and visual optimization

### 📋 Additional Agents from Skills

- **blog-agent** - Blog content creation
- **podcast-agent** - Audio/podcast creation
- **charts-agent** - Data visualization
- **excel-agent** - Data analysis
- **news-agent** - News aggregation
- **docx-agent** - Document handling
- **pdf-agent** - PDF creation
- **ppt-agent** - Presentations
- And more from your skills directory

### 🏆 Teams Created (16 Configured Teams)

The team can work in different modes:

1. **homepage-builder-team** - Complete workflow
2. **quick-build-team** - Rapid creation
3. **accessibility-first-team** - Inclusive design
4. **seo-optimization-team** - Search focus
5. **creative-design-team** - Visual focus
6. **business-site-team** - Business homepages
7. **content-pipeline** - Research → Content → Design → Dev
8. And 10 more specialized team configurations

### 📂 File Structure

NEEDS TO BE FILLED!

## 📈 Capabilities

### Full Homepage Build Pipeline
1. **Research** → `research-agent` analyzes market
2. **Design** → `design-agent` creates layouts
3. **Content** → `content-agent` writes copy
4. **Development** → `dev-agent` implements code
5. **SEO** → `seo-agent` optimizes visibility
6. **Accessibility** → `accessibility-agent` ensures compliance

### Specialized Workflows
- **Quick Build**: 5-minute homepage
- **Design-Focused**: Beautiful layouts
- **SEO-Optimized**: High search visibility
- **Accessible**: WCAG compliant design

### Team Orchestration
- Automatic pipeline execution
- Collaborative agent work
- Comprehensive quality assurance
- Continuous optimization

## 🎨 Skills Integration

All agents can call Pi skills from your skills directory:
- Use `docx-agent` for documents
- Use `charts-agent` for data viz
- Use `image-agent` for visuals
- And any other skills you load

## 🔧 Configuration Files Created

1. **`README.md`** - Team documentation
2. **`teams.yaml`** - Team configurations (16 teams)
3. **`quickstart.md`** - Usage guide
4. **`SUMMARY.md`** - Creation summary (this file)
5. **`agenttemplate.md`** - Template for new agents
6. **`agents.yaml`** - Agent list
7. Individual agent definition files

## 📝 Next Steps

1. **Test the Team**: `pi "Build a test homepage"`
2. **Use Individual Agents**: Call specific agents for focus
3. **Add Skills**: Load relevant skills as needed
4. **Customize**: Modify agent prompts for your needs
5. **Iterate**: Refine based on results

## 🌟 Benefits

- **Comprehensive**: Full homepage build capability
- **Specialized**: Expert-focused agents
- **Flexible**: Multiple team configurations
- **Documented**: Clear usage instructions
- **Extensible**: Easy to add new agents
- **Professional**: Business-quality output

The homepage builder team is now ready to create professional, SEO-optimized, and accessible homepages with minimal effort!
