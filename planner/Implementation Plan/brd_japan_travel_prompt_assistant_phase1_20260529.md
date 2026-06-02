# BRD: Japan Travel Prompt Assistant – Phase 1
**Ngày tạo:** 29/05/2026
**Artifact:** `japan_travel_prompt_assistant_phase1_20260529.html`

---

## 1. Business Goal

Minh họa cho học viên lớp AI Thực Chiến rằng AI Agent tốt bắt đầu bằng việc **hỏi lại và chuẩn hóa yêu cầu**, không vội tạo kết quả cuối. Phase 1 là mức tự động hóa thấp nhất trong lộ trình 5 phase của case Japan Travel.

---

## 2. User Problem

Người học mới thường hỏi AI bằng câu quá rộng như "lập lịch đi Nhật 5 ngày". Kết quả dễ nghe hay nhưng khó dùng vì:
- Thiếu ràng buộc thực tế (ngân sách, nhịp độ, ưu tiên).
- Thiếu giả định rõ ràng.
- Không có bước kiểm chứng trước khi tin kết quả.

---

## 3. Scope In

1. Artifact HTML offline, không backend, chạy bằng double-click.
2. Form nhập liệu với dữ liệu mặc định sẵn cho case Nhật Bản.
3. Output 1: 5 câu hỏi làm rõ nhu cầu.
4. Output 2: Prompt sạch có cấu trúc, sẵn sàng copy sang Gemini/ChatGPT/Claude.
5. Output 3: Checklist kiểm chứng 7 mục trước khi tin kết quả AI.
6. Nút copy prompt bằng JavaScript thuần.
7. Tài liệu BRD, technical note, UAT note.
8. Cập nhật README và handoff references.
9. Commit và push GitHub.

## 3. Scope Out

1. Không build Phase 2–5.
2. Không tạo lịch trình chi tiết thật.
3. Không bịa giá vé, khách sạn, giờ mở cửa, visa, thời tiết như dữ liệu chắc chắn.
4. Không thay link NotebookLM đã verify.
5. Không chỉnh các phần không liên quan đến Japan Travel Phase 1.

---

## 4. Functional Requirements

| # | Yêu cầu | Trạng thái |
|---|---|---|
| FR-01 | Header ngắn với tên Phase 1 và mô tả mục tiêu | DONE |
| FR-02 | Form nhập: điểm đến, số người, tháng, số ngày, ngân sách, nhịp độ, sở thích, ràng buộc | DONE |
| FR-03 | Dữ liệu mặc định: Nhật Bản, 3 người lớn, tháng 7, 5 ngày, 35–40 triệu VND/người | DONE |
| FR-04 | Nút "Tạo câu hỏi và prompt" | DONE |
| FR-05 | Output 1: 5 câu hỏi làm rõ được tạo động từ input | DONE |
| FR-06 | Output 2: Prompt sạch có anti-hallucination instruction | DONE |
| FR-07 | Output 3: Checklist kiểm chứng 7 mục | DONE |
| FR-08 | Nút copy prompt (clipboard API + fallback) | DONE |
| FR-09 | Nút reset để nhập lại | DONE |

---

## 5. Acceptance Criteria

1. HTML artifact tồn tại và mở offline được.
2. Dữ liệu mặc định case Nhật Bản hiển thị sẵn khi mở.
3. Nhấn nút tạo → xuất đủ 3 output.
4. Prompt có câu lệnh chống hallucination rõ ràng.
5. Checklist có đủ 7 mục kiểm chứng.
6. Nút copy hoạt động.
7. Giao diện responsive trên laptop và mobile.

---

## 6. Risks and Mitigations

| Rủi ro | Mức độ | Biện pháp |
|---|---|---|
| Học viên copy prompt nhưng bỏ qua câu hỏi làm rõ | Trung bình | Warning note nhắc nhở ngay dưới danh sách câu hỏi |
| AI bỏ qua yêu cầu anti-hallucination | Trung bình | Warning note dưới prompt box nhắc người dùng kiểm tra |
| Clipboard API không hoạt động trên một số trình duyệt cũ | Thấp | Có fallback dùng `execCommand('copy')` |
| Thông tin checklist lỗi thời | Thấp | Checklist là danh sách hành động kiểm chứng, không phải dữ liệu cứng |
