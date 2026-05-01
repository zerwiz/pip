# Z.AI to PI Agent Skill Migration Plan

## Overview

This document outlines the comprehensive migration strategy for transferring agent skills from z.ai to the PI system. The goal is to validate, migrate, and integrate these skills while maintaining their original functionality but adapting them to the PI architecture.

---

## Current Status

### Source Location
- **Path**: `/home/zerwiz/pip/.pi/agents/homepageteam/ref/skills/`
- **Type**: Reference z.ai skill repository
- **Content**: 48+ specialized AI skills across multiple categories



---

## Migration Strategy

### Phase 1: Validation & Assessment

#### 1.1 Review Each Skill
- Examine all 48+ skills in the ref/skills directory
- Document current functionality and dependencies
- Identify z.ai-specific code, APIs, and patterns
- Assess compatibility with PI architecture

#### 1.2 Categorize Skills
Group skills by complexity and integration requirements:

| Category | Skills | Priority |
|------|------|----------|
| **Critical** | Core development, content, research | P0 - Immediate |
| **Important** | Design, analysis, tools | P1 - High |
| **Nice-to-have** | Travel, wellness, creative | P2 - Medium |

### Phase 2: Z.AI Removal & Adaptation

#### 2.1 Remove z.ai Branding
- Strip all z.ai references from code
- Remove z.ai-specific API calls
- Replace with PI-native equivalents
- Update documentation and comments

#### 2.2 Adapt to PI Architecture
- Convert z.ai patterns to PI patterns
- Implement PI's agent team framework
- Use PI's extension system
- Integrate with agent-team.ts and related UI components

#### 2.3 Maintain Functionality
- Preserve core logic and functionality
- Keep performance characteristics
- Ensure same output quality
- Match original skill behavior

### Phase 3: Integration Requirements

#### 3.1 YAML Configuration
Update `/home/zerwiz/pip/.pi/teams.yaml` with:

```yaml
# Example structure for migrated skills
skills:
  marketing-mode:
    name: "Marketing Mode Agent"
    category: "content"
    source: "z.ai (migrated)"
    enabled: true
    dependencies:
      - agent-chain.ts
      - memory-tools.ts
    functions:
      - content_generation
      - strategy_planning
      - seo_optimization
```

#### 3.2 Agent Team Integration
Skills must integrate with:
- `/home/zerwiz/pip/.pi/extensions/ui/agent-team.ts`
- `/home/zerwiz/pip/.pi/extensions/ui/agent-team-chain.ts`
- `/home/zerwiz/pip/.pi/teams.yaml`
- PI's memory and session management

#### 3.3 Skill Activation
Skills should be callable as:
```typescript
/skill:skill-name [arguments]
```

Example:
```typescript
/skill:marketing-mode generate content about AI trends
```

### Phase 4: Migration Checklist

#### For Each Skill
- [ ] Validate functionality
- [ ] Remove z.ai branding
- [ ] Update imports to use PI paths
- [ ] Test with PI agent system
- [ ] Verify performance
- [ ] Update documentation
- [ ] Add to teams.yaml
- [ ] Test in production

---

## Skill Categories

### Content & Writing (11 skills)
- marketing-mode
- content-strategy
- seo-content-writer
- blog-writer
- writing-plans
- storyboard-manager
- ai-news-collectors

### Analysis & Research (11 skills)
- contentanalysis
- aminer-daily-paper
- aminer-academic-search
- aminer-open-academic
- qingyan-research
- stock-analysis-skill
- finance
- get-fortune-analysis
- ai-news-collectors

### Design & Creativity (6 skills)
- ui-ux-pro-max
- visual-design-foundations
- image-understand
- image-edit
- podcast-generate
- dream-interpreter

### Document Processing (3 skills)
- docx
- pdf
- ppt

### Web & Browser (4 skills)
- web-reader
- web-shader-extractor
- agent-browser
- multi-search-engine

### Travel & Life (3 skills)
- auto-target-tracker
- mindfulness-meditation
- dream-interpreter

### Psychology & Wellness (3 skills)
- anti-pua
- skill-vetter
- skill-creator

### Development (4 skills)
- coding-agent
- fullstack-dev
- LLM
- ASR

### Data & Finance (2 skills)
- xlsx
- charts

### Communication & Media (2 skills)
- image-understand
- podcast-generate

---

## Technical Requirements

### File Structure for Migrated Skills
```
/home/zerwiz/pip/.pi/agents/homepageteam/
├── skills/                          # Migrated skills directory
│   ├── marketing-mode/
│   │   ├── SKILL.md                # Skill documentation
│   │   ├── core.ts                 # Core functionality
│   │   ├── memory-export.ts        # Memory tools integration
│   │   └── dependencies/
│   └── ...
```

### Dependencies
Each skill must declare:
- Memory tools dependencies
- Agent chain dependencies
- Extension dependencies
- Configuration file paths

### Testing
Before migration to production:
1. Unit tests pass
2. Integration tests pass
3. Performance benchmarks met
4. z.ai references removed
5. PI integration verified

---

## Implementation Notes

### DO
- Use PI's extension system
- Follow PI's agent patterns
- Integrate with memory tools
- Use teams.yaml for configuration
- Test thoroughly before deployment

### DON'T
- Don't rewrite core logic
- Don't change functionality
- Don't add new features (yet)
- Don't use z.ai APIs
- Don't assume www.pi.dev boot strategy

### Migration Rules
1. **Same Functionality**: Skills must work exactly as before
2. **No Rewriting**: Keep existing logic, just adapt paths
3. **PI Paths**: Use PI directory structure
4. **Memory Integration**: Connect to PI's memory system
5. **No Boot**: Skills don't boot like regular extensions

---

## Status

- **Migration Status**: Not Started
- **Priority**: Critical
- **Timeline**: TBD
- **Blocker**: Must complete before production

---

## Next Steps

1. Review all 48+ skills in ref/skills/
2. Create migration script for each category
3. Set up test environment
4. Migrate critical skills first
5. Validate each skill works correctly
6. Update teams.yaml progressively
7. Test integration with agent-team.ts
8. Clean up ref/skills/ directory after successful migration

---

## Contact

For questions about migration process:
- Review agent documentation
- Check PI architecture guidelines
- Consult team.yaml specifications
```
