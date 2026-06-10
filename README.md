# Tourist Agent Workspace

**Tạo ngày:** 2026-06-02  
**Cập nhật cuối:** 2026-06-10  
**Workspace gốc:** `c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\`

---

## Live Demo

🌐 **User Guide:** https://touristagent.vercel.app/planner/user_guide_tourist_agent.html  
✈️ **Wizard Edition (v2 — dành cho người dùng):** https://touristagent.vercel.app/planner/tourist-agent-v2.html  
🔬 **Phase 5 (Expert / Edu):** https://touristagent.vercel.app/planner/tourist-agent-phase5.html

---

## Mục Tiêu

Workspace tích hợp hai dự án AI Agent cho lĩnh vực du lịch:

1. **Tourist Agent** — bộ tool lập kế hoạch du lịch tự túc, có 2 phiên bản:
   - **Expert Edition** (5 file riêng, Phase 1–5) — dành cho lớp học AI, giữ nguyên thuật ngữ kỹ thuật
   - **Wizard Edition v2** (1 file duy nhất, 4 bước) — dành cho người dùng phổ thông, ẩn hoàn toàn prompt và JSON
2. **Travel Optimizer** — 8-skill engine tối ưu chi phí vé máy bay

Hai dự án kết hợp theo **Phương Án B**: Travel Optimizer nhúng vào Phase 3/4 của Planner để cung cấp dữ liệu vé thực tế.

---

## Changelog

### v2.1 — 2026-06-10
- Fix: xóa Google Fonts CDN (fonts.googleapis.com) khỏi `tourist-agent-v2.html` → file hoàn toàn offline, không phụ thuộc internet
- Cập nhật `font-family` sang system fonts: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### v2.0 — 2026-06-02 (commit `ce60fa5`, `c522242`)
- Rebranding toàn bộ "Japan Travel Planner" → "Tourist Agent" (tên file, `<title>`, `<h1>`, href, README, CLAUDE.md)
- Đổi tên 8 file HTML bằng `git mv` để giữ git history
- Thêm `tourist-agent-v2.html` — Wizard Edition 4 bước, offline-first, tiếng Việt có dấu đầy đủ
- Branch `edu-version` backup bản gốc 5 phase cho lớp AI
- Refactor UX Phase 2: tách `generate()` thành `generateQuestions()` + `generatePlan()` để tránh hiện lịch trình trước khi user trả lời câu hỏi làm rõ

### v1.0 — 2026-06-02 (commit `b40f7af`)
- Build Phase 5 (`tourist-agent-phase5.html`) — 3 tab: Lịch trình cuối / Email-Zalo / Todo List
- Tạo `user_guide_tourist_agent.html` — cẩm nang 5 accordion phase + bảng 8 Travel Optimizer skills
- Deploy Vercel, thêm `vercel.json` redirect về User Guide
- Tích hợp Travel Optimizer Engine (`travel-optimizer/`)

---

## Cấu Trúc

```
tourist_agent/
├── README.md                    ← file này
├── CLAUDE.md                    ← hướng dẫn cho AI agent làm việc trong workspace
├── index.html                   ← redirect về user_guide_tourist_agent.html
├── vercel.json                  ← Vercel rewrite rule
│
├── planner/                     ← Tourist Agent (Expert Edition + Wizard v2)
│   │
│   ├── [WIZARD — người dùng phổ thông]
│   ├── tourist-agent-v2.html                                 ✅ v2.1 (offline-fixed)
│   ├── user_guide_tourist_agent.html                         ✅ Done
│   │
│   ├── [EXPERT EDITION — 5 phase riêng, dùng cho lớp AI]
│   ├── tourist_agent_prompt_assistant_phase1_20260529.html   ✅ Done
│   ├── tourist-agent-phase2.html                             ✅ Done (refactored UX)
│   ├── tourist-agent-phase3.html                             ✅ Done
│   ├── tourist-agent-phase4.html                             ✅ Done
│   ├── tourist-agent-phase5.html                             ✅ Done
│   │
│   ├── tourist_agent_ai_agent_infographic_20260529.html      ✅ Done
│   │
│   └── Implementation Plan/
│       ├── implementation_plan_20260602_BuildPhase5.md
│       ├── implementation_plan_20260602_UserGuide.md
│       ├── implementation_plan_20260602_DeployVercel.md
│       ├── implementation_plan_20260602_RefactorUX.md
│       ├── implementation_plan_20260602_PlannerV2.md
│       ├── implementation_plan_20260602_RenameToTouristAgent.md
│       └── [các file UAT, BRD, technical note từ phase 1 (2026-05-29)...]
│
└── travel-optimizer/            ← Travel Optimization Engine (8 skills)
    ├── SKILL.md                 ← orchestrator chính, đọc trước
    ├── README.md
    ├── skills/
    │   ├── date-optimization/
    │   ├── flight-search/
    │   ├── fee-analysis/
    │   ├── route-optimization/
    │   ├── deals-verification/
    │   ├── flexibility-analysis/
    │   ├── negotiation-email/
    │   └── hidden-city-strategy/
    ├── scripts/                 ← Kiwi + Amadeus API clients
    ├── references/              ← API docs, airport codes, glossary
    ├── assets/                  ← flow diagram, report template
    └── examples/                ← mẫu báo cáo HAN-SFO
```

---

## Trạng Thái Hiện Tại

| Component | Trạng thái | File | Ghi chú |
|---|---|---|---|
| Wizard Edition v2 | ✅ v2.1 | `planner/tourist-agent-v2.html` | Offline-fixed, system fonts |
| User Guide | ✅ Done | `planner/user_guide_tourist_agent.html` | |
| Phase 1: Prompt Assistant | ✅ Done | `planner/tourist_agent_prompt_assistant_phase1_20260529.html` | |
| Phase 2: Lịch trình nháp | ✅ Done | `planner/tourist-agent-phase2.html` | Refactored UX 2 bước |
| Phase 3: So sánh vé | ✅ Done | `planner/tourist-agent-phase3.html` | |
| Phase 4: Kiểm chứng | ✅ Done | `planner/tourist-agent-phase4.html` | |
| Phase 5: Kế hoạch cuối | ✅ Done | `planner/tourist-agent-phase5.html` | |
| Infographic | ✅ Done | `planner/tourist_agent_ai_agent_infographic_20260529.html` | |
| Travel Optimizer | ✅ Copied | `travel-optimizer/` | 8 skills |

---

## Git Branches

| Branch | Mục đích |
|---|---|
| `master` | Phiên bản production, deploy lên Vercel |
| `edu-version` | Backup bản gốc 5 phase (tên file cũ, có "Japan") — dùng cho lớp học AI |

---

## Pending

- [ ] Đổi tên GitHub repo từ `japan-travel-planner` → `tourist-agent` (thực hiện trên GitHub web UI hoặc `gh api`)
- [ ] Update remote URL sau khi đổi tên repo: `git remote set-url origin https://github.com/vuhoang2708/tourist-agent.git`
- [ ] Push 2 commits chưa push lên GitHub (branch hiện tại ahead by 2)
