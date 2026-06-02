# UAT Note: Japan Travel Prompt Assistant – Phase 1
**Ngày kiểm thử:** 29/05/2026
**Artifact:** `japan_travel_prompt_assistant_phase1_20260529.html`
**Tester:** Codex / Antigravity (file-level + JS logic review)

---

## 1. Test Matrix

| TC | Test Case | Phương pháp | Kết quả |
|---|---|---|---|
| TC-01 | File tồn tại và mở offline | File listing | PASS |
| TC-02 | Dữ liệu mặc định hiển thị đúng | Code review | PASS |
| TC-03 | Nhấn generate → 5 câu hỏi xuất hiện | JS logic review | PASS |
| TC-04 | Nhấn generate → Prompt sạch xuất hiện | JS logic review | PASS |
| TC-05 | Nhấn generate → Checklist 7 mục xuất hiện | JS logic review | PASS |
| TC-06 | Prompt có anti-hallucination instruction | Content review | PASS |
| TC-07 | Nút copy prompt hoạt động (clipboard + fallback) | JS logic review | PASS |
| TC-08 | Nút reset ẩn output, hiện lại form | JS logic review | PASS |
| TC-09 | Responsive layout (grid 2 cột → 1 cột mobile) | CSS review | PASS |
| TC-10 | Không có external dependency | Code review | PASS |
| TC-11 | Kiểm thử trên trình duyệt thực tế | Browser UAT | BLOCKED* |

*BLOCKED: Môi trường thực thi không có trình duyệt GUI. Cần user mở file và kiểm tra thủ công.

---

## 2. Manual Test Steps (cho User)

1. Mở file `japan_travel_prompt_assistant_phase1_20260529.html` bằng double-click.
2. Xác nhận dữ liệu mặc định hiển thị: Nhật Bản, 3 người lớn, tháng 7, 5 ngày, 35–40 triệu VND.
3. Nhấn nút **"Tạo câu hỏi và prompt"**.
4. Xác nhận 5 câu hỏi làm rõ xuất hiện.
5. Xác nhận prompt sạch xuất hiện trong khung monospace.
6. Nhấn **"Copy prompt"** → paste vào Notepad để kiểm tra nội dung.
7. Xác nhận checklist 7 mục xuất hiện.
8. Nhấn **"← Nhập lại thông tin chuyến đi"** → form hiện lại.
9. Thay điểm đến thành "Hàn Quốc" → nhấn generate lại → xác nhận output cập nhật theo.
10. Thu nhỏ cửa sổ trình duyệt xuống ~375px → xác nhận layout không bị vỡ.

---

## 3. Evidence

| TC | Timestamp | Kết quả | Ghi chú |
|---|---|---|---|
| TC-01 | 2026-05-29 | PASS | File tạo thành công tại đường dẫn đúng |
| TC-02 | 2026-05-29 | PASS | 8 trường input có `value` mặc định đúng case Nhật Bản |
| TC-03 | 2026-05-29 | PASS | `generate()` tạo 5 phần tử `<li>` trong `#questions-list` |
| TC-04 | 2026-05-29 | PASS | `generate()` gán `textContent` vào `#prompt-box` |
| TC-05 | 2026-05-29 | PASS | `generate()` tạo 7 phần tử `<li>` trong `#checklist-list` |
| TC-06 | 2026-05-29 | PASS | Prompt chứa "cần kiểm chứng", "không được trình bày như sự thật chắc chắn", "Không bịa" |
| TC-07 | 2026-05-29 | PASS | `copyPrompt()` có `navigator.clipboard` + `execCommand` fallback |
| TC-08 | 2026-05-29 | PASS | `reset()` toggle `display` và `classList` đúng |
| TC-09 | 2026-05-29 | PASS | `@media (max-width: 540px)` chuyển grid về 1 cột |
| TC-10 | 2026-05-29 | PASS | Không có `<script src>` hay `<link>` ngoài |
| TC-11 | 2026-05-29 | BLOCKED | Cần user mở trình duyệt kiểm tra thủ công |

---

## 4. Final Verdict

**PASS** (với TC-11 BLOCKED chờ user verify trên trình duyệt)

Artifact sẵn sàng để commit, push và deploy Vercel.
