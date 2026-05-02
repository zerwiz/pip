# Handoff Protocol Documentation

## Overview
Agent handoffs are structured workflows for transferring tasks between PIP (Pi Agent Platform) specialists with verification gates.

**Current implemented handoff:**
- Developer → Reviewer (Code Review)

**Future expansion:** More handoffs may be added later (e.g., Planner → Developer, Scout → Planner).

---

## 1. Developer → Reviewer Handoff (Code Review)
Triggered by the Developer agent *only after writing/modifying code*.

### Developer Responsibilities (`.pi/agents/developer.md`)
1. **Execute & Validate**: Write code (`write` for new, `edit` for existing), validate syntax.
2. **Log to Review Queue**:
   - Create `.pi/build_logs/` if missing
   - Append to `.pi/build_logs/review_requests.md`:
     `REVIEW: [$(date -Iseconds)][${file_path}][${change_type}] - ${verification_needed}`
   - Use `bash` tool: `echo "REVIEW: [$(date -Iseconds)][${file_path}][${change_type}] - ${verification_needed}" >> .pi/build_logs/review_requests.md`
3. **Dispatch Reviewer**: Use `dispatch_agent` tool to send task to `reviewer` with change context.
4. **Await Confirmation**: Wait for `[REVIEW_COMPLETE]` signal from reviewer.
5. **Complete Task**: Only mark task done after reviewer confirms.

### Reviewer Responsibilities (`.pi/agents/reviewer.md`)
1. **Check Queue**: Verify pending requests in `.pi/build_logs/review_requests.md`.
2. **Audit Execution**: Run tests, scan for hardcoded paths, compliance failures, etc.
3. **Report Generation**: Save audit to `.pi/reviews/[FILE_OR_TASK_NAME]_audit.md`.
4. **Signal Completion**: Output `[REVIEW_COMPLETE]` to finalize handoff.

### Supporting Infrastructure
- Review queue: `.pi/build_logs/review_requests.md`
- Audit directory: `.pi/reviews/`
- Dispatch tool: `dispatch_agent` (registered in `.pi/extensions/ui/agent-team.ts`)

---

## 2. Future Handoff Candidates
- [ ] Planner → Developer (Implementation Handoff)
- [ ] Scout → Planner (Reconnaissance Handoff)
- [ ] Reviewer → Developer (Rework Handoff)

---

## 3. References
- Agent definitions: `.pi/agents/developer.md`, `.pi/agents/reviewer.md`
- Extension logic: `.pi/extensions/ui/agent-team.ts`
- Changelog: `CHANGELOG.md` (Unreleased → Added section)
