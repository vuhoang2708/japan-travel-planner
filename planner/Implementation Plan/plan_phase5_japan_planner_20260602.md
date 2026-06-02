# Plan & Hướng Dẫn: Japan Travel Planner Phase 5
# Dành cho Agent Thực Hiện

**Ngày:** 2026-06-02  
**Người giao:** Vu Hoang  
**Người kiểm tra:** Claude (conversation hiện tại)  
**Ưu tiên:** Cao — hoàn thiện bộ 5 phase trước lab

---

## 1. Bối Cảnh Nhanh

Bộ tool đang có 4 phase đã build:

| File | Phase | Nội dung |
|---|---|---|
| `japan_travel_prompt_assistant_phase1_20260529.html` | 1 | Prompt assistant (đã ship) |
| `japan-planner-phase2.html` | 2 | Itinerary generator |
| `japan-planner-phase3.html` | 3 | Comparison table + Travel Optimizer handoff |
| `japan-planner-phase4.html` | 4 | Verification gate (checklist + deals) |

**Phase 5 là bước cuối:** xuất 3 artifact — lịch trình cuối, email/Zalo message, todo list — sau khi user đã qua Phase 4 và chọn phương án.

---

## 2. Yêu Cầu Phase 5 (Đọc Kỹ Trước Khi Làm)

### 2.1 File cần tạo

```
c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI\japan-planner-phase5.html
```

### 2.2 Kế thừa từ Phase 4

**Đọc file Phase 4** tại `japan-planner-phase4.html` (313 dòng) để hiểu:
- Toàn bộ CSS variables (`--navy`, `--orange`, `--green`, v.v.)
- Cấu trúc form 8 field (destination, travelers, month, days, budget, pace, interests, constraints)
- Logic JavaScript: `parseDays()`, `parseAdults()`, `parseBudgetMax()`, `buildRows()`, `renderItinTable()`, `buildTOPrompt()`, `buildVGPrompt()`
- Biến global: `_tripCtx`, `_flightResult`
- Cấu trúc output block (`.output-block` + `.output-block-header` + `.output-block-body`)

**Copy nguyên xi** toàn bộ Phase 4 làm nền, sau đó:
- Đổi `<title>` thành `Japan Travel Planner – Phase 5`
- Đổi `.phase-badge` text thành `Phase 5 · Final Plan`
- Đổi màu `.phase-badge` thành `#059669` (emerald green)
- Cập nhật `.header p` mô tả Phase 5
- Thêm Section 8 bên dưới Section 7

### 2.3 Section 8 — Final Plan Export

Section 8 chỉ hiển thị khi Section 7 đã có `_vgResult` hợp lệ (tương tự cách Section 7 chỉ hiện sau khi có `_flightResult`).

**Header của output block:**
```
🎯 Bước 8 — Kế hoạch cuối + Email + Todo List
```

**Nội dung Section 8 gồm 3 tab:**

```
[Lịch trình cuối]  [Email / Zalo]  [Todo List]
```

Dùng 3 nút toggle (không phải HTML `<tab>`) — nhấn nút nào thì hiện div tương ứng, ẩn 2 div kia. Default hiện Tab 1.

---

### 2.4 Tab 1 — Lịch Trình Cuối

**Header:** `📅 Lịch trình cuối — [destination], [days], [travelers]`

Nút copy ở góc phải header.

**Nội dung:**

Bảng 2 cột (ngày + khu vực) bên trên, sau đó expand từng ngày bằng `<details>/<summary>` (giống checklist Phase 4 nhưng khác nội dung):

```
Ngày 1 — Tokyo – Shinjuku
  Sáng:   ...
  Chiều:  ...
  Tối:    ...
  Ăn uống: [gợi ý quán từ interests]
  Di chuyển: [phương tiện ước tính]
  Ngân sách ước tính: ~X triệu/người *
```

**Logic sinh nội dung:**
- Lấy dữ liệu từ `_tripCtx` (interests, constraints, pace, days)
- Nếu có `_flightResult`: hiển thị vé khuyến nghị (hãng, ngày bay, giá thực) ở đầu bảng dưới dạng "summary card"
- Nếu có `_vgResult`: với mỗi ngày, gắn nhãn status từ checklist Phase 4 (confirmed ✅ / assumption 🔶 / needs_verification ❌) vào cột "Trạng thái kiểm chứng"

**Ràng buộc:**
- Không ghi giá cụ thể — chỉ dải ước tính kèm `*`
- Không ghi giờ mở cửa cụ thể
- Cuối bảng: `div.itin-note` nhắc nhở đây là ước tính

---

### 2.5 Tab 2 — Email / Zalo Message

**Header:** `📨 Email / Zalo Message — sẵn sàng copy gửi gia đình`

Nút copy ở góc phải.

**Nội dung:** Một `<div class="prompt-box">` (monospace, pre-wrap) chứa message mẫu được sinh động từ form input:

```
Xin chào mọi người!

Mình đã lên kế hoạch sơ bộ cho chuyến đi [destination] của cả nhà.
Thời gian: [month], [days] ngày
Nhóm đi: [travelers]
Ngân sách dự kiến: [budget]/người

LỊCH TRÌNH TÓM TẮT:
• Ngày 1: [region 1] — [hoạt động chính]
• Ngày 2: [region 2] — [hoạt động chính]
...
• Ngày N: [region N] — [hoạt động chính]

VÉ MÁY BAY: [nếu có _flightResult: "Phương án tốt nhất: [hãng], [giá thực/người]" / nếu không: "Cần kiểm tra — xem bảng so sánh đính kèm"]

VIỆC CẦN LÀM TRƯỚC KHI ĐẶT:
1. Kiểm tra giá vé trên Google Flights / Skyscanner
2. Đặt khách sạn sớm ([month] là mùa cao điểm)
3. Kiểm tra visa Nhật Bản cho công dân Việt Nam
4. Xác nhận giờ mở cửa các điểm tham quan

*Lịch trình và giá ước tính, chưa kiểm chứng thực tế. Mọi người đọc qua và góp ý nhé!

[Tên người gửi]
```

**Biến động:** Nếu `_vgResult` có deals, thêm:
```
DEALS ĐANG CÓ:
• [deal 1] — giảm [X VND], hết [ngày]
```

---

### 2.6 Tab 3 — Todo List

**Header:** `✅ Todo List — việc người thật cần làm tiếp`

Nút copy ở góc phải.

**Nội dung:** List có thể tick (checkbox HTML), chia 3 nhóm:

**Nhóm A — Việc cần làm ngay (trước khi đặt bất cứ gì):**
```
☐ Kiểm tra giá vé trên Google Flights / Skyscanner
☐ Kiểm tra phòng khách sạn còn trống trên Booking.com / Agoda
☐ Xác nhận yêu cầu visa Nhật Bản hiện tại (có thể thay đổi)
☐ Hỏi ý kiến mọi người trong nhóm về lịch trình nháp
```

**Nhóm B — Việc cần làm sau khi chốt vé và phòng:**
```
☐ Mua travel insurance (bảo hiểm du lịch)
☐ Đổi tiền Yên hoặc chuẩn bị thẻ thanh toán quốc tế
☐ Tải app JR Pass / Suica / offline maps
☐ Xác nhận giờ mở cửa từng điểm tham quan (1-2 tuần trước)
☐ Kiểm tra dự báo thời tiết (1 tuần trước)
```

**Nhóm C — Sinh động từ `_vgResult` nếu có:**

Với mỗi item trong checklist Phase 4 có `status = "needs_verification"`, tạo một todo item:
```
☐ [action_required từ vgResult]
```

**Lưu ý kỹ thuật cho checkbox:**
- Dùng `<input type="checkbox">` thuần
- Khi tick, class `done` được thêm vào `<li>` → text gạch ngang (CSS: `.todo-item.done { text-decoration: line-through; color: var(--muted); }`)
- State checkbox **không** persist (không cần localStorage)

**Nút "Copy todo list":** copy text thuần (không HTML), dùng ký hiệu `[ ]` / `[x]`.

---

## 3. Acceptance Criteria — Agent Phải Pass Hết Trước Khi Báo Xong

| # | Tiêu chí | Cách kiểm tra |
|---|---|---|
| AC-01 | File tồn tại và mở được offline bằng double-click | Mở file trong Chrome/Edge mà không có server |
| AC-02 | Section 8 ẩn khi mới load — chỉ hiện sau khi nhấn generate() và Section 7 đã có output | Mở file → Section 8 không thấy → nhấn generate → nhập JSON vào Section 6 → phân tích → nhập JSON vào Section 7 → render → Section 8 xuất hiện |
| AC-03 | Tab 1 hiển thị lịch trình đúng số ngày (parse từ form.days) | Nhập "7 ngày" → Tab 1 có 7 ngày |
| AC-04 | Nếu có `_flightResult`, Tab 1 hiện summary card vé khuyến nghị | Paste JSON flight vào Section 6, phân tích → Tab 1 có card vé |
| AC-05 | Nếu có `_vgResult` với needs_verification items, Tab 3 tự động thêm todo items từ action_required | Paste JSON vg vào Section 7 → Tab 3 có todo sinh động |
| AC-06 | Nút copy hoạt động cho cả 3 tab | Nhấn copy → paste vào text editor → nội dung đúng |
| AC-07 | Giá không bịa cụ thể — chỉ dải ước tính kèm `*` | Đọc Tab 1: không thấy "8.500.000 VND" hay "¥45,000" |
| AC-08 | Checkbox Tab 3 hoạt động — tick xong text gạch ngang | Tick checkbox → text gạch ngang |
| AC-09 | Bố cục responsive trên mobile (max-width: 640px) | DevTools → iPhone 12 → không có bảng tràn màn hình |
| AC-10 | Nút "← Nhập lại" ẩn toàn bộ output kể cả Section 8, reset sạch | Nhấn reset → Section 8 mất |

---

## 4. Hướng Dẫn Cập Nhật Báo Cáo Sau Khi Hoàn Thành

Sau khi build xong và pass AC-01 đến AC-10, agent phải cập nhật **2 file báo cáo** sau:

### 4.1 Cập nhật `option_b_implementation_plan_20260601.md`

File tại: `c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI\Implementation Plan\option_b_implementation_plan_20260601.md`

Tìm phần **Milestone 1** và thêm dòng sau vào cuối bảng Deliverable (hoặc tạo mục mới **Milestone 5**):

```markdown
## Milestone 5: Japan Planner Phase 5 — Final Plan Export (DONE)

**File:** `japan-planner-phase5.html`  
**Ngày hoàn thành:** [ngày thực tế]  
**Agent thực hiện:** [tên agent hoặc "Claude Code"]

### Đã build
- Section 8 với 3 tab: Lịch trình cuối / Email-Zalo / Todo List
- Tab 1: bảng lịch trình accordion, summary card vé nếu có _flightResult, status từ _vgResult
- Tab 2: email/Zalo message sinh động từ form input + _flightResult + _vgResult deals
- Tab 3: checkbox todo list 3 nhóm (A/B/C), nhóm C sinh từ needs_verification items
- Nút copy cho cả 3 tab

### Acceptance criteria
[paste kết quả kiểm tra AC-01 đến AC-10: PASS / FAIL]
```

### 4.2 Cập nhật `huong_dan_phuong_an_b_20260601.md`

File tại: `c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI\Implementation Plan\huong_dan_phuong_an_b_20260601.md`

Tìm phần **Bắt Đầu Từ Đâu?** và thêm bước mới:

```markdown
### Bước 4 — Thêm Final Plan Export (Phase 5)

Dùng prompt vibe coding tại Milestone 5 ([option_b_implementation_plan_20260601.md](option_b_implementation_plan_20260601.md)) để agent build file `japan-planner-phase5.html`.

**Kết quả mong đợi:** Sau khi qua Phase 4, user nhấn "Xuất kế hoạch cuối" và nhận được 3 thứ để copy ngay: lịch trình cuối, email gửi gia đình, todo list việc cần làm.
```

Cập nhật bảng **Thứ Tự Ưu Tiên**:
```markdown
Milestone 1 (Phase 2) → Milestone 2 (Schema) → Milestone 3 (Phase 3) → Milestone 4 (Phase 4) → Milestone 5 (Phase 5)
```

---

## 5. Ràng Buộc Kỹ Thuật Bắt Buộc

1. **HTML/CSS/JavaScript thuần** — không CDN, không framework, không fetch/import
2. **Không ghi giá cụ thể** trong code — mọi con số phải từ input người dùng hoặc JSON paste vào, kèm `*ước tính`
3. **Không thêm nút đặt vé hoặc thanh toán** — Phase 5 chỉ xuất thông tin để người thật quyết định
4. **Section 8 không render nếu `_vgResult` chưa có** — kiểm tra bằng `if (!window._vgResult) return;`
5. **Copy plain text** — không copy HTML, không markdown, chỉ text thuần
6. **Mobile responsive** — test ở 375px width, không có bảng tràn
7. **Giữ nguyên CSS variables** từ Phase 4 — không thay đổi màu sắc hay font

---

## 6. Checklist Báo Cáo Cho Agent

Khi báo xong, agent phải trả lời đủ 5 mục sau:

```
1. File path: [đường dẫn tuyệt đối đến file đã tạo]
2. Kích thước: [số dòng] dòng
3. AC pass: [liệt kê từng AC-01 đến AC-10: PASS hoặc FAIL + ghi chú nếu FAIL]
4. Báo cáo đã cập nhật: [DONE / NOT DONE + lý do nếu không làm]
5. Điểm cần Claude kiểm tra thêm: [nếu có vấn đề gì agent không chắc]
```

---

## 7. Prompt Giao Việc Cho Agent (Copy-Pasteable)

```
Đọc file plan tại:
c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI\Implementation Plan\plan_phase5_japan_planner_20260602.md

Sau đó:
1. Đọc file Phase 4 để hiểu cấu trúc kế thừa:
   c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI\japan-planner-phase4.html

2. Build file Phase 5 theo đúng yêu cầu trong plan.

3. Khi xong, tự kiểm tra các AC-01 đến AC-10 trong plan.

4. Cập nhật 2 file báo cáo theo hướng dẫn mục 4 trong plan.

5. Báo cáo đầy đủ 5 mục theo mẫu ở mục 6 trong plan.
```

---

*Plan này được Claude tạo ngày 2026-06-02. Người kiểm tra output: Claude (conversation hiện tại).*
