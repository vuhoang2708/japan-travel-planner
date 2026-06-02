# 🎯 Kế hoạch thực hiện: Japan Travel Planner Phase 5

## 1. Đề bài & Yêu cầu (Task & Specification)
Xây dựng `japan-planner-phase5.html` dựa trên `japan-planner-phase4.html` nhằm bổ sung **Bước 8 — Kế hoạch cuối + Email + Todo List**.
- **Đầu ra:** Trang đơn HTML chạy offline (ngoại tuyến) tích hợp logic Phase 5.
- **Section 8 (Bước 8):** Hiển thị 3 tab tương tác (không dùng thẻ `<tab>`):
  - **Tab 1 — Lịch Trình Cuối:** Bảng tổng hợp (Ngày, Khu vực, Trạng thái kiểm chứng) và accordion chi tiết từng ngày, kèm thẻ tóm tắt vé máy bay (nếu có `_flightResult`).
  - **Tab 2 — Email / Zalo Message:** Tin nhắn mẫu tạo động từ form input, thông tin vé và deal khuyến mãi (nếu có).
  - **Tab 3 — Todo List:** Danh sách việc cần làm chia 3 nhóm (A/B/C), nhóm C tạo động từ các mục `needs_verification` của `_vgResult`.
- **Cập nhật báo cáo:** Cập nhật 2 file báo cáo `option_b_implementation_plan_20260601.md` và `huong_dan_phuong_an_b_20260601.md` trong thư mục `training_AI`.

## 2. Hiện trạng & Khảo sát (Current State & Research)
- Đã có file `planner/japan-planner-phase4.html` làm nền tảng với đầy đủ giao diện, CSS và các biến toàn cục như `_tripCtx`, `_flightResult`.
- Cần thừa kế toàn bộ cấu trúc và giao diện từ Phase 4, nâng cấp logic của Section 7 để lưu `_vgResult` và hiển thị Section 8.
- Chưa có file `japan-planner-phase5.html`.

## 3. Giải pháp kỹ thuật (Technical Solution)
- **Tạo file mới:** Sao chép nội dung `japan-planner-phase4.html` sang `planner/japan-planner-phase5.html`.
- **Chỉnh sửa UI/UX:**
  - Thay đổi tiêu đề (`<title>`), badge `.phase-badge` sang màu xanh lá `#059669` và text thành `Phase 5 · Final Plan`.
  - Thêm thẻ HTML cho Section 8 ẩn mặc định (`display: none`).
  - Thiết kế tab-bar bằng các nút bấm phẳng có phản hồi di chuột (hover effect) sinh động và chỉ báo trạng thái hoạt động (active indicator).
- **Logic Tab 1 (Lịch trình cuối):**
  - Đọc `_tripCtx` và `_flightResult` để render "summary card" (thẻ tóm tắt) vé khuyến nghị ở đầu.
  - Render bảng tổng quan 3 cột: Ngày | Khu vực | Trạng thái kiểm chứng.
  - Trạng thái kiểm chứng được đánh giá tổng hợp từ các checks của ngày đó trong `_vgResult.checklist_per_day`: nếu có bất kỳ check nào là `needs_verification` -> hiển thị `Can kiem chung ❌`; nếu không có `needs_verification` nhưng có `assumption` -> `Gia dinh 🔶`; ngược lại -> `Chac chan ✅`.
  - Render danh sách `<details>` chi tiết từng ngày với Sáng/Chiều/Tối/Ăn uống/Di chuyển/Ngân sách dải ước tính kèm dấu `*`.
- **Logic Tab 2 (Email/Zalo):**
  - Render mẫu tin nhắn động trong một box monospace. Nếu có `_vgResult.deals`, tự động liệt kê các deals hợp lệ chưa hết hạn ở cuối tin nhắn.
- **Logic Tab 3 (Todo List):**
  - Hiển thị danh sách checkbox. Thêm class `.todo-item.done` khi checkbox được tick để gạch ngang text qua CSS.
  - Quét `_vgResult.checklist_per_day` tìm các check có `status = "needs_verification"`, trích xuất `action_required` để thêm vào Nhóm C.
- **Hỗ trợ Copy:**
  - Viết các hàm copy plain text (văn bản thuần) tương ứng cho 3 tab.
  - Tab 3 khi copy sẽ chuyển đổi checkbox thành `[ ]` hoặc `[x]`.

## 4. Các file bị ảnh hưởng (Affected Files)
1. `c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\planner\japan-planner-phase5.html` (Tạo mới)
2. `c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI\Implementation Plan\option_b_implementation_plan_20260601.md` (Cập nhật)
3. `c:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI\Implementation Plan\huong_dan_phuong_an_b_20260601.md` (Cập nhật)

## 5. Rủi ro & Biện pháp giảm thiểu (Risks & Mitigations)
- **Rủi ro:** Lỗi JavaScript khi `_flightResult` hoặc `_vgResult` không có đủ dữ liệu mong đợi.
  - *Giảm thiểu:* Thêm các kiểm tra điều kiện an toàn (`if`, `Array.isArray`, `&&`) để tránh crash trang web.
- **Rủi ro:** Khi nhấn nút "Nhập lại", Section 8 vẫn hiển thị dữ liệu cũ.
  - *Giảm thiểu:* Cập nhật hàm `resetForm()` để ẩn Section 8, clear các tab content và reset `_vgResult = null`.

## 6. Auditor Review
Kính mời Codex/Auditor rà soát thiết kế tích hợp Phase 5:
- Đảm bảo Section 8 chỉ hiển thị khi Section 7 hoàn tất.
- Đảm bảo không sử dụng thư viện ngoài hay CDN theo quy định của dự án.
- Đảm bảo định dạng copy text là plain text thuần túy.
