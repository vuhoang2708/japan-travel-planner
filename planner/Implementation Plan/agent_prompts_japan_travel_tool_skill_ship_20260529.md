# Agent prompts: Japan travel case -> reusable tool/skill ship

Use these prompts sequentially. Each prompt is designed for a different agent so the workflow can be executed, tested, cross-checked, documented, and shipped without relying on chat history.

## Prompt 0 - Scope freeze and source audit

```text
You are the scope-freeze agent.

Goal:
Confirm the reusable workflow behind the Japan travel AI Agent case before any implementation work.

Workspace:
c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI

Source files:
- Implementation Plan/japan_travel_infographic_ppt_content_20260529.md
- Implementation Plan/japan_travel_vibe_coding_agent_prompt_20260529.md
- Implementation Plan/survey_training_alignment_20260529.md
- README.md

Tasks:
1. Read the source files directly from disk.
2. Identify the one-time teaching artifact and the reusable workflow.
3. Extract the reusable inputs: destination, travelers, dates, duration, budget, interests, constraints, output format, verification level, approval rules.
4. Extract repeatable outputs: clarified prompt, itinerary draft, budget table, verification checklist, family/share message, infographic/PPT content, tool/skill instructions.
5. Propose the exact files to create or update.

Output:
Write a concise scope note with:
- Reusable workflow name.
- Source evidence used.
- Proposed file list.
- Risk list.
- Recommended next prompt.

Stop condition:
Do not edit files. If any source file is missing, report BLOCKED with the missing path.
```

## Prompt 1 - Create reusable tool/skill specification

```text
You are the reusable-tool specification agent.

Goal:
Turn the Japan travel case into a reusable tool/skill specification for future travel-planning or training examples.

Workspace:
c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI

Inputs:
- Scope note from Prompt 0.
- Implementation Plan/japan_travel_infographic_ppt_content_20260529.md
- Implementation Plan/japan_travel_vibe_coding_agent_prompt_20260529.md

Tasks:
1. Define the tool/skill purpose in one paragraph.
2. Define input schema in human-readable form.
3. Define process stages:
   - Clarify requirements.
   - Build clean prompt.
   - Draft itinerary.
   - Estimate budget.
   - Verify facts and assumptions.
   - Prepare presentation or family-facing output.
   - Require human approval before any paid booking.
4. Define output artifacts.
5. Define safety boundaries and verification gates.
6. Include one concrete example using the Japan family trip.

Output file:
Implementation Plan/japan_travel_reusable_tool_skill_spec_20260529.md

Verification:
- Confirm the file exists.
- Confirm it has sections for inputs, process, outputs, safety, and reuse.
- Confirm it explicitly says the workflow can be reused by replacing the input fields.

Stop condition:
If the source case does not contain enough detail for a section, mark it as ASSUMPTION instead of inventing facts.
```

## Prompt 2 - Build the repo-local Codex skill

```text
You are the skill-building agent.

Goal:
Create or update a global Codex skill that packages the repeatable workflow: sequential prompts, Gemini browser UAT, cross-agent verification, README update, and GitHub shipping.

Workspace:
c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI

Desired skill name:
agent-artifact-shipper

Global skill path:
C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper

Inputs:
- Implementation Plan/agent_prompts_japan_travel_tool_skill_ship_20260529.md
- Implementation Plan/japan_travel_reusable_tool_skill_spec_20260529.md, if it exists

Tasks:
1. Create or update `C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\SKILL.md`.
2. Add concise reference templates under `C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\references\`.
3. Make the skill trigger for:
   - Creating sequential prompts for other agents.
   - Writing Gemini browser UAT scripts.
   - Cross-checking UAT evidence with another agent.
   - Updating README.
   - Committing and pushing intended files to GitHub.
4. Keep the skill reusable beyond this Japan travel case.

Verification:
- Run `python C:\Users\vu.hoang\.codex\skills\.system\skill-creator\scripts\quick_validate.py C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper`.
- Confirm validation passes.

Stop condition:
If validation fails, fix the skill before reporting done.
```

## Prompt 3 - Write Gemini browser UAT script

```text
You are the Gemini browser UAT planning agent.

Goal:
Write a browser-UAT script that a Gemini browser subagent can execute and another agent can audit.

Workspace:
c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI

Targets:
- README.md
- C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\SKILL.md
- Implementation Plan/agent_prompts_japan_travel_tool_skill_ship_20260529.md
- Implementation Plan/japan_travel_infographic_ppt_content_20260529.md

Tasks:
1. Define UAT objectives.
2. Define test environment and expected read-only behavior.
3. Create test cases for:
   - File existence.
   - README references.
   - Skill trigger clarity.
   - Prompt sequence completeness.
   - Reuse message: replacing inputs should regenerate the workflow.
   - Browser opening/rendering of any HTML or live URL if relevant.
4. Define the evidence table format.
5. Define PASS/FAIL/BLOCKED rules.
6. Define how a second agent should cross-check the UAT evidence.

Output file:
Implementation Plan/uat_gemini_browser_crosscheck_japan_travel_skill_20260529.md

Verification:
- Confirm the UAT file exists.
- Confirm it includes an evidence table and cross-agent verification section.

Stop condition:
Do not perform the browser UAT yourself unless explicitly assigned as the Gemini browser subagent.
```

## Prompt 4 - Execute Gemini browser UAT

```text
You are the Gemini browser UAT subagent.

Goal:
Execute the UAT script and record concrete evidence.

Workspace:
c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI

UAT script:
Implementation Plan/uat_gemini_browser_crosscheck_japan_travel_skill_20260529.md

Tasks:
1. Open the relevant local files or live URLs listed in the UAT script.
2. Record timestamp, target, viewport, action, expected result, observed result, evidence, and status for each test.
3. Mark a test PASS only when the observed result is specific enough for another agent to verify.
4. Mark BLOCKED for authentication, missing files, inaccessible URLs, or browser tooling limits.
5. Do not edit source files.

Output:
Append evidence to:
Implementation Plan/uat_gemini_browser_crosscheck_japan_travel_skill_20260529.md

Stop condition:
If browser tooling is unavailable, report BLOCKED and record which non-browser checks were still possible.
```

## Prompt 5 - Independent cross-check

```text
You are the independent verification agent.

Goal:
Cross-check the prompts, UAT evidence, README claims, and git status before shipping.

Workspace:
c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI

Files to inspect:
- README.md
- C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\SKILL.md
- C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\references\sequential-agent-prompts.md
- C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\references\gemini-browser-uat-crosscheck.md
- C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\references\readme-github-shipping.md
- Implementation Plan/agent_prompts_japan_travel_tool_skill_ship_20260529.md
- Implementation Plan/uat_gemini_browser_crosscheck_japan_travel_skill_20260529.md

Tasks:
1. Read the files from disk.
2. Check whether README claims match actual paths.
3. Check whether the skill description is broad enough but not misleading.
4. Check whether each sequential prompt has role, goal, inputs, tasks, output, verification, and stop condition.
5. Check whether the UAT evidence format is auditable.
6. Run `git status --short --branch`.
7. List only the files that are safe to commit.

Output:
Write a short verification note with:
- Verdict: PASS, FAIL, or BLOCKED.
- Findings first.
- Files safe to commit.
- Any files to leave uncommitted.

Stop condition:
If README claims a pushed commit or completed browser UAT without evidence, mark FAIL.
```

## Prompt 6 - README update and GitHub ship

```text
You are the repo shipping agent.

Goal:
Update README, commit the intended workflow/skill files, and push the active branch to GitHub.

Workspace:
c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI

Preconditions:
- Prompt 5 cross-check verdict is PASS or only has non-blocking notes.

Tasks:
1. Update README with:
   - Skill name: `agent-artifact-shipper`.
   - Skill path.
   - Prompt artifact path.
   - UAT artifact path.
   - Reuse explanation for packaging a one-time case into a reusable tool/skill.
2. Run `git status --short --branch`.
3. Review diffs for intended files only.
4. Stage only approved files.
5. Commit with message: `Add reusable agent artifact shipping skill`.
6. Push the active branch to origin.

Final report:
- README section added.
- Commit SHA.
- Branch pushed.
- Files included.
- Files left uncommitted, if any.

Stop condition:
If unrelated local changes appear, do not stage them. Report them separately.
```
