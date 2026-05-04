# Agent Creation Checklist

**For agents to function correctly in the Pi Agent Team system**

---

## 1. Create the Agent `.md` File

### [ ] File location

Place the `.md` file in one of these directories (scanned in order):

1. `.pi/agents/*.md` — project-local (preferred)
2. `.claude/agents/*.md` — cross-agent compatible
3. `agents/*.md` — project root

### [ ] Filename convention

- Use lowercase, hyphenated name matching the agent identifier
- Example: `scout.md`, `plan-reviewer.md`, `netlify-troubleshooter.md`
- The filename should match the `name` field in frontmatter

### [ ] File structure

Every agent file MUST have this exact structure:

```markdown
---
name: agent-name
description: Short description of what this agent does
tools: read,grep,find,ls
---
Your system prompt goes here. Detailed instructions about the agent's role, constraints, and behavior.
```

---

## 2. YAML Frontmatter Validation

### [ ] `name` (required)

- [ ] Lowercase, hyphenated identifier (e.g., `scout`, `builder`, `red-team`)
- [ ] No spaces — use hyphens
- [ ] No special characters beyond alphanumeric and `-`
- [ ] Must be unique across all agent definitions
- [ ] Matches the filename (without `.md` extension)

### [ ] `description` (required)

- [ ] Brief, human-readable description
- [ ] Shown in TUI widget and tool catalogs
- [ ] One sentence, 80 chars or less recommended
- [ ] Describes the agent's specialty clearly

### [ ] `tools` (required)

- [ ] Comma-separated, no spaces around commas
- [ ] Only valid Pi tool names (see tool reference below)
- [ ] Must include at least `read`

**Available tools:**

| Tool | Purpose | Category |
|------|---------|----------|
| `read` | Read file contents | All agents |
| `grep` | Search file contents with regex | All agents |
| `find` | Find files by pattern | All agents |
| `ls` | List directory contents | All agents |
| `write` | Create/overwrite files | Write-capable |
| `edit` | Modify existing files (find/replace) | Write-capable |
| `bash` | Execute shell commands | Execution-capable |

**Recommended tool sets by role:**

| Role | Tools |
|------|-------|
| Scout/Research | `read,grep,find,ls` |
| Planner | `read,grep,find,ls,write` |
| Reviewer | `read,grep,find,ls,bash` |
| Developer | `read,write,edit,bash,grep,find,ls` |
| Documenter | `read,write,edit,grep,find,ls` |

### [ ] `models` (optional)

- [ ] Leave empty for default model selection, or specify model IDs
- [ ] If left blank, keep the trailing space or omit the line entirely

### [ ] YAML syntax check

- [ ] `---` delimiters on their own lines (first line and before body)
- [ ] No trailing commas in tool list
- [ ] No quotes needed around simple values (but allowed)
- [ ] Proper indentation (2 spaces if nested)

**Valid example:**

```yaml
---
name: scout
description: Fast recon and codebase exploration
tools: read,grep,find,ls
---
```

**Invalid examples:**

```yaml
# WRONG — spaces in tool list
tools: read, grep, find, ls

# WRONG — missing description
---
name: scout
tools: read,grep,find,ls
---

# WRONG — name has spaces
---
name: scout agent
---
```

---

## 3. System Prompt Body

### [ ] Content requirements

- [ ] Starts immediately after the closing `---` delimiter
- [ ] Written in English
- [ ] Defines the agent's role clearly in the first paragraph
- [ ] Includes what the agent SHOULD do
- [ ] Includes what the agent should NOT do
- [ ] Mentions available tools and when to use each
- [ ] Domain-specific instructions and patterns
- [ ] One clear specialty — don't make a generalist

### [ ] Recommended sections

```markdown
You are the [name] agent. Your role is to [mission].

## Scope
- What this agent handles
- What this agent does NOT handle

## Tools
- When to use each available tool
- Tool usage constraints

## Output Format
- Expected deliverables
- File locations for artifacts

## Constraints
- Safety rules
- Quality standards
- Communication style
```

### [ ] Operational protocols (for work-capable agents)

Include these sections if the agent has `write`, `edit`, or `bash` tools:

- [ ] **Mandatory Operational Protocol** — scout dependency, atomic execution, clarification gate
- [ ] **Strict Edit Protocol** — prefer `edit`, forbid overwrites, backup & git rules
- [ ] **Termination Protocol** — output `[SIGNAL_COMPLETE]` on completion
- [ ] **Safety rules** — read before modifying, dry runs, stop on failure

---

## 3b. Required Directories

Agents reference specific directories for artifacts, reviews, and backups. These MUST exist before agents can function. All paths are relative to the project root.

### [ ] Create required directories

```bash
mkdir -p .pi/build_logs .pi/reference .pi/referencefiles
mkdir -p .pi/reviews .pi/planning .pi/security_audits
mkdir -p .pi/web_output .pi/agent-sessions
```

### [ ] Directory usage by agent

| Directory | Used By | Purpose |
|-----------|---------|---------|
| `.pi/build_logs/` | developer, ext-builder, frontendcoder | Build artifacts, review request queue (`review_requests.md`) |
| `.pi/reference/` | developer, ext-builder, frontendcoder, agenttemplate | Backup location for massive refactors |
| `.pi/referencefiles/` | developer | Alternative backup path for file rewrites |
| `.pi/reviews/` | reviewer, plan-reviewer | Audit reports saved as `[NAME]_audit.md` |
| `.pi/planning/` | planner, plan-reviewer | Planning documents |
| `.pi/security_audits/` | red-team | Security audit findings |
| `.pi/web_output/` | bowser | Scraped data, screenshots, HTML dumps |
| `.pi/agent-sessions/` | all dispatched agents | Persistent session JSON files |

### [ ] Verify paths in agent files

- [ ] No hardcoded `/piwithstuff/` or `~/pip/` references — all should use relative paths (`.pi/...`)
- [ ] No `/Users/`, `/home/user/`, or other machine-specific absolute paths
- [ ] All paths are relative (`.pi/...`) or use environment variables

---

## 4. Register in `agents.yaml`

### [ ] Add entry to `.pi/agents/agents.yaml`

```yaml
your-agent-name:
  name: your-agent-name
  description: Same description as in the .md frontmatter
  tools: same,tool,list,as,frontmatter
```

### [ ] Registration checklist

- [ ] Key matches the agent `name` field
- [ ] `name` field matches exactly
- [ ] `description` matches the `.md` frontmatter
- [ ] `tools` matches the `.md` frontmatter
- [ ] Entry is placed in the appropriate category section
- [ ] No duplicate entries with the same key

---

## 5. Add to a Team (Optional)

### [ ] Edit `.pi/agents/teams.yaml`

```yaml
existing-team-name:
  - existing-agent-one
  - your-agent-name       # ← Add here
```

### [ ] Team registration checklist

- [ ] Agent name matches the `name` field exactly (case-insensitive)
- [ ] Agent name uses the same hyphenation as in the `.md` file
- [ ] Added to at least one team, or create a new team
- [ ] No duplicate entries within the same team
- [ ] Indentation: 2 spaces before the `-`

### [ ] Creating a new team

```yaml
new-team-name:
  - agent-one
  - agent-two
  - agent-three
```

- [ ] Team name is descriptive and lowercase with hyphens
- [ ] Members reference existing agent names
- [ ] All referenced agents exist in `agents.yaml` and as `.md` files

---

## 6. Validation Steps

### [ ] File validation

```bash
# Check file exists in a scanned directory
ls .pi/agents/your-agent-name.md
ls .claude/agents/your-agent-name.md
ls agents/your-agent-name.md
```

### [ ] Frontmatter validation

- [ ] Open the `.md` file and verify YAML parses correctly
- [ ] No blank lines between `---` and first field
- [ ] All required fields present: `name`, `description`, `tools`
- [ ] Tools are comma-separated without spaces

### [ ] Directory validation

```bash
# Verify all required directories exist
ls -d .pi/build_logs .pi/reference .pi/referencefiles
ls -d .pi/reviews .pi/planning .pi/security_audits
ls -d .pi/web_output .pi/agent-sessions
```

- [ ] No `/piwithstuff/` or `~/pip/` references in any agent `.md` file
- [ ] All paths are relative to project root (`.pi/...`)
- [ ] No machine-specific paths (`/Users/`, `/home/*/`)
- [ ] No machine-specific paths (`/Users/`, `/home/*/`)

### [ ] agents.yaml validation

- [ ] Run: check that `your-agent-name` appears in `.pi/agents/agents.yaml`
- [ ] Entry has all three required sub-fields

### [ ] teams.yaml validation

- [ ] Run: check that `your-agent-name` appears in at least one team in `.pi/agents/teams.yaml`
- [ ] No typos in the agent name

### [ ] Load test

```bash
# Load the agent team extension and verify the agent appears
just ext-agent-team
# Then run: list_agents or list_active_team
```

---

## 7. Post-Creation

### [ ] Update documentation

- [ ] Update `.pi/docs/AGENT-YAML-CONFIGURATION.md` if adding a new category
- [ ] Update `CHANGELOG.md` with the new agent entry
- [ ] Update any relevant usage maps if the agent has special integrations

### [ ] Test the agent

- [ ] Dispatch the agent via `dispatch_agent` tool
- [ ] Verify it receives its system prompt correctly
- [ ] Verify tool access matches the frontmatter `tools` field
- [ ] Check that memory is read/written to the correct scope
- [ ] Verify the agent appears in the TUI widget roster

---

## Quick Reference: Universal Agent Template

Copy this as a starting point for new agents:

```markdown
---
name: [agent-name]
description: [Short description of what this agent does]
tools: [read,grep,find,ls]
---
You are the [agent-name] agent. Your role is to [mission statement].
You are precise, minimal, and disciplined.

## Scope
- Handle: [what this agent does]
- Do NOT handle: [what to delegate to other agents]

## Tools
You have access to: [tool list]
- Use `read` to examine files before modifying
- Use `grep` to search for patterns
- [Add tool-specific guidance]

## Output
- Deliver [expected output]
- Save artifacts to [location]

## Constraints
- Read files before editing
- One change at a time — atomic execution
- Stop and ask if requirements are unclear
- Output [SIGNAL_COMPLETE] when the task is done
```

Then:
1. Save as `.pi/agents/[agent-name].md`
2. Add to `.pi/agents/agents.yaml`
3. Add to a team in `.pi/agents/teams.yaml`
4. Run `just ext-agent-team` to verify it loads
