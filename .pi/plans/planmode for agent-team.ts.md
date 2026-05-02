To add the "Plan Mode" behavior that matches your screenshot perfectly, you need to introduce a new tool (`propose_plan`), a state toggle (`isPlanMode`), and update the orchestrator's system prompt so the AI knows to ask for permission.

Here are the exact blocks of code to inject into your `.pi/extensions/ui/agent-team.ts` file:

### 1. Add the Plan Mode State Toggle
*Add this near the top of the extension block, right under `export default function (pi: ExtensionAPI) {` (around line 249):*
```typescript
  let isPlanMode = true; // Determines if the AI must propose a plan first
```

### 2. Inject the `propose_plan` Tool
*Add this tool registration right after the `save_memory` tool registration block (around line 655), just before `// ── Commands ─────────────────────────────────`:*
```typescript
  pi.registerTool({
    name: "propose_plan",
    label: "Propose Plan",
    description: "Present a formatted plan to the user and request their permission to proceed.",
    parameters: Type.Object({
      title: Type.String({ description: "Title of the plan" }),
      objective: Type.String({ description: "Objective description" }),
      context: Type.String({ description: "Key files and context" }),
      steps: Type.Array(Type.String(), { description: "Implementation steps" })
    }),
    async execute(_id, params, _sig, _upd, ctx) {
      const { title, objective, context, steps } = params as any;

      const planText = `### Plan: ${title}\n\n**Objective**\n${objective}\n\n**Key Files & Context**\n${context}\n\n**Implementation Steps**\n${steps.map((s: string, i: number) => ` ${i + 1}. ${s}`).join("\n")}`;

      ctx.ui.notify(planText, "info");

      const options = [
        "1. Yes, automatically accept edits",
        "2. Yes, manually accept edits",
        "3. Type your feedback..."
      ];

      const choice = await ctx.ui.select("Ready to start implementation?", options);

      if (choice === options[0]) {
        return { content: [{ type: "text", text: "User APPROVED the plan (Automatic mode). Proceed to dispatch agents immediately for all steps without further confirmation." }] };
      } else if (choice === options[1]) {
        return { content: [{ type: "text", text: "User APPROVED the plan (Manual mode). Proceed to dispatch agents, but explain what you are doing before each dispatch." }] };
      } else if (choice === options[2]) {
        // Fallback to text input prompt if user wants to provide feedback
        const feedback = ctx.ui.input ? await ctx.ui.input("Type your feedback:") : await ctx.ui.prompt("Type your feedback:");
        return { content: [{ type: "text", text: `User provided feedback instead of approving: "${feedback}". Please revise your plan.` }] };
      }

      return { content: [{ type: "text", text: "Plan cancelled by user." }] };
    },
    renderCall: (args, theme) => new Text(
      theme.fg("toolTitle", theme.bold("propose_plan ")) + theme.fg("accent", (args as any).title || "Generating plan..."),
      0, 0
    )
  });
```

### 3. Add the Command to Toggle Plan Mode
*Add this into the `// ── Commands ─────────────────────────────────` section (around line 695):*
```typescript
  pi.registerCommand("plan-mode", {
    description: "Toggle Plan Mode on or off.",
    handler: async (_args, ctx) => {
      isPlanMode = !isPlanMode;
      ctx.ui.notify(`Plan Mode is now ${isPlanMode ? "ON" : "OFF"}.`, "success");
    },
  });
```

### 4. Enable the tool in `session_start`
*Update your `pi.setActiveTools` array inside the `pi.on("session_start")` block (around line 777) to include `"propose_plan"`:*
```typescript
    pi.setActiveTools([
      "dispatch_agent",
      "propose_plan",  // <--- Add this line here
      "manage_team",
      "switch_team",
      "list_active_team",
      "list_teams",
      "list_agents",
      "save_memory",
      ...exportFormats,
    ]);
```

### 5. Instruct the AI in `before_agent_start`
*Modify the `pi.on("before_agent_start")` block (around line 742). Add the `planModeInstruction` variable and insert it into the returned `systemPrompt`:*

```typescript
  pi.on("before_agent_start", async (_event, _ctx) => {
    // ... existing code ...
    const fullCatalog = getAllAgentsCatalog(allAgentDefs);
    const teamsList = getTeamsCatalog(teams);

    // Add this directive check:
    const planModeInstruction = isPlanMode
      ? `\n## PLAN MODE IS ON\nYou MUST use the \`propose_plan\` tool to get user approval BEFORE using \`dispatch_agent\` to execute tasks.`
      : `\n## PLAN MODE IS OFF\nYou may use \`dispatch_agent\` directly without proposing a plan.`;

    return {
      systemPrompt: `You are a dispatcher agent. You coordinate specialist agents to accomplish tasks.
You do NOT have direct access to the codebase. You MUST delegate all work through
agents using the dispatch_agent tool.
${planModeInstruction}  // <--- Add the variable injection here

## Active Team: ${activeTeamName}
// ... (keep the rest of your system prompt exactly the same) ...
```

**How it works now:** You can run `/plan-mode` to toggle it. When it's on, the Dispatcher Agent is forced to use your new `propose_plan` tool first. This tool triggers the `ctx.ui.select` UI containing your exact options ("1. Yes, automatically accept edits", etc.). The AI receives your choice back as text and executes the dispatch based on whether you approved or asked for revisions.