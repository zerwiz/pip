# 🚀 Migration Guide: Agent Extension Architecture

**For:** Developer team adopting the agent team extension system
**Goal:** Simplify, consolidate, and document the architecture
**Status:** Updated for new extension location strategy

## ⚠️ Extension Location Strategy (CRITICAL)

Extensions are loaded from TWO locations:

1. **`.pi/extensions/`** - **EXISTING** extensions loaded via justfile (DO NOT BOOT LIKE REGULAR PI)
2. **`extensions/`** - **FUTURE** extensions for new development (theme extensions go here)

All extensions in `.pi/extensions/` are loaded via `/home/zerwiz/pip/justfile`.

---


---

## 📋 Table of Contents

1. [Current State](#current-state)
2. [Target State](#target-state)
3. [Migration Steps](#migration-steps)
4. [Checklists](#checklists)
5. [FAQ](#faq)

---

##  Current State

### **File Structure**

Extensions in **`.pi/extensions/`** (loaded via justfile):

```
.pi/extensions/
├── theme-cycler.ts           # Theme cycling (FUNCTIONAL UTILITY)
├── themeMap.ts               # Theme mappings (FUNCTIONAL UTILITY)
├── util/
│   ├── memory-export.ts      # Memory export tools
│   ├── memory-tools.ts       # Pi command tools
│   ├── damage-control.ts     # Safety layer
│   └── pi-loader.ts          # Dynamic loader
├── ui/
│   ├── agent-team.ts         # Team dispatcher
│   ├── agent-chain.ts        # Chain orchestrator
│   ├── damage-control.ts     # Safety layer
│   └── ...                   # Other UI extensions
└── src/
    └── ...                   # Extra functions
```

Extensions in **`extensions/`** (for future new development):

```
extensions/
├── agent-team.ts             # Future new team dispatcher
├── agent-chain.ts            # Future new chain orchestrator
├── custom-extension.ts       # Custom extensions go here
└── theme-custom.ts           # Custom theme extensions go here
```

### **Current Issues**

- ⚠️ **Duplicate tool registration** between `agent-team.ts` and `agent-team-chain.ts`
- ⚠️ **Conflicting event handlers** in hook lifecycle
- ⚠️ **No clear composition pattern** for combining features
- ⚠️ **Limited documentation** on extension architecture
- ⚠️ **Hard to extend** chain system independently

---

##  Target State

### **File Structure**

Extensions in **`.pi/extensions/`** (existing, loaded via justfile):

```
.pi/extensions/
├── theme-cycler.ts           # Utility extension
├── themeMap.ts               # Utility extension
├── damage-control.ts         # Utility extension
├── util/                     # Feature utilities
│   ├── memory-export.ts
│   ├── memory-tools.ts
│   ├── pi-loader.ts
│   └── ...
└── ui/                       # UI extensions
    ├── agent-team.ts
    ├── agent-chain.ts
    ├── subagent-widget.ts
    └── ...
```

New extensions go in **`extensions/`** (for future development).

### **Recommended Extensions**

Extensions are loaded via **justfile**, not directly with `pi -e`.

#### **Basic (Most Users)**

```bash
just run-pi "damage-control,theme-cycler,agent-team"
# This loads from .pi/extensions/ via justfile
```

#### **Advanced Chains**

```bash
just run-pi "damage-control,theme-cycler,agent-chain"
# This loads from .pi/extensions/ via justfile
```

#### **Full Stack**

```bash
just run-pi "agent-team,damage-control,theme-cycler"
# Loads all extensions from .pi/extensions/
```

#### **Using extensions/ for New Extensions**

Future new extensions:

```bash
just run-pi "my-new-extension,theme-cycler"
# Loads from extensions/
```

---

## Migration Steps

### **Step 1: Extension Location Clarification**

Extensions in **`.pi/extensions/`** are loaded via justfile.

For new extensions, place them in **`extensions/`** directory.

#### **Example: Creating New Extension**

```bash
# Create in extensions/ directory
mkdir extensions/my-new-extension.ts
vi extensions/my-new-extension.ts

# Implement with default factory function
export default function (pi: ExtensionAPI) {
  // Your extension logic
}
```

### **Step 2: Update Justfile**

Extensions are loaded via justfile targets. Update your justfile with new targets:

```just
# Example new target for new extension
ext-my-new-extension:
    @just run-pi "my-new-extension,theme-cycler"
```

### **Step 3: Deprecate agent-team-chain.ts**

**File:** `agent-team-chain.ts`

**Add deprecation notice at top:**

```typescript
/**
 * WARNING: DEPRECATED
 * Use justfile targets instead
 * agent-team.ts + agent-chain.ts in .pi/extensions/
 */
```

### **Step 4: Create Documentation**

**File:** `.pi/extensions/EXTENSION-README.md` (or `extensions/` for new)

**Contents:**

```markdown
# Agent Extension System

## Extensions Location Strategy

### .pi/extensions/ (EXISTING)
- Loaded via justfile
- Contains: theme-cycler.ts, themeMap.ts, agent-team.ts, agent-chain.ts
- DO NOT BOOT LIKE REGULAR PI

### extensions/ (FUTURE)
- For new development
- For theme extensions
- Loaded via justfile

## Recommended Usage

```bash
# Basic usage
just run-pi "agent-team,theme-cycler"

# Advanced usage
just run-pi "agent-team,agent-chain,theme-cycler,damage-control"

# Custom extension
just run-pi "my-custom-extension,theme-cycler"
```

## Memory Export

Available in all extensions:

```bash
pi memory-export:json    # JSON format
pi memory-export:text    # Plain text
pi memory-export:md      # Markdown
pi memory-export:preview # Preview only
```

## See Also

- STRUCTURE.md - Extension location strategy
- MIGRATION-GUIDE.md - This guide
- CHECKLIST.md - Daily maintenance checklist
```

---

## Checklists

### **Developer Onboarding**

### [ ] Load correct extension
- [ ] Read `.pi/extensions/EXTENSION-README.md`
- [ ] Extensions in `.pi/extensions/` are loaded via justfile
- [ ] New extensions go in `extensions/` directory
- [ ] Choose appropriate combination
- [ ] Document why you chose your combination
- [ ] Review AGENT-EXTENSION-ARCHITECTURE.md for full details

### [ ] Memory Setup
- [ ] Review memory.ts for utility functions
- [ ] Understand memory scopes (user/project/local)
- [ ] Check existing memories before creating new ones
- [ ] Use util/memory-export.ts for export features

### [ ] Tool Registration
- [ ] Review existing tools in agent-team.ts (in .pi/extensions/ui/)
- [ ] Review existing tools in agent-chain.ts (in .pi/extensions/ui/)
- [ ] Add new tools to extensions/ directory only (when needed)
- [ ] Check for duplicates in every registration

### [ ] Extension Lifecycle
### [ ] On startup
- [ ] Extensions in .pi/extensions/ are loaded via justfile
- [ ] Register hooks in defined order
- [ ] Register tools after damage-control
- [ ] Check widget registration order
- [ ] Validate tool count (no duplicates)

### [ ] During session
- [ ] Check session_start handler registered once
- [ ] Check before_agent_start hooks don't conflict
- [ ] Validate state management (no leaks)
- [ ] Handle errors in all handlers

### [ ] Memory Operations
### [ ] Read
- [ ] Use readMemoryIndex() from memory.ts
- [ ] Check for truncation warnings
- [ ] Verify memory scope correctness

### [ ] Write
- [ ] Use buildMemoryBlock() for writable access
- [ ] Use buildReadOnlyMemoryBlock() for read-only
- [ ] Validate memory directories exist
- [ ] Check safety guards (symlinks, etc.)

### [ ] Export
- [ ] Use util/memory-export.ts utilities
- [ ] Choose format before exporting
- [ ] Check export paths
- [ ] Preview exports before writing

### [ ] Error Handling
- [ ] Wrap subprocess spawns in try-catch
- [ ] Validate agent names before spawn
- [ ] Handle session cleanup on error
- [ ] Report errors to user clearly

### [ ] Testing
- [ ] Test extension loading in isolation
- [ ] Test tool registration (no duplicates)
- [ ] Test memory read/write cycles
- [ ] Test chain execution
- [ ] Test memory export functions
- [ ] Test damage control triggers

### [ ] Documentation
- [ ] Document new agent personas
- [ ] Document new tools
- [ ] Document new commands
- [ ] Update EXTENSION-README.md in .pi/extensions/
- [ ] Add examples to README.md

### [ ] Code Quality
- [ ] Run lint
- [ ] Run typecheck
- [ ] Review code duplication
- [ ] Check event hook order
- [ ] Validate memory safety
- [ ] Ensure error handling coverage

---

## FAQ

### **Q: Why are there three extensions (team, chain, combined)?**

**A:** They serve different use cases:
- `agent-team.ts` - Multi-agent team dispatcher (in .pi/extensions/)
- `agent-chain.ts` - Sequential pipeline orchestrator (in .pi/extensions/)
- `agent-team-chain.ts` - Combines both (causes conflicts, DEPRECATED)

**Recommendation:** Use team OR chain separately, or composed extension.

### **Q: Where do extensions live?**

**A:** Two locations:

1. **`.pi/extensions/`** - Existing extensions loaded via justfile
   - theme-cycler.ts, themeMap.ts
   - agent-team.ts, agent-chain.ts
   - damage-control.ts
   - All utilities

2. **`extensions/`** - Future new extensions
   - New custom extensions
   - Theme extensions
   - Custom utilities

**DO NOT** load `.pi/extensions/` extensions with `pi -e`. Use justfile.

### **Q: Can I add tools to the extended team?**

**A:** Yes, create new extension in `extensions/` directory:

```typescript
export default function (pi: ExtensionAPI) {
  // ... existing tools ...
  
  // Add custom tool
  pi.registerTool({
    name: "custom-tool",
    // ...
  });
}
```

### **Q: What's the loading order?**

**A:** Extensions in `.pi/extensions/` are loaded via justfile:

1. Load via justfile target (e.g., `just run-pi "agent-team,theme-cycler"`)
2. Extensions load in defined order from .pi/extensions/
3. `theme-cycler.ts` applies theming
4. Agent extensions (team OR chain) apply functionality

**DO NOT use:** `pi -e` for extensions in `.pi/extensions/`

### **Q: Where do I define new agents?**

**A:** In `.pi/agents/` with YAML files:

```yaml
---
name: my-agent
description: My custom agent
tools: read,grep,find,write
---
System prompt content here...

## Agent Content...
```

### **Q: How do I export memory?**

**A:** Use the Pi commands:

```bash
memory-export:json    # To .pi/memory-export.json
memory-export:text    # To .pi/memory-export.txt
memory-export:md      # To .pi/memory-export.md
memory-export:preview # Preview before writing
```

### **Q: Where do new extensions go?**

**A:** For new extensions:

1. Create in `extensions/` directory
2. Implement with default factory function
3. Add justfile target to load it
4. Load with `just run-pi "my-extension,theme-cycler"`

### **Q: Where else can I read more?**

**A:** See these files:
- `STRUCTURE.md` - Extension location strategy
- `MIGRATION-GUIDE.md` - This guide
- `.pi/extensions/EXTENSION-README.md` - Extension documentation
- `extensions/README.md` - New extensions guide
- `README.md` - Project documentation

---

## Next Steps

### **Week 1: Setup**

- [ ] Review `.pi/extensions/` structure
- [ ] Create composed extension in `extensions/`
- [ ] Update justfile with new targets
- [ ] Write `.pi/extensions/EXTENSION-README.md`
- [ ] Update existing docs
- [ ] Test basic usage
- [ ] Document migration path

### **Week 2: Refinement**

- [ ] Fix duplicate tool issues
- [ ] Add extension lifecycle hooks
- [ ] Write unit tests for utilities
- [ ] Validate memory safety
- [ ] Document state diagrams
- [ ] Create troubleshooting guide

### **Week 3: Deployment**

- [ ] Deploy to production
- [ ] Update `extensions/README.md`
- [ ] Announce to team
- [ ] Monitor error rates
- [ ] Gather feedback
- [ ] Iterate based on issues

---

## Appendix

### **Tool Manifest**

**team.ts tools** (in `.pi/extensions/ui/agent-team.ts`):
- switch_team
- list_teams
- list_agents
- manage_team
- dispatch_agent
- list_active_team
- save_memory

**chain.ts tools** (in `.pi/extensions/ui/agent-chain.ts`):
- run_chain
- switch_chain
- chain-list

**Composed (merged):**
All above + deduplicated (in `extensions/` directory)

### **Memory Paths**

- User: ~/.pi/agent-memory/{agent}/
- Project: .pi/agent-memory/{agent}/
- Local: .pi/agent-memory-local/{agent}/

### **Hook Lifecycle**

1. Extension load
2. session_start
3. before_agent_start
4. Agent responds
5. before_agent_start
6. Agent responds

**Each extension should register once per hook.**

### **Extension Loading Summary**

- **`.pi/extensions/`**: Loaded via justfile
  - theme-cycler.ts, themeMap.ts
  - agent-team.ts, agent-chain.ts
  - damage-control.ts
  - All utilities

- **`extensions/`**: For new development
  - Custom extensions
  - Theme extensions
  - New utilities

---

**End of Migration Guide**