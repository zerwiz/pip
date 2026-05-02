# Plan Mode Feature

## Overview

**Plan Mode** is a behavior toggle for the Agent Team system that forces the Dispatcher Agent to propose a plan and get user approval before executing any work via `dispatch_agent`.

**Target File:** `.pi/extensions/ui/agent-team.ts`

---

## Components

### 1. State Toggle: `isPlanMode`

- **Type:** `boolean` (default: `true`)
- **Location:** Top of the extension block, under `export default function (pi: ExtensionAPI) {`
- **Purpose:** Controls whether the AI must propose a plan before dispatching agents.

### 2. Tool: `propose_plan`

- **Registered via:** `pi.registerTool()`
- **Location:** After the `save_memory` tool registration, before the `// ── Commands ──` section
- **Parameters:**
  - `title` (string) - Title of the plan
  - `objective` (string) - Objective description
  - `context` (string) - Key files and context
  - `steps` (array of strings) - Implementation steps
- **Behavior:**
  1. Displays the plan via `ctx.ui.notify()`
  2. Presents a selection prompt with three options:
     - `"1. Yes, automatically accept edits"`
     - `"2. Yes, manually accept edits"`
     - `"3. Type your feedback..."`
  3. Returns feedback to the AI based on user choice:
     - **Auto approve:** AI proceeds to dispatch all steps without further confirmation
     - **Manual approve:** AI dispatches agents but explains each step before dispatching
     - **Feedback:** AI receives the user's feedback text and must revise the plan
     - **Cancel:** Returns "Plan cancelled by user."
- **UI Rendering:** Uses `renderCall` to display the tool invocation with the plan title in the UI theme.

### 3. Command: `/plan-mode`

- **Registered via:** `pi.registerCommand("plan-mode", ...)`
- **Location:** Inside the `// ── Commands ──` section
- **Behavior:** Toggles `isPlanMode` on/off and notifies the user of the new state via `ctx.ui.notify()`.

### 4. Tool Activation: `session_start`

- **Location:** Inside `pi.on("session_start")` block
- **Change:** Add `"propose_plan"` to the `pi.setActiveTools([...])` array so the tool is available during the session.

### 5. System Prompt Injection: `before_agent_start`

- **Location:** Inside `pi.on("before_agent_start")` block
- **Change:** Dynamically inject a `planModeInstruction` string into the system prompt based on the `isPlanMode` state:
  - **ON:** `"You MUST use the propose_plan tool to get user approval BEFORE using dispatch_agent to execute tasks."`
  - **OFF:** `"You may use dispatch_agent directly without proposing a plan."`

---

## Data Flow

```
User Request
    ↓
Dispatcher Agent (before_agent_start)
    ↓
[Plan Mode ON?] ──No──→ dispatch_agent directly
    ↓ Yes
propose_plan tool
    ↓
ctx.ui.notify(plan) + ctx.ui.select(options)
    ↓
User selects option
    ↓
Tool returns text response to AI
    ↓
AI acts based on response:
  - "APPROVED (Automatic)" → dispatch_agent for all steps
  - "APPROVED (Manual)"    → dispatch_agent with explanations
  - "Feedback: ..."        → revise plan
  - "Cancelled"            → stop
```

---

## User Interaction Options

When the `propose_plan` tool is invoked, the user sees:

1. **"1. Yes, automatically accept edits"** - Full trust mode. AI executes all dispatched agents without asking again.
2. **"2. Yes, manually accept edits"** - Supervised mode. AI explains each dispatch before executing.
3. **"3. Type your feedback..."** - Opens a text input for the user to provide revision notes. The AI must revise and re-propose.

---

## Toggle Usage

Run `/plan-mode` in the session to toggle. A notification confirms the new state:
- `"Plan Mode is now ON."`
- `"Plan Mode is now OFF."`
