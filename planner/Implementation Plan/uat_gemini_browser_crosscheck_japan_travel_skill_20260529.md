# UAT script: Gemini browser and cross-agent check for Japan travel reusable skill

## Objective

Verify that the Japan travel case has been packaged into reusable workflow assets:

- Sequential prompts for other agents.
- A repo-local Codex skill for prompt/UAT/README/GitHub shipping.
- A README section that accurately points to the new assets.
- A clear reuse message: replace travel inputs and rerun the same staged workflow.

## Gemini Browser Subagent Instructions

Role: Gemini browser UAT subagent.

Rules:

- Treat this as read-only UAT.
- Do not edit source files.
- Record exact target, timestamp, viewport, action, expected result, observed result, evidence, and status.
- Mark PASS only when the observed result can be checked by another agent.
- Mark BLOCKED when browser tooling, auth, network, or missing files prevent the check.

## Targets

Local repo path:

```text
c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI
```

Files:

- `README.md`
- `Implementation Plan/agent_prompts_japan_travel_tool_skill_ship_20260529.md`
- `Implementation Plan/uat_gemini_browser_crosscheck_japan_travel_skill_20260529.md`
- `C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\SKILL.md`
- `C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\references\sequential-agent-prompts.md`
- `C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\references\gemini-browser-uat-crosscheck.md`
- `C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\references\readme-github-shipping.md`

Optional browser-facing targets:

- `index.html`
- `ai_agent_preread_lms_20260529.html`
- Live LMS URL from README, if browser/network is available.

## Evidence Table

| ID | Time | Target | Viewport | Action | Expected | Observed | Evidence | Status |
|---|---|---|---|---|---|---|---|---|
| UAT-01 |  | README.md | n/a | Open/read README reusable workflow section | README names the skill, prompt artifact, UAT artifact, and reuse idea |  |  |  |
| UAT-02 |  | Global skill path | n/a | Inspect skill frontmatter and workflow | Skill has valid name/description and covers prompts, UAT, cross-check, README, GitHub ship |  |  |  |
| UAT-03 |  | references/sequential-agent-prompts.md | n/a | Inspect prompt template | Includes scope, prompt creation, skill build, UAT, cross-check, README/GitHub ship prompts |  |  |  |
| UAT-04 |  | Implementation Plan/agent_prompts_japan_travel_tool_skill_ship_20260529.md | n/a | Inspect concrete prompt file | Includes sequential prompts 0-6 with stop conditions and verification |  |  |  |
| UAT-05 |  | Implementation Plan/uat_gemini_browser_crosscheck_japan_travel_skill_20260529.md | n/a | Inspect this UAT script | Includes evidence table, PASS/FAIL/BLOCKED rules, and cross-agent verification |  |  |  |
| UAT-06 |  | index.html or live LMS | desktop | Open page if relevant | Page loads without obvious blank screen or broken primary content |  |  |  |
| UAT-07 |  | README links/paths | n/a | Cross-check every new README path | Every referenced local file exists |  |  |  |

## PASS / FAIL / BLOCKED Rules

- PASS: Expected result is observed and evidence is specific.
- FAIL: Expected result is not observed, a README claim is false, or a referenced file is missing.
- BLOCKED: Browser/tooling/auth/network prevents the check; record the blocker and any partial evidence.

## Cross-Agent Verification Prompt

```text
You are the independent cross-check agent.

Goal:
Verify the UAT evidence and README claims without relying on the UAT agent's conclusions.

Workspace:
c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI

Files:
- README.md
- Implementation Plan/agent_prompts_japan_travel_tool_skill_ship_20260529.md
- Implementation Plan/uat_gemini_browser_crosscheck_japan_travel_skill_20260529.md
- C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\SKILL.md
- C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\references\sequential-agent-prompts.md
- C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\references\gemini-browser-uat-crosscheck.md
- C:\Users\vu.hoang\.codex\skills\agent-artifact-shipper\references\readme-github-shipping.md

Tasks:
1. Confirm every file path exists.
2. Confirm README does not claim completed browser UAT unless UAT evidence rows are filled.
3. Confirm each PASS row has concrete observed evidence.
4. Confirm each BLOCKED row names the blocker.
5. Confirm skill validation passes or record the validation error.
6. Run `git status --short --branch` and list intended changes.

Output:
Report findings first, then verdict: PASS, FAIL, or BLOCKED.
```
