# Kế hoạch: Japan Travel Planner v2 — End-User Edition

**Ngày:** 2026-06-02  
**Người giao:** Vu Hoang  
**Ưu tiên:** Cao — nâng cấp tổng thể UX cho người dùng phổ thông

---

## 1. Mục tiêu

Tạo `planner/japan-planner-v2.html` — phiên bản end-user của bộ tool, gộp Phase 2→5 vào 1 file wizard 4 bước. Người dùng chỉ nhập thông tin 1 lần, không thấy prompt, không thấy JSON, không thấy thuật ngữ kỹ thuật.

Bản gốc 5 file (edu-version) giữ nguyên trên branch riêng để dùng trong lớp AI.

---

## 2. Bước 0 — Tạo branch backup TRƯỚC KHI làm bất cứ gì

```powershell
git -C "c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent" checkout -b edu-version
git -C "c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent" add .
git -C "c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent" commit -m "backup: edu-version with all 5 phase files before v2 refactor"
git -C "c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent" checkout master
```

Xác nhận branch `edu-version` tồn tại trước khi tiếp tục.

---

## 3. Kiến trúc v2

### 3.1 File output
```
c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\planner\japan-planner-v2.html
```

### 3.2 Wizard 4 bước với progress bar

```
●━━━━○━━━━○━━━━○
Bước 1    2    3    4
Thông tin → Lịch trình → Vé máy bay → Kế hoạch cuối
```

Progress bar CSS thuần: 4 dot nối bằng line, dot active màu `--orange`, dot done màu `--green`.

Mỗi bước là 1 `<div class="step-panel">` — show/hide bằng JS, không reload page.

### 3.3 Luồng người dùng

```
[Bước 1] Nhập thông tin
    ↓ Nhấn "Xem lịch trình →"
[Bước 2] Lịch trình nháp + chỉnh sửa
    ↓ Nhấn "Tìm vé máy bay →"
[Bước 3] Vé máy bay (optional — có thể bỏ qua)
    ↓ Nhấn "Tạo kế hoạch cuối →"
[Bước 4] 3 tab: Lịch trình cuối / Nhắn tin / Việc cần làm
```

---

## 4. Chi tiết từng bước

### Bước 1 — Nhập thông tin

**Header:** `✈️ Lên kế hoạch du lịch Nhật Bản`

**Form 6 field** (giống các phase cũ, label tiếng Việt thuần):
- Điểm đến (default: Nhật Bản)
- Số người (default: 3 người lớn)
- Tháng đi (default: Tháng 7)
- Số ngày (default: 5 ngày)
- Ngân sách mỗi người (default: 35–40 triệu VND)
- Nhịp độ: select (Thư thả / Cân bằng / Nhiều điểm tham quan)

**2 field mở rộng** (collapsible bằng `<details>` — mặc định đóng):
- Sở thích chính (default: Cảnh đẹp tự nhiên, quán ăn địa phương)
- Ràng buộc đặc biệt (default: Hạn chế đổi khách sạn quá nhiều)

**Nút:** `Xem lịch trình →` (màu orange)

---

### Bước 2 — Lịch trình nháp

**Header:** `📅 Lịch trình nháp — [destination], [days]`

**Nội dung:**
- Card tóm tắt nhỏ ở đầu: Nhóm | Tháng | Ngân sách
- Bảng lịch trình accordion theo ngày — mỗi ngày là 1 `<details>`:
  ```
  Ngày 1 — Tokyo – Shinjuku
    Sáng: Đến sân bay, check-in
    Chiều: Shinjuku Gyoen → Đền Meiji
    Tối: Ăn tối Ramen địa phương
    Ngân sách ước tính: ~200k–350k/người *
  ```
- Ghi chú cuối: "Lịch trình ước tính — giờ mở cửa và giá chưa được kiểm chứng"

**Tên địa điểm và mô tả phải dùng tiếng Việt có dấu** — cập nhật lại REGIONS và MEALS:

```javascript
var REGIONS = [
  {name:"Tokyo – Shinjuku", spots:["Vườn Shinjuku Gyoen","Đền Meiji","Phố Harajuku","Ngã tư Shibuya","Akihabara"]},
  {name:"Tokyo – Asakusa", spots:["Chùa Senso-ji","Phố Nakamise","Sông Sumida","Tháp Tokyo Skytree","Công viên Ueno"]},
  {name:"Nikko", spots:["Đền Tosho-gu","Thác Kegon","Hồ Chuzenji","Chùa Rinnoji","Kanmangafuchi"]},
  {name:"Hakone", spots:["Ngắm núi Phú Sĩ","Bảo tàng Ngoài trời Hakone","Du thuyền hồ Ashi","Owakudani","Cáp treo Hakone"]},
  {name:"Kyoto – Higashiyama", spots:["Đền Fushimi Inari","Chùa Vàng Kinkaku-ji","Rừng Tre Arashiyama","Phố cổ Gion","Chợ Nishiki"]},
  {name:"Osaka", spots:["Phố ăn uống Dotonbori","Lâu đài Osaka","Chợ Kuromon","Khu Shinsekai","Namba"]},
  {name:"Nara", spots:["Công viên hươu Nara","Chùa Todai-ji","Đền Kasuga","Phố cổ Naramachi","Vườn Isuien"]}
];
var MEALS = ["Ramen địa phương","Sushi băng chuyền","Udon tươi","Tonkatsu","Okonomiyaki","Izakaya địa phương","Tempura tại chợ","Yakitori phố đêm"];
```

**2 nút dưới:** `← Chỉnh thông tin` | `Tìm vé máy bay →`

---

### Bước 3 — Vé máy bay

**Header:** `✈️ Vé máy bay — tìm phương án tốt nhất`

**Layout 2 khu vực:**

**Khu vực trái (hướng dẫn đơn giản):**
```
Để tìm giá vé tốt nhất, làm 2 bước:

① Nhấn nút "Hỏi AI về vé" bên dưới
② Dán kết quả vào ô bên phải
```

Nút: `🤖 Hỏi AI về vé` — khi nhấn: copy prompt vào clipboard + hiện tooltip "Đã copy! Paste vào Gemini/ChatGPT/Claude"

**Khu vực phải (ẩn mặc định, hiện khi nhấn nút hoặc nhấn "Nhập thủ công"):**
- Textarea dán kết quả JSON (label: "Dán kết quả từ AI vào đây")
- Nút: `Phân tích kết quả`

**Sau khi phân tích:** hiện bảng so sánh 3 phương án — đơn giản hóa, chỉ giữ:
- Hãng bay | Lịch bay | Giá thực/người | Điểm linh hoạt | Khuyến nghị

Không hiện `option_id`, không hiện `data_confidence` dạng kỹ thuật — thay bằng badge thân thiện: `✅ Đã xác minh` / `🔶 Ước tính` / `⏰ Dữ liệu cũ`

**Nút bỏ qua:** `Bỏ qua — dùng giá ước tính` → vẫn sang Bước 4

**2 nút dưới:** `← Lịch trình` | `Tạo kế hoạch cuối →`

---

### Bước 4 — Kế hoạch cuối

**Header:** `🎯 Kế hoạch cuối — sẵn sàng lên đường!`

**3 tab** (giống Phase 5 hiện tại, giữ logic, chỉ đổi tên và ngôn ngữ):

| Tab cũ | Tab mới |
|---|---|
| Lịch trình cuối | 📅 Lịch trình |
| Email / Zalo | 💬 Nhắn tin cho nhóm |
| Todo List | ✅ Việc cần làm |

**Tab "Việc cần làm":** gộp luôn checklist kiểm chứng (7 mục từ Phase 2) vào Nhóm A — không hiện riêng ở bước trước nữa.

**Không có nút copy prompt** ở bước này — chỉ có copy text thuần cho từng tab.

---

## 5. Nguyên tắc ngôn ngữ

| Thuật ngữ kỹ thuật cũ | Ngôn ngữ thân thiện mới |
|---|---|
| Travel Optimizer | (ẩn hoàn toàn) |
| Verification Gate | Kiểm tra trước khi đặt |
| data_confidence | ✅ Đã xác minh / 🔶 Ước tính |
| Prompt / JSON | (ẩn sau nút "Hỏi AI về vé") |
| option_id, IATA code | (ẩn hoàn toàn) |
| LCC / FSC | Hãng giá rẻ / Hãng truyền thống |
| needs_verification | Cần kiểm tra thêm |
| confirmed / assumption | Chắc chắn / Dự kiến |

---

## 6. CSS & UI

- Kế thừa toàn bộ CSS variables từ Phase 4/5
- **Thêm** styles cho wizard:
  ```css
  .progress-bar { display:flex; align-items:center; justify-content:center; gap:0; margin-bottom:32px; }
  .prog-dot { width:28px; height:28px; border-radius:50%; background:var(--line); color:var(--muted); font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; }
  .prog-dot.active { background:var(--orange); color:#fff; }
  .prog-dot.done { background:var(--green); color:#fff; }
  .prog-line { flex:1; height:3px; background:var(--line); max-width:60px; }
  .prog-line.done { background:var(--green); }
  .step-panel { display:none; }
  .step-panel.active { display:block; }
  ```
- **Không dùng CDN, không framework**

---

## 7. Xử lý state (trạng thái ứng dụng)

Giữ nguyên các biến global từ Phase 5:
```javascript
var _tripCtx = {};
var _flightResult = null;
var _vgResult = null;
var _rows = []; // lưu lịch trình để dùng lại ở Bước 4
```

Thêm:
```javascript
var _currentStep = 1;
function goToStep(n) { ... } // ẩn step hiện tại, hiện step n, update progress bar
```

---

## 8. Acceptance Criteria

| # | Tiêu chí | Cách kiểm tra |
|---|---|---|
| AC-01 | File mở offline bằng double-click | Double-click trong Explorer |
| AC-02 | Progress bar cập nhật đúng khi chuyển bước | Nhấn từng nút Next/Back |
| AC-03 | Bước 2 hiện lịch trình tiếng Việt có dấu, tên địa điểm đúng | Xem bảng lịch trình |
| AC-04 | Bước 3 nút "Hỏi AI về vé" copy prompt vào clipboard | Nhấn nút → paste vào Notepad |
| AC-05 | Bước 3 có thể bỏ qua, vẫn sang Bước 4 | Nhấn "Bỏ qua" |
| AC-06 | Bước 4 Tab "Việc cần làm" có checklist 7 mục Nhóm A | Xem tab |
| AC-07 | Không có từ "prompt", "JSON", "Travel Optimizer", "Verification Gate" hiển thị với người dùng | Đọc toàn bộ UI |
| AC-08 | Nút copy 3 tab hoạt động (plain text) | Copy → paste Notepad |
| AC-09 | Responsive ở 375px | DevTools iPhone 12 |
| AC-10 | Nút "← Bắt đầu lại" quay về Bước 1, reset sạch | Nhấn nút |

---

## 9. Checklist báo cáo cho agent

```
1. Branch edu-version đã tạo: DONE / NOT DONE
2. File path v2: [đường dẫn tuyệt đối]
3. Số dòng: [n] dòng
4. AC pass: [AC-01 đến AC-10: PASS / FAIL]
5. Điểm cần kiểm tra thêm: [nếu có]
```

---

## 10. Prompt giao việc cho agent (Copy-Pasteable)

```
Đọc file plan tại:
c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\planner\Implementation Plan\implementation_plan_20260602_PlannerV2.md

Trước khi làm bất cứ gì, thực hiện Bước 0 trong plan: tạo branch git edu-version và commit toàn bộ file hiện tại vào đó, rồi checkout lại master.

Sau đó đọc các file sau để hiểu cấu trúc kế thừa:
- planner/japan-planner-phase5.html (wizard logic + tab system + Phase 5 functions)
- planner/japan-planner-phase3.html (budget table + comparison table)

Build file japan-planner-v2.html theo đúng kiến trúc wizard 4 bước trong plan.

Tự kiểm tra AC-01 đến AC-10 sau khi build xong.
Báo cáo đủ 5 mục theo mẫu mục 9 trong plan.
```

---

*Plan tạo ngày 2026-06-02. Người duyệt: Vu Hoang.*
