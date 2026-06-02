# Tourist Agent Workspace

**Tạo ngày:** 2026-06-02  
**Workspace gốc:** `c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\`

---

## Live Demo

🌐 **User Guide:** https://touristagent.vercel.app/planner/user_guide_tourist_agent.html  
✈️ **Phase 5 (Final Plan):** https://touristagent.vercel.app/planner/tourist-agent-phase5.html
🧙 **Wizard Edition (v2):** https://touristagent.vercel.app/planner/tourist-agent-v2.html

---

## Mục Tiêu

Workspace tích hợp hai dự án AI Agent cho lĩnh vực du lịch:

1. **Tourist Agent** — 5-phase tool lập kế hoạch du lịch tự túc
2. **Travel Optimizer** — 8-skill engine tối ưu chi phí vé máy bay

Hai dự án kết hợp theo **Phương Án B** (xem integration report): Travel Optimizer được nhúng vào Phase 3/4 của Planner để cung cấp dữ liệu vé thực tế.

---

## Cấu Trúc

```
tourist_agent/
├── README.md                    ← file này
├── CLAUDE.md                    ← hướng dẫn cho AI agent làm việc trong workspace
│
├── planner/                     ← Tourist Agent (5 phases + v2)
│   ├── tourist_agent_prompt_assistant_phase1_20260529.html   [DONE]
│   ├── tourist-agent-phase2.html                             [DONE]
│   ├── tourist-agent-phase3.html                             [DONE]
│   ├── tourist-agent-phase4.html                             [DONE]
│   ├── tourist-agent-phase5.html                             [DONE]
│   ├── tourist-agent-v2.html                                 [DONE]
│   ├── user_guide_tourist_agent.html                         [DONE]
│   ├── tourist_agent_ai_agent_infographic_20260529.html      [DONE]
│   └── Implementation Plan/
│       ├── japan_travel_vibe_coding_agent_prompt_20260529.md
│       ├── plan_phase5_japan_planner_20260602.md
│       ├── brd_japan_travel_prompt_assistant_phase1_20260529.md
│       └── [các file UAT, technical note, agent prompt...]
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

| Component | Trạng thái | File |
|---|---|---|
| Phase 1: Prompt Assistant | ✅ Done | `planner/tourist_agent_prompt_assistant_phase1_20260529.html` |
| Phase 2: Lịch trình nháp | ✅ Done | `planner/tourist-agent-phase2.html` |
| Phase 3: So sánh vé | ✅ Done | `planner/tourist-agent-phase3.html` |
| Phase 4: Kiểm chứng | ✅ Done | `planner/tourist-agent-phase4.html` |
| Phase 5: Kế hoạch cuối | ✅ Done | `planner/tourist-agent-phase5.html` |
| Wizard Edition (v2) | ✅ Done | `planner/tourist-agent-v2.html` |
| Cẩm Nang Sử Dụng | ✅ Done | `planner/user_guide_tourist_agent.html` |
| Infographic | ✅ Done | `planner/tourist_agent_ai_agent_infographic_20260529.html` |
| Travel Optimizer | ✅ Copied | `travel-optimizer/` |
