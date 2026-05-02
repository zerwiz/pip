---
name: execution-planner
description: TDD-first implementation plans with bite-sized task granularity.
---

# Execution Planner

## Setup

```bash
# No special setup. Relies on TDD principles and modular design.
```

## Implementation Plan

```bash
# Generate a TDD implementation plan for a new feature
llm "Create a TDD-first implementation plan for adding a 'forgot password' feature. Use bite-sized tasks (failing test -> minimal impl -> commit). Include exact file paths."
```

## Task Granularity

```bash
# Break down a complex task into minimal steps
llm "Break down the task 'Integrate Stripe payments' into steps no larger than 20 lines of code change each. Follow TDD methodology."
```

## Workflow

1. **Bite-sized Task Granularity** — Define the smallest possible step that can be verified with a test.
2. **TDD Cycle** — Follow the "failing test → minimal implementation → commit" cycle for each task.
3. **Implementation Plan** — Always start with a formal "Implementation Plan" header and list exact file paths.
4. **Validation** — Ensure each step is verified before moving to the next.

## Notes

- Keep commits small and focused.
- Every task must start with a failing test.
- Use exact file paths to avoid ambiguity.
