# CLAUDE.md — Tourist Agent Workspace

## Vietnamese Explanation Rule

Luôn ưu tiên trả lời bằng tiếng Việt. Giải thích thuật ngữ tiếng Anh lần đầu xuất hiện.

## Workspace Context

Đây là workspace tích hợp **Japan Travel Planner** + **Travel Optimization Engine**.

- Working directory: `c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\`
- Planner artifacts: `planner/`
- Travel optimizer skills: `travel-optimizer/`

## Quy Tắc Làm Việc

- Tất cả file mới tạo đặt trong `tourist_agent/`, không lưu vào `training_AI/` hay `travel_optimization_agent/`
- Phase 5 HTML file đặt tại: `planner/japan-planner-phase5.html`
- Không commit/push/deploy trừ khi được approve riêng
- Không claim đã xong nếu chưa kiểm chứng bằng tool output hoặc file path

## Tích Hợp Hai Dự Án (Phương Án B)

Travel Optimizer được gọi từ Planner tại:
- **Phase 3** — Section 5/6: sinh prompt TO, nhận JSON, render bảng so sánh vé
- **Phase 4** — Section 7: gọi verification gate, nhận JSON, render checklist + deals
- **Phase 5** — Section 8: tổng hợp từ `_tripCtx` + `_flightResult` + `_vgResult`

Biến global chia sẻ giữa các section: `_tripCtx`, `_flightResult`, `_vgResult`

## Evidence And Scope

- Không claim đã xong nếu chưa kiểm chứng
- Phạm vi làm việc: `tourist_agent/` — không sửa file ngoài thư mục này
