# Implementation Plan: Missing Features in `agent-team.ts`

## Context
- **Target file**: `/home/zerwiz/pip/.pi/extensions/ui/agent-team.ts` (1516 lines)
- **Reference**: `/home/zerwiz/pip/ref/piwithstuff-main/extensions/agent-team.ts` (1569 lines)
- **Directory structure**: Extension lives in `.pi/extensions/ui/`, imports from `../util/` and `./themeMap.ts`

---

## Phase 1: Remove Duplicate State Declarations

**Problem**: Lines 85-97 export module-level state variables that shadow the closure-scoped variables inside `export default function(pi)`. This causes the plan mode tools to manipulate the wrong state.

**Action**: Delete lines 85-97:
```typescript
// ── Shared State ────────────────────────────────
export const agentStates: Map<string, AgentState> = new Map();
export let allAgentDefs: AgentDef[] = [];
export let teams: Record<string, string[]> = {};
export let activeTeamName = "";
export let activeMemoryKey = "";

// ── Plan Mode State ─────────────────────────────
export let isPlanModeActive = false;
export let planStatus: 'idle' | 'scouting' | 'planning' | 'reviewing' | 'awaiting_approval' | 'approved' = 'idle';
export let currentPlanPath: string | null = null;
```

**Why**: All state must live inside the closure (lines ~442+) where `loadAgents`, `activateTeam`, etc. operate on the same variables.

---

## Phase 2: Add Plan Mode State (inside closure)

**Location**: After line ~446 (after `let globalInterval`), before `function loadAgents`

**Add**:
```typescript
  // ── Plan Mode State ─────────────────────────────
  let isPlanModeActive = false;
  let planStatus: 'idle' | 'scouting' | 'planning' | 'reviewing' | 'awaiting_approval' | 'approved' = 'idle';
  let currentPlanPath: string | null = null;
  const IMPLEMENTATION_TOOLS = ["write", "edit", "replace", "bash"];
```

---

## Phase 3: Add Plan Mode Safety Gate

**Location**: Before tool registrations (~line 890), after `updateWidget()` function

**Add**:
```typescript
  // ── Safety Gates ─────────────────────────────

  pi.on("tool_call", async (event, _ctx) => {
    if (isPlanModeActive && planStatus !== "approved" && IMPLEMENTATION_TOOLS.includes(event.toolName)) {
      return {
        block: true,
        reason: `PLAN MODE GATED: Implementation tools are locked until the plan is approved. Current status: ${planStatus.toUpperCase()}. Please use 'approve_plan' or finish the planning workflow.`,
      };
    }
    return { block: false };
  });
```

---

## Phase 4: Add Plan Mode Tools

**Location**: After `save_memory` tool registration, before `// ── Commands ───` section

### 4a. `enter_plan_mode` Tool

```typescript
  pi.registerTool({
    name: "enter_plan_mode",
    label: "Enter Plan Mode",
    description: "Initialize a high-integrity planning workflow for a specific task.",
    parameters: Type.Object({
      task: Type.String({ description: "The architecture/feature task to plan." }),
    }),
    async execute(_id, params, signal, upd, ctx) {
      const { task } = params as { task: string };
      isPlanModeActive = true;
      planStatus = "scouting";
      updateWidget();

      try {
        // Phase 1: Scout
        if (upd) upd({ content: [{ type: "text", text: "Starting Scout Phase..." }] });
        await dispatchAgent("scout", `Perform a deep reconnaissance of the codebase related to: ${task}`, ctx, signal);
        
        // Phase 2: Planner
        planStatus = "planning";
        updateWidget();
        if (upd) upd({ content: [{ type: "text", text: "Starting Planning Phase..." }] });
        const planResult = await dispatchAgent("planner", `Generate a detailed implementation plan for: ${task}. Save it to .pi/planning/`, ctx, signal);
        
        // Extract plan path from output if possible (heuristic)
        const pathMatch = planResult.output.match(/\.pi\/planning\/[^\s]+\.md/);
        if (pathMatch) currentPlanPath = pathMatch[0];

        // Phase 3: Reviewer
        planStatus = "reviewing";
        updateWidget();
        if (upd) upd({ content: [{ type: "text", text: "Starting Review Phase..." }] });
        await dispatchAgent("plan-reviewer", `Critically review the latest plan in .pi/planning/.`, ctx, signal);

        planStatus = "awaiting_approval";
        updateWidget();

        return {
          content: [{ type: "text", text: `### Planning Complete\nPlan: ${currentPlanPath || "check .pi/planning/"}\nStatus: Awaiting Approval\n\nUse the **approve_plan** tool to proceed.` }],
        };
      } catch (err) {
        planStatus = "idle";
        isPlanModeActive = false;
        updateWidget();
        return { content: [{ type: "text", text: `Planning failed: ${err}` }] };
      }
    },
  });
```

### 4b. `approve_plan` Tool

```typescript
  pi.registerTool({
    name: "approve_plan",
    label: "Approve Plan",
    description: "Approve the generated plan and unlock implementation agents.",
    parameters: Type.Object({}),
    async execute(_id, _params, _sig, _upd, _ctx) {
      if (!isPlanModeActive) return { content: [{ type: "text", text: "Not in plan mode." }] };
      planStatus = "approved";
      updateWidget();
      return { content: [{ type: "text", text: "Plan approved. Implementation agents unlocked." }] };
    },
  });
```

### 4c. `exit_plan_mode` Tool

```typescript
  pi.registerTool({
    name: "exit_plan_mode",
    label: "Exit Plan Mode",
    description: "Restore regular operation.",
    parameters: Type.Object({}),
    async execute(_id, _params, _sig, _upd, _ctx) {
      isPlanModeActive = false;
      planStatus = "idle";
      currentPlanPath = null;
      updateWidget();
      return { content: [{ type: "text", text: "Exited plan mode." }] };
    },
  });
```

---

## Phase 5: Add Plan Mode Banner to Widget

**Location**: Inside `updateWidget()` → `render()` function, before "Team Dashboard Header"

**Find** (around line 693):
```typescript
          // Team Dashboard Header (standalone - no branch)
```

**Replace with**:
```typescript
          // Plan Mode Banner
          if (isPlanModeActive) {
            const planIcon = planStatus === "approved" ? "✅" : "🧠";
            const banner = theme.fg("accent", theme.bold(`[ PLAN MODE : ${planStatus.toUpperCase()} ]`));
            const planFile = currentPlanPath ? theme.fg("dim", ` (${path.basename(currentPlanPath)})`) : "";
            lines.push(truncateToWidth(`${planIcon} ${banner}${planFile}`, safeWidth));
            lines.push(theme.fg("dim", "─".repeat(safeWidth)));
          }

          // Team Dashboard Header (standalone - no branch)
```

**Also update** the orchestrator header line to show context-aware title:
```typescript
// Find:
`Team Orchestrator: ${activeTeamName}`

// Replace with:
isPlanModeActive ? "Architecture & Planning" : `Team Orchestrator: ${activeTeamName}`
```

**Note**: Need to add `import * as path from "path";` if not present (already exists at line 40).

---

## Phase 6: Add `list_team_agents` Tool

**Location**: After `list_agents` tool, before `save_memory` tool

```typescript
  pi.registerTool({
    name: "list_team_agents",
    label: "List Team Agents",
    description: "List all agents in the active team with their tools.",
    parameters: Type.Object({}),
    async execute(_id, _params, _sig, _upd, _ctx) {
      const members = Array.from(agentStates.values())
        .map((s) => {
          const model = s.def.model ? ` (${s.def.model})` : "";
          return `### ${s.def.name}${model}\n- **Tools:** ${s.def.tools}\n- **Status:** ${s.status}`;
        })
        .join("\n\n");

      let yamlInfo = "";
      const teamsPath = join(ctx.cwd, ".pi", "agents", "teams.yaml");
      const agentsPath = join(ctx.cwd, ".pi", "agents", "agents.yaml");
      const teamsContent = safeReadFile(teamsPath);
      const agentsContent = safeReadFile(agentsPath);

      if (teamsContent || agentsContent) {
        yamlInfo = "\n\n---\n### Teams & Agents YAML\n";
        if (teamsContent)
          yamlInfo += `\n**teams.yaml:**\n\`\`\`yaml\n${teamsContent}\n\`\`\``;
        if (agentsContent)
          yamlInfo += `\n**agents.yaml:**\n\`\`\`yaml\n${agentsContent}\n\`\`\``;
      }

      return {
        content: [
          {
            type: "text",
            text: `### Active Team: ${activeTeamName}\n\n${members || "No agents loaded."}${yamlInfo}`,
          },
        ],
      };
    },
    renderCall: (_args, theme) =>
      new Text(
        theme.fg("toolTitle", theme.bold("list_team_agents")) +
          theme.fg("dim", " (show active team)"),
        0,
        0,
      ),
  });
```

---

## Phase 7: Add Commands

**Location**: In `// ── Commands ───` section, after existing commands

### 7a. `list-teams` Command

```typescript
  pi.registerCommand("list-teams", {
    description: "List all available teams",
    handler: async (_args, ctx) => {
      const result = await pi.dispatchTool("list_teams", {});
      ctx.ui.notify(result.content[0].text, "info");
    },
  });
```

### 7b. `list-agents` Command

```typescript
  pi.registerCommand("list-agents", {
    description: "List all available agents",
    handler: async (_args, ctx) => {
      const result = await pi.dispatchTool("list_agents", {});
      ctx.ui.notify(result.content[0].text, "info");
    },
  });
```

### 7c. `list-active-team` Command

```typescript
  pi.registerCommand("list-active-team", {
    description: "List currently loaded agents",
    handler: async (_args, ctx) => {
      const result = await pi.dispatchTool("list_active_team", {});
      ctx.ui.notify(result.content[0].text, "info");
    },
  });
```

---

## Phase 8: Update `before_agent_start` System Prompt

**Location**: `pi.on("before_agent_start", ...)` block (~line 1420)

### 8a. Add missing directives

**Find**:
```
- If a task fails, try a different agent or adjust the task description
```
**Add** after existing rules:
```
- You can chain agents: use scout to explore, then builder to implement
- You can dispatch the same agent multiple times with different tasks
- Keep tasks focused — one clear objective per dispatch
```

### 8b. Add Teams List section

**Find** the `## Operational Directives` section

**Before it**, add:
```typescript
## Teams List
${teamsList}

```

### 8c. Update directive numbering and content

**Replace**:
```
1. Delegate specialist agent requests via \`dispatch_agent\`.
2. Use orchestrator tools like \`list_teams\`, \`list_agents\`, and \`list_active_team\` for team management.
3. Use \`save_memory\` to persist orchestrator's own knowledge and session notes.
```

**With**:
```
1. Delegate specialist agent requests via \`dispatch_agent\` (for code analysis, implementation, review, etc.).
2. Use orchestrator tools like \`list_teams\`, \`list_agents\`, and \`list_active_team\` for team management.
3. Use \`save_memory\` to persist orchestrator's own knowledge and session notes.
4. Use \`web_access\` for browsing the web and accessing current information when needed.
5. Ensure specialists have enough context to succeed.
6. Manage rosters via \`manage_team\` as needed.
```

---

## Phase 9: Fix `session_start` Tool Registration

**Location**: `pi.on("session_start", ...)` block (~line 1480)

### 9a. Change `setActiveTools` to `pi.setActiveTools`

**Find**:
```typescript
    setActiveTools([
```

**Replace with**:
```typescript
    pi.setActiveTools([
```

### 9b. Add `"web_access"` to active tools

**Find**:
```typescript
      "save_memory",
```

**Replace with**:
```typescript
      "save_memory",
      "web_access",
```

### 9c. Register plan mode tools as active

**Add** to the tools array:
```typescript
      "enter_plan_mode",
      "approve_plan",
      "exit_plan_mode",
      "list_team_agents",
```

---

## Phase 10: Verify Import Paths

**Current** (lines 27-28, 40, 42):
```typescript
import * as path from "path";
import { applyExtensionDefaults } from "../src/ui/themeMap";
```

**Verify** these resolve correctly in the new directory structure:
- `../util/memory-export` → `/home/zerwiz/pip/.pi/extensions/util/memory-export.ts`
- `../util/memory-tools` → `/home/zerwiz/pip/.pi/extensions/util/memory-tools.ts`
- `./themeMap.ts` → `/home/zerwiz/pip/.pi/extensions/ui/themeMap.ts`

**No changes needed** if files exist at these paths.

---

## Execution Order

1. **Phase 1** - Remove duplicate state (prerequisite for all other phases)
2. **Phase 2** - Add plan mode state variables
3. **Phase 5** - Add plan mode banner to widget
4. **Phase 3** - Add safety gate hook
5. **Phase 4** - Add plan mode tools
6. **Phase 6** - Add `list_team_agents` tool
7. **Phase 7** - Add commands
8. **Phase 8** - Update system prompt
9. **Phase 9** - Fix session_start tool registration
10. **Phase 10** - Verify imports (quick check)

---

## Testing Checklist

After implementation:
- [ ] `pi -e .pi/extensions/ui/agent-team.ts` loads without errors
- [ ] Widget shows agents loaded (not "No active specialists loaded.")
- [ ] `/list-teams`, `/list-agents`, `/list-active-team` commands work
- [ ] `list_team_agents` tool shows team + YAML content
- [ ] Plan mode banner appears when `enter_plan_mode` is called
- [ ] Safety gate blocks write/edit/replace/bash when plan not approved
- [ ] `approve_plan` unlocks implementation tools
- [ ] `exit_plan_mode` removes banner and resets state
- [ ] System prompt includes teams list and all 6 directives
- [ ] `web_access` tool is available in active tools
