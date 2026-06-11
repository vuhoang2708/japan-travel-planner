# UAT Script — Tourist Agent Wizard Edition v2

**Ngày:** 2026-06-10  
**Artifact:** `tourist-agent-v2.html`  
**URL live:** https://touristagent.vercel.app/planner/tourist-agent-v2.html  
**Tester:** Gemini (browser UAT)  
**Reviewer:** Claude / Vu Hoang

---

## Cách chạy UAT này

1. Mở URL live trên Chrome hoặc Edge (không dùng Firefox cho lần đầu).
2. Thực hiện từng test case theo thứ tự — ghi kết quả vào cột **Kết quả**.
3. Nếu FAIL: chụp màn hình hoặc ghi rõ hành vi thực tế quan sát được.
4. Báo cáo cuối theo mẫu **mục 4** của file này.

---

## 1. Test Matrix

### Nhóm A — Khởi động & Offline

| TC | Test Case | Bước kiểm tra | Expected | Kết quả |
|---|---|---|---|---|
| A-01 | File mở được trên live URL | Truy cập URL | Trang load, hiện header "✈️ Tourist Agent" | |
| A-02 | Không có external request | DevTools → Network tab → reload | Không có request nào ra ngoài (fonts, CDN, API) | |
| A-03 | Progress bar hiện đúng bước 1 active | Nhìn đầu trang | Dot số 1 màu cam, 3 dot còn lại màu xám | |
| A-04 | Form hiện đủ 6 field mặc định | Đọc form | Điểm đến, số người, tháng, ngày, ngân sách, nhịp độ đều có giá trị mặc định | |

---

### Nhóm B — Bước 1: Nhập thông tin

| TC | Test Case | Bước kiểm tra | Expected | Kết quả |
|---|---|---|---|---|
| B-01 | Nút "Thông tin thêm" mở/đóng | Click vào `<details>` Thông tin thêm | Section mở ra hiện 2 field thêm (sở thích, ràng buộc) | |
| B-02 | Nhấn "Xem lịch trình →" với dữ liệu mặc định | Nhấn nút cam | Chuyển sang Bước 2, progress bar cập nhật dot 2 active | |
| B-03 | Card tóm tắt ở Bước 2 đúng thông tin | Xem 3 badge đầu Bước 2 | Hiện đúng số người / tháng / ngân sách vừa nhập | |
| B-04 | Thay điểm đến thành "Hàn Quốc" → xem lịch trình | Sửa field, nhấn nút | Header Bước 2 hiện "Hàn Quốc" | |

---

### Nhóm C — Bước 2: Lịch trình nháp

| TC | Test Case | Bước kiểm tra | Expected | Kết quả |
|---|---|---|---|---|
| C-01 | Lịch trình sinh đủ số ngày | Đếm số dòng accordion | Số ngày = giá trị nhập ở Bước 1 (mặc định 5 ngày) | |
| C-02 | Mở 1 ngày accordion — nội dung tiếng Việt có dấu | Click vào 1 ngày | Hiện Sáng / Chiều / Tối bằng tiếng Việt có dấu, không có ký tự lỗi | |
| C-03 | Tên địa điểm tiếng Việt | Xem nội dung ngày bất kỳ | Tên địa điểm dùng tiếng Việt (Vườn Shinjuku Gyoen, Đền Meiji…) không phải romaji | |
| C-04 | Ngân sách ước tính hiển thị | Xem cuối mỗi ngày | Có dòng "Ngân sách ước tính: ~... /người" | |
| C-05 | Ghi chú cuối trang | Xem phần dưới lịch trình | Có dòng chú thích "Lịch trình mang tính tham khảo…" | |
| C-06 | Nút "← Chỉnh thông tin" quay lại Bước 1 | Nhấn nút | Quay về Bước 1, form giữ nguyên giá trị đã nhập | |

---

### Nhóm D — Bước 3: Vé máy bay

| TC | Test Case | Bước kiểm tra | Expected | Kết quả |
|---|---|---|---|---|
| D-01 | Chuyển sang Bước 3 | Nhấn "Tìm vé máy bay →" | Bước 3 hiện, progress dot 3 active | |
| D-02 | Nút "🤖 Hỏi AI về vé" copy clipboard | Nhấn nút → paste vào Notepad | Clipboard chứa đoạn text yêu cầu tìm vé (có thông tin chuyến đi) | |
| D-03 | Tooltip xác nhận sau khi copy | Nhìn sau khi nhấn nút | Hiện "✓ Đã copy yêu cầu!" | |
| D-04 | Link "Nhập kết quả thủ công" hiện ô dán | Click link | Textarea dán JSON hiện ra | |
| D-05 | Dán JSON hợp lệ → bảng so sánh hiện | Dán JSON mẫu bên dưới → nhấn "Phân tích kết quả" | Bảng 3 phương án vé hiện, có badge ✅/🔶 | |
| D-06 | Không có từ kỹ thuật lộ ra | Đọc toàn bộ UI Bước 3 | Không có: "prompt", "JSON", "Travel Optimizer", "Verification Gate", "option_id" | |
| D-07 | Nút "Bỏ qua" chuyển sang Bước 4 | Nhấn "Bỏ qua — dùng giá ước tính" | Chuyển sang Bước 4 không cần dán JSON | |

**JSON mẫu để test D-05** (dán vào textarea):
```json
{
  "search_summary": {"origin": "HAN", "destination": "NRT", "departure_month": "July 2026", "travelers": 3, "budget_per_person_vnd": 37500000},
  "flight_options": [
    {"option_id": "OPT-A", "airline": "Vietnam Airlines", "route": "HAN → NRT (thẳng)", "schedule": "Thứ 3, khởi hành 08:00", "price_per_person_vnd": 12800000, "total_price_vnd": 38400000, "data_confidence": "confirmed", "recommendation": "Khuyến nghị — hãng truyền thống, giá ổn định"},
    {"option_id": "OPT-B", "airline": "VietJet Air", "route": "HAN → ICN → NRT (1 điểm dừng)", "schedule": "Thứ 2, khởi hành 06:30", "price_per_person_vnd": 9200000, "total_price_vnd": 27600000, "data_confidence": "assumption", "recommendation": "Rẻ nhất — cần kiểm tra phụ phí hành lý"},
    {"option_id": "OPT-C", "airline": "ANA", "route": "HAN → NRT (thẳng)", "schedule": "Thứ 5, khởi hành 10:15", "price_per_person_vnd": 15500000, "total_price_vnd": 46500000, "data_confidence": "confirmed", "recommendation": "Chất lượng cao — phù hợp nếu ưu tiên comfort"}
  ]
}
```

---

### Nhóm E — Bước 4: Kế hoạch cuối

| TC | Test Case | Bước kiểm tra | Expected | Kết quả |
|---|---|---|---|---|
| E-01 | Bước 4 có đủ 3 tab | Nhìn header tabs | Hiện đủ: 📅 Lịch trình / 💬 Nhắn tin / ✅ Việc cần làm | |
| E-02 | Tab Lịch trình — nội dung đầy đủ | Click tab 📅 | Hiện lịch trình tổng hợp theo ngày, có thông tin vé (nếu dán ở Bước 3) | |
| E-03 | Tab Nhắn tin — nội dung gửi được | Click tab 💬 | Tin nhắn soạn sẵn, có thông tin chuyến đi, đọc được | |
| E-04 | Tab Việc cần làm — 3 nhóm | Click tab ✅ | Có Nhóm A (Làm ngay), Nhóm B (Sau khi chốt vé), Nhóm C (Cần kiểm tra) | |
| E-05 | Nút copy Tab Lịch trình | Nhấn copy → paste Notepad | Nội dung text sạch, không có HTML tag | |
| E-06 | Nút copy Tab Nhắn tin | Nhấn copy → paste Notepad | Nội dung text sạch | |
| E-07 | Nút copy Tab Việc cần làm | Nhấn copy → paste Notepad | Checklist dạng text, có dấu □ hoặc ☐ | |
| E-08 | Không có từ kỹ thuật lộ ra | Đọc toàn bộ Bước 4 | Không có: "Travel Optimizer", "Verification Gate", "needs_verification", "confirmed/assumption" dạng raw | |

---

### Nhóm F — Navigation & Reset

| TC | Test Case | Bước kiểm tra | Expected | Kết quả |
|---|---|---|---|---|
| F-01 | Back từ Bước 4 → Bước 3 | Nhấn "← Vé máy bay" (nếu có) | Quay về Bước 3, dữ liệu JSON vẫn còn | |
| F-02 | Nút "← Bắt đầu lại" reset sạch | Nhấn nút, xác nhận dialog (nếu có) | Quay về Bước 1, form về giá trị mặc định, lịch trình biến mất | |
| F-03 | Progress bar đồng bộ khi back | Back qua nhiều bước | Dot active luôn khớp với bước đang hiện | |

---

### Nhóm G — Responsive & UX

| TC | Test Case | Bước kiểm tra | Expected | Kết quả |
|---|---|---|---|---|
| G-01 | Layout 375px không vỡ | DevTools → iPhone 12 (375px) → reload | Form không tràn, text không bị cắt, nút vẫn nhấn được | |
| G-02 | Layout 768px (tablet) | DevTools → 768px | Layout hợp lý, không có khoảng trắng lớn bất thường | |
| G-03 | Không có text "Japan" lộ trong UI | Tìm kiếm trên trang (Ctrl+F "Japan") | Không có kết quả (trừ nội dung địa điểm tiếng Anh là chấp nhận được) | |
| G-04 | Không có lỗi JS trong Console | DevTools → Console → dùng hết flow | Không có lỗi đỏ (warning màu vàng bỏ qua được) | |

---

## 2. Acceptance Criteria — Chặn release

Những TC sau nếu FAIL thì không được xem là done:

| TC | Lý do chặn |
|---|---|
| A-02 | Vi phạm offline requirement — CDN load = broken khi không có internet |
| B-02 | Flow chính bị vỡ |
| C-01 | Sinh sai số ngày = output sai |
| D-02 | Nút copy không hoạt động = user không dùng được Bước 3 |
| E-01 | Bước 4 không render = toàn bộ output mất |
| E-05/06/07 | Copy không ra text sạch = user không dùng được kết quả |
| F-02 | Reset không sạch = state bẩn giữa các session |
| G-04 | JS error = chức năng âm thầm bị vỡ |

---

## 3. Test Case bổ sung — Edge Cases

| TC | Scenario | Bước | Expected |
|---|---|---|---|
| X-01 | Nhập số ngày = 1 | Bước 1 nhập 1 ngày → xem lịch trình | Sinh đúng 1 ngày, không crash |
| X-02 | Nhập số ngày = 10 | Bước 1 nhập 10 ngày → xem lịch trình | Sinh đủ 10 ngày, scroll được |
| X-03 | Dán JSON sai format vào Bước 3 | Dán text bất kỳ → nhấn Phân tích | Hiện thông báo lỗi, không crash trang |
| X-04 | Nhấn Bước 4 khi bỏ qua Bước 3 | Bỏ qua → Bước 4 | Tab Lịch trình không có dòng vé trống gây lỗi hiển thị |
| X-05 | Xác thực dữ liệu đầu vào (Input Validation) | Nhập số ngày = 0, số người = 0, ngân sách = -1 | Hiện cảnh báo lỗi tiếng Việt và chặn không cho chuyển bước |
| X-06 | Dán JSON có kèm text giải thích của AI hoặc markdown block | Dán phản hồi thực tế từ AI (có chữ giải thích ở đầu/cuối hoặc bọc ```json) | Tự động bóc tách JSON và hiển thị bảng so sánh thành công |

---

## 4. Mẫu báo cáo UAT

```
=== UAT REPORT — Tourist Agent v2 ===
Ngày test: [ngày]
Tester: [tên]
URL: https://touristagent.vercel.app/planner/tourist-agent-v2.html
Trình duyệt: [Chrome/Edge vX]

TỔNG KẾT:
- Tổng TC: 33
- PASS: [n]
- FAIL: [n]
- BLOCKED: [n]
- SKIP: [n]

BLOCKING FAILS (nếu có):
- [TC-xx]: [mô tả hành vi thực tế quan sát được]

NON-BLOCKING ISSUES:
- [TC-xx]: [mô tả]

EDGE CASES:
- X-01: [PASS/FAIL]
- X-02: [PASS/FAIL]
- X-03: [PASS/FAIL]
- X-04: [PASS/FAIL]

KẾT LUẬN: [PASS / FAIL — chờ fix / PASS với điều kiện]
```

---

*UAT script tạo ngày 2026-06-10. Reviewer: Claude / Vu Hoang.*
