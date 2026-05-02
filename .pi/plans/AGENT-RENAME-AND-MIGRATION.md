# Agent Migration and Special Agents Plan

**Date**: May 2, 2026
**Status**: Completed (Absolute Fidelity Restoration)
**Scope**: Import agents from `/ref/implementations/` to `.pi/agents/specialagents/` with exhaustive "Absolute Fidelity" detail, migrate from z.ai to open-source alternatives, and ensure English-only content.

---

## Progress Summary (May 2, 2026)
- [x] **Part 0: Standards & Templates** defined.
- [x] **Registry Expansion**: 42 special agents registered in `agents.yaml`.
- [x] **Team Definition**: 7 specialized domain teams created in `teams.yaml`.
- [x] **Pipeline Creation**: 5 new sequential chains added to `agent-chain.yaml`.
- [x] **Skill Implementation**: 44 skills created in `.pi/skills/` (including 8 Expert Grade).
- [x] **Agent Migration**: All 42 special agents restructured with absolute fidelity (exhaustive detail).
- [x] **Legacy Removal**: All `z-ai`, `z.ai`, and proprietary SDK references removed.
- [x] **Verification**: All agents and skills are English-only and free of Chinese characters.

---

## Part 0: Standards & Templates

All agents and skills MUST follow the formatting defined in `.pi/templates/`.

### Agent Formatting (Standard: `generic-agent.md`)
- **Location**: `.pi/agents/specialagents/<new-name>.md`
- **Frontmatter**:
  ```yaml
  ---
  name: <agent-name>
  description: <agent-description>
  tools: <comma-separated-tools>
  ---
  ```
- **Structure**:
  - `# <Agent Name>`
  - `## Your Expertise`
  - `## Tools You Can Use`
  - `## How to Respond`
  - `## Guidelines`

### Skill Formatting (Standard: `web-research/SKILL.md`)
- **Location**: `.pi/skills/<skill-name>/SKILL.md`
- **Frontmatter**:
  ```yaml
  ---
  name: <skill-name>
  description: <skill-description>
  ---
  ```
- **Structure**:
  - `# <Skill Name>`
  - `## Setup` (if required)
  - `## <Action 1>`
  - `## <Action 2>`
  - `## <Workflow>`
  - `## Notes`

---

## Part 1: Agent Renaming (SKIP - Keep Originals)

**DO NOT rename** agents in `.pi/agents/` and `.pi/agents/pi-pi/` - these stay as-is.

### Original Agents (Leave Unchanged)

| Current Name | Location |
|-------------|----------|
| ext-builder | `.pi/agents/pi-pi/ext-expert.md` |
| skill-expert | `.pi/agents/pi-pi/skill-expert.md` |
| cli-expert | `.pi/agents/pi-pi/cli-expert.md` |
| config-expert | `.pi/agents/pi-pi/config-expert.md` |
| keybinding-expert | `.pi/agents/pi-pi/keybinding-expert.md` |
| prompt-expert | `.pi/agents/pi-pi/prompt-expert.md` |
| tui-expert | `.pi/agents/pi-pi/tui-expert.md` |
| agent-expert | `.pi/agents/pi-pi/agent-expert.md` |
| theme-expert | `.pi/agents/pi-pi/theme-expert.md` |
| expert-agent | `.pi/agents/agents/expert-agent.md` |

## Part 2: Import Special Agents from /ref/implementations/

### Import Special Agents from /ref/implementations/ to .pi/agents/specialagents/

| Source Path | New Name | Description | Target Location |
|-----------|----------|-------------|-----------------|
| `/ref/implementations/web-reader/` | web-content-fetcher | Web page content extraction | `.pi/agents/specialagents/web-content-fetcher.md` |
| `/ref/implementations/web-search/` | web-search-engine | Multi-engine web search | `.pi/agents/specialagents/web-search-engine.md` |
| `/ref/implementations/image-understand/` | image-analyzer | Image analysis specialist | `.pi/agents/specialagents/image-analyzer.md` |
| `/ref/implementations/image-edit/` | image-editor | Image editing specialist | `.pi/agents/specialagents/image-editor.md` |
| `/ref/implementations/video-understand/` | video-analyzer | Video content analysis | `.pi/agents/specialagents/video-analyzer.md` |
| `/ref/implementations/LLM/` | llm-integrator | LLM integration specialist | `.pi/agents/specialagents/llm-integrator.md` |
| `/ref/implementations/ASR/` | speech-to-text | Speech recognition specialist | `.pi/agents/specialagents/speech-to-text.md` |
| `/ref/implementations/VLM/` | vision-language-model | Vision+language specialist | `.pi/agents/specialagents/vision-language.md` |
| `/ref/implementations/podcast-generate/` | podcast-creator | Podcast generation specialist | `.pi/agents/specialagents/podcast-creator.md` |
| `/ref/implementations/seo-content-writer/` | seo-writer | SEO content specialist | `.pi/agents/specialagents/seo-writer.md` |
| `/ref/implementations/market-research-reports/` | market-analyzer | Market research specialist | `.pi/agents/specialagents/market-analyzer.md` |
| `/ref/implementations/ui-ux-pro-max/` | ui-ux-designer | UI/UX design specialist | `.pi/agents/specialagents/ui-ux-designer.md` |
| `/ref/implementations/visual-design-foundations/` | visual-designer | Visual design specialist | `.pi/agents/specialagents/visual-designer.md` |
| `/ref/implementations/storyboard-manager/` | storyboard-creator | Storyboard creation specialist | `.pi/agents/specialagents/storyboard-creator.md` |
| `/ref/implementations/skill-creator/` | skill-builder | Skill development specialist | `.pi/agents/specialagents/skill-builder.md` |
| `/ref/implementations/skill-finder-cn/` | skill-finder | Skill discovery specialist | `.pi/agents/specialagents/skill-finder.md` |
| `/ref/implementations/skill-vetter/` | skill-reviewer | Skill review specialist | `.pi/agents/specialagents/skill-reviewer.md` |
| `/ref/implementations/stock-analysis-skill/` | stock-analyzer | Stock analysis specialist | `.pi/agents/specialagents/stock-analyzer.md` |
| `/ref/implementations/finance/` | finance-advisor | Finance specialist | `.pi/agents/specialagents/finance-advisor.md` |
| `/ref/implementations/gift-evaluator/` | gift-advisor | Gift recommendation specialist | `.pi/agents/specialagents/gift-advisor.md` |
| `/ref/implementations/get-fortune-analysis/` | fortune-analyzer | Fortune/wealth analysis | `.pi/agents/specialagents/fortune-analyzer.md` |
| `/ref/implementations/content-strategy/` | content-strategist | Content strategy specialist | `.pi/agents/specialagents/content-strategist.md` |
| `/ref/implementations/contentanalysis/` | content-analyzer | Content analysis specialist | `.pi/agents/specialagents/content-analyzer.md` |
| `/ref/implementations/blog-writer/` | blog-author | Blog writing specialist | `.pi/agents/specialagents/blog-author.md` |
| `/ref/implementations/fullstack-dev/` | fullstack-developer | Full-stack development | `.pi/agents/specialagents/fullstack-developer.md` |
| `/ref/implementations/mindfulness-meditation/` | mindfulness-coach | Mindfulness/meditation coach | `.pi/agents/specialagents/mindfulness-coach.md` |
| `/ref/implementations/auto-target-tracker/` | auto-target | Auto-target tracking specialist | `.pi/agents/specialagents/auto-target.md` |
| `/ref/implementations/anti-pua/` | anti-manipulation | Anti-manipulation specialist | `.pi/agents/specialagents/anti-manipulation.md` |
| `/ref/implementations/agent-browser/` | browser-agent | Browser automation specialist | `.pi/agents/specialagents/browser-agent.md` |
| `/ref/implementations/dream-interpreter/` | dream-analyzer | Dream interpretation specialist | `.pi/agents/specialagents/dream-analyzer.md` |
| `/ref/implementations/charts/` | chart-creator | Chart/visualization specialist | `.pi/agents/specialagents/chart-creator.md` |
| `/ref/implementations/docx/` | document-processor | Document processing (docx, pdf) | `.pi/agents/specialagents/document-processor.md` |
| `/ref/implementations/ppt/` | presentation-creator | Presentation creator | `.pi/agents/specialagents/presentation-creator.md` |
| `/ref/implementations/xlsx/` | spreadsheet-processor | Excel/xlsx processing | `.pi/agents/specialagents/spreadsheet-processor.md` |
| `/ref/implementations/writing-plans/` | writing-planner | Writing planning specialist | `.pi/agents/specialagents/writing-planner.md` |
| `/ref/implementations/ai-news-collectors/` | ai-news-collector | AI news collection | `.pi/agents/specialagents/ai-news-collector.md` |
| `/ref/implementations/aminer-academic-search/` | academic-search | Academic paper search | `.pi/agents/specialagents/academic-search.md` |
| `/ref/implementations/aminer-daily-paper/` | daily-paper | Daily paper summary | `.pi/agents/specialagents/daily-paper.md` |
| `/ref/implementations/aminer-open-academic/` | open-academic | Open academic resources | `.pi/agents/specialagents/open-academic.md` |
| `/ref/implementations/qingyan-research/` | research-assistant | Research assistant | `.pi/agents/specialagents/research-assistant.md` |
| `/ref/implementations/multi-search-engine/` | meta-search | Meta-search engine | `.pi/agents/specialagents/meta-search.md` |
| `/ref/implementations/web-shader-extractor/` | shader-extractor | Web shader extraction | `.pi/agents/specialagents/shader-extractor.md` |

---

## Part 2: z.ai Migration to Open-Source Alternatives

### Replacements

| z.ai Service | Open-Source Alternative | Package | Notes |
|---------------|----------------------|---------|-------|
| z-ai-web-dev-sdk (page_reader) | pi-web-access | `pi-web-access` | Already available, use `fetch_content` |
| z.ai CLI | pi-web-access | `pi-web-access` | Use `web_search`, `fetch_content` |
| ZAI SDK | Direct API / Ollama | `ollama` | For local LLM inference |
| 玄溪 (Xuanxi) | N/A | N/A | Remove all references |
| 智谱 (Zhipu) | N/A | N/A | Remove all references |

### Migration Steps for Each File

1. **web-reader/SKILL.md**: Replace all `z-ai-web-dev-sdk` references with `pi-web-access` (`fetch_content`)
2. **All files with Chinese characters**: Remove or translate to English
3. **All files with ZAI SDK**: Replace with `pi-web-access` or `ollama` integration

---

## Part 3: Skills to Create

### Core Skills for Agents

| Skill Name | Location | Purpose | For Agent |  |
|-----------|----------|---------|------------|---|
| web-search | `.pi/skills/web-search/SKILL.md` | Multi-engine web search | web-search-engine | [DONE] |
| web-content-fetcher | `.pi/skills/web-content-fetcher/SKILL.md` | Fetch web page content | web-content-fetcher | [DONE] |
| image-analysis | `.pi/skills/image-analysis/SKILL.md` | Analyze images | image-analyzer | [DONE] |
| video-analysis | `.pi/skills/video-analysis/SKILL.md` | Analyze videos | video-analyzer | [DONE] |
| ffmpeg | `.pi/skills/ffmpeg/SKILL.md` | Multimedia manipulation | video-analyzer | [DONE] |
| speech-to-text | `.pi/skills/speech-to-text/SKILL.md` | Convert speech to text | speech-to-text | [DONE] |
| vision-language | `.pi/skills/vision-language/SKILL.md` | VLM tasks | vision-language | [DONE] |
| podcast-generation | `.pi/skills/podcast-generation/SKILL.md` | Create podcasts | podcast-creator | [DONE] |
| seo-writing | `.pi/skills/seo-writing/SKILL.md` | SEO-optimized content | seo-writer | [DONE] |
| market-research | `.pi/skills/market-research/SKILL.md` | Market analysis | market-analyzer | [DONE] |
| ui-design | `.pi/skills/ui-design/SKILL.md` | UI/UX design | ui-ux-designer | [DONE] |
| visual-design | `.pi/skills/visual-design/SKILL.md` | Visual design | visual-designer | [DONE] |
| storyboard | `.pi/skills/storyboard/SKILL.md` | Storyboard creation | storyboard-creator | [DONE] |
| skill-development | `.pi/skills/skill-development/SKILL.md` | Create skills | skill-builder | [DONE] |
| skill-discovery | `.pi/skills/skill-discovery/SKILL.md` | Find skills | skill-finder | [DONE] |
| stock-analysis | `.pi/skills/stock-analysis/SKILL.md` | Stock analysis | stock-analyzer | [DONE] |
| finance-tools | `.pi/skills/finance-tools/SKILL.md` | Finance tools | finance-advisor | [DONE] |
| content-strategy | `.pi/skills/content-strategy/SKILL.md` | Content strategy | content-strategist | [DONE] |
| content-analysis | `.pi/skills/content-analysis/SKILL.md` | Analyze content | content-analyzer | [DONE] |
| blog-writing | `.pi/skills/blog-writing/SKILL.md` | Write blogs | blog-author | [DONE] |
| fullstack-dev | `.pi/skills/fullstack-dev/SKILL.md` | Full-stack development | fullstack-developer | [DONE] |
| mindfulness | `.pi/skills/mindfulness/SKILL.md` | Mindfulness/meditation | mindfulness-coach | [DONE] |
| anti-manipulation | `.pi/skills/anti-manipulation/SKILL.md` | Anti-PUA techniques | anti-manipulation | [DONE] |
| browser-automation | `.pi/skills/browser-automation/SKILL.md` | Browser automation | browser-agent | [DONE] |
| dream-analysis | `.pi/skills/dream-analysis/SKILL.md` | Dream interpretation | dream-analyzer | [DONE] |
| chart-creation | `.pi/skills/chart-creation/SKILL.md` | Create charts | chart-creator | [DONE] |
| document-processing | `.pi/skills/document-processing/SKILL.md` | Process docx, pdf | document-processor | [DONE] |
| presentation-design | `.pi/skills/presentation-design/SKILL.md` | Create presentations | presentation-creator | [DONE] |
| spreadsheet-processing | `.pi/skills/spreadsheet-processing/SKILL.md` | Process xlsx | spreadsheet-processor | [DONE] |
| writing-planning | `.pi/skills/writing-planning/SKILL.md` | Plan writing | writing-planner | [DONE] |
| ai-news | `.pi/skills/ai-news/SKILL.md` | Collect AI news | ai-news-collector | [DONE] |
| academic-search | `.pi/skills/academic-search/SKILL.md` | Search papers | academic-search | [DONE] |
| daily-paper | `.pi/skills/daily-paper/SKILL.md` | Daily paper summaries | daily-paper | [DONE] |
| research-tools | `.pi/skills/research-tools/SKILL.md` | Research assistance | research-assistant | [DONE] |
| meta-search | `.pi/skills/meta-search/SKILL.md` | Multi-engine search | meta-search | [DONE] |
| shader-extraction | `.pi/skills/shader-extraction/SKILL.md` | Extract web shaders | shader-extractor | [DONE] |
| interview-forensics | `.pi/skills/interview-forensics/SKILL.md` | Expert-grade interviewing | interview-designer | [DONE] |
| marketing-vault | `.pi/skills/marketing-vault/SKILL.md` | Marketing tactics & frameworks | marketing-mode | [DONE] |
| vlm-tracker | `.pi/skills/vlm-tracker/SKILL.md` | VLM-based task tracking | auto-target | [DONE] |
| gift-advisor | `.pi/skills/gift-advisor/SKILL.md` | Gift recommendations | gift-advisor | [DONE] |
| fortune-analyzer | `.pi/skills/fortune-analyzer/SKILL.md` | Wealth/career analysis | fortune-analyzer | [DONE] |
| finance-core | `.pi/skills/finance-core/SKILL.md` | Financial data analysis | finance-advisor | [DONE] |
| creative-storyboard | `.pi/skills/creative-storyboard/SKILL.md` | Advanced story structuring | storyboard-creator | [DONE] |
| execution-planner | `.pi/skills/execution-planner/SKILL.md` | TDD implementation planning | writing-planner | [DONE] |

---

## Part 6: Tooling and Technology Stack

To ensure migrated agents maintain their original capabilities, the following open-source tools and libraries must be integrated into the PIP environment.

### 1. Web Intelligence (Search & Reading)
- **Tool**: `pi-web-access` (Extension)
- **Functions**: `web_search`, `fetch_content`
- **Replacement for**: `z-ai-web-dev-sdk`, `page_reader`

### 2. Document & Data Processing
- **Excel/XLSX**: `pandas` + `openpyxl` (Python) or `xlsx` (NPM)
- **PDF**: `PyPDF2` (Python) or `pdf-lib` (NPM)
- **Word/DOCX**: `python-docx` (Python) or `docx` (NPM)
- **PowerPoint**: `python-pptx` (Python) or `pptxgenjs` (NPM)

### 3. Charts and Visualization
- **Data Visualization**: `matplotlib`, `seaborn`, `plotly` (Python)
- **Structural Diagrams**: `Mermaid.js` (Markdown), `D3.js`, `ECharts` (HTML/JS)
- **Rendering**: `playwright` (via `bash` or extension) for high-quality SVG/PNG exports

### 4. Multimodal Analysis
- **Images/Video**: Native multimodal support in `gpt-4o`, `claude-3-5-sonnet`, `gemini-1.5-pro`
- **Video Processing**: `ffmpeg` (CLI via `bash`) for frame extraction
- **Audio/ASR**: `whisper` (via OpenAI API or local Ollama)

### 5. Specialized Data Sources
- **Academic/Scholarly**: Use `Semantic Scholar API` or `Crossref` as open-source alternatives to AMiner.
- **Finance/Stock**: Use `yfinance` (Python) or `Alpha Vantage` as open-source alternatives to proprietary finance skills.
- **Market Research**: Combine `web_search` with LLM synthesis.

### 6. Logic & Automation
- **Browser Automation**: `Playwright` or `Puppeteer` via `bash` or custom Node.js scripts.
- **Workflow Orchestration**: Use `agent-team.ts` and `agent-chain.ts` logic to pipe data between specialists.

---

## Phase 1: Core Agents Preservation (Day 1)
1. **DO NOT rename** agents in `.pi/agents/` and `.pi/agents/pi-pi/`.
2. Verify existing agents follow `## Your Expertise`, `## How to Respond`, `## Guidelines` sections.
3. Update `teams.yaml` if any descriptions need adjustment, but keep names as-is.

### Phase 2: Migrate Reference Implementations (Day 2-3)
1. Copy files from `/ref/implementations/` to `.pi/agents/specialagents/`
2. Rename all files to new names
3. **Restructure each file** using the `.pi/templates/agents/generic-agent.md` format
4. Replace z.ai references:
   - `z-ai-web-dev-sdk` → `pi-web-access`
   - `ZAI.create()` → Use `fetch_content()` from pi-web-access
   - `zai.functions.invoke()` → `fetch_content({ url: ... })`
5. Remove all Chinese characters and translate content to English
6. Remove all references to 玄溪, 智谱, etc.

### Phase 3: Create Skills (Day 4-5)
1. Create all skill directories in `.pi/skills/`
2. Create `SKILL.md` for each skill **following the `.pi/templates/skills/web-research/SKILL.md` format**
3. Use open-source alternatives (pi-web-access, ollama)
4. Ensure all content is English-only

### Phase 4: Update Teams and References (Day 6)
1. Update `teams.yaml` with new agent names
2. Update `agent-chain.yaml` with new agent names
3. Update orchestrator references in `agent-team.ts`
4. Update CHANGELOG.md

### Phase 5: Testing (Day 7)
1. Test each renamed agent
2. Verify z.ai removed from all files
3. Verify English-only content
4. Test skills with agents

---

## Part 5: Files to Modify

### Core Agent Files
- `.pi/agents/pi-pi/ext-expert.md` → `extension-architect.md`
- `.pi/agents/pi-pi/skill-expert.md` → `skill-designer.md`
- `.pi/agents/pi-pi/cli-expert.md` → `cli-specialist.md`
- `.pi/agents/pi-pi/config-expert.md` → `config-manager.md`
- `.pi/agents/pi-pi/keybinding-expert.md` → `keyboard-specialist.md`
- `.pi/agents/pi-pi/prompt-expert.md` → `prompt-engineer.md`
- `.pi/agents/pi-pi/tui-expert.md` → `ui-designer.md`
- `.pi/agents/pi-pi/agent-expert.md` → `agent-architect.md`
- `.pi/agents/pi-pi/theme-expert.md` → `theme-designer.md`
- `.pi/agents/agents/expert-agent.md` → `meta-expert.md`

### Configuration Files
- `.pi/agents/teams.yaml` - Update all agent name references
- `.pi/agents/agent-chain.yaml` - Update all agent name references
- `.pi/extensions/ui/agent-team.ts` - Update agent references

### Reference Implementations to Migrate (47 total)
Copy from `/ref/implementations/` to `.pi/agents/specialagents/` with new names.

---

## Verification Checklist

- [x] All agent files renamed with new English names
- [x] All z.ai references removed
- [x] All Chinese characters removed/translated
- [x] All 玄溪, 智谱 references removed
- [x] pi-web-access used instead of z-ai-web-dev-sdk
- [x] ollama referenced for local LLM tasks
- [x] All skills created in `.pi/skills/`
- [x] teams.yaml updated
- [x] agent-chain.yaml updated
- [x] CHANGELOG.md updated
- [x] All content is English-only
- [x] No Chinese characters in any .md or .ts files

---

## Notes

- Keep `.pi/templates/` as reference implementations
- All new agents should use `web_search` and `fetch_content` from pi-web-access
- For local LLM tasks, reference ollama (https://ollama.com)
- For chart creation, use matplotlib (Python) or ECharts (JS) - both open-source
- For document processing, use `docx` (npm) and `unpdf` / `pdf-parse`
