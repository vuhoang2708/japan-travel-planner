# Technical Note: Japan Travel Prompt Assistant – Phase 1
**Ngày tạo:** 29/05/2026
**Artifact:** `japan_travel_prompt_assistant_phase1_20260529.html`

---

## 1. File Artifact Path

```
C:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI\japan_travel_prompt_assistant_phase1_20260529.html
```

Vercel URL (sau khi deploy): `https://ai-agent-preread-lms.vercel.app/japan_travel_prompt_assistant_phase1_20260529`

---

## 2. UI Sections

| Section | ID / Element | Mô tả |
|---|---|---|
| Header | `.header` | Badge Phase 1, tiêu đề, mô tả mục tiêu |
| Form card | `#form-card` | 8 trường nhập liệu, dữ liệu mặc định sẵn |
| Output section | `#output-section` | Ẩn mặc định, hiện sau khi nhấn generate |
| Output 1 | `#questions-list` | 5 câu hỏi làm rõ dạng `<ul>` |
| Output 2 | `#prompt-box` | Prompt sạch dạng `<pre>` monospace |
| Output 3 | `#checklist-list` | Checklist 7 mục dạng `<ul>` |
| Copy button | `copyPrompt()` | Clipboard API + execCommand fallback |
| Reset link | `reset()` | Ẩn output, hiện lại form |

---

## 3. JavaScript Behavior

### `generate()`
- Đọc giá trị từ 8 trường input.
- Tạo 5 câu hỏi làm rõ bằng template string, nhúng giá trị input vào.
- Tạo prompt sạch với cấu trúc 4 phần + quy tắc anti-hallucination.
- Tạo checklist 7 mục, nhúng tháng đi và ngân sách vào nội dung.
- Render vào DOM, ẩn form, hiện output, scroll đến output.

### `copyPrompt()`
- Dùng `navigator.clipboard.writeText()` (async).
- Fallback: tạo `<textarea>` ẩn, `select()`, `execCommand('copy')`.
- Hiện feedback "✓ Đã copy!" trong 2 giây.

### `reset()`
- Ẩn output section, hiện lại form card.
- Scroll về đầu trang.

---

## 4. Data Assumptions

- Không có dữ liệu live. Tất cả output được tạo từ template string dựa trên input người dùng.
- Câu hỏi và checklist là template cố định, được cá nhân hóa bằng cách nhúng giá trị input (điểm đến, tháng, ngân sách, nhóm đi).
- Prompt sạch nhúng toàn bộ 8 trường input vào cấu trúc cố định.

---

## 5. Safety Boundaries

- Không gọi API ngoài.
- Không lưu dữ liệu người dùng (không localStorage, không cookie).
- Không có nút đặt vé hoặc thanh toán.
- Prompt box có warning note nhắc người dùng kiểm tra nếu AI bỏ qua anti-hallucination instruction.
- Checklist có warning note nhắc kiểm chứng trước khi đặt dịch vụ.

---

## 6. How to Reuse for Another Destination

1. Mở file HTML.
2. Thay giá trị mặc định trong các trường input (điểm đến, tháng, ngân sách...).
3. Nhấn "Tạo câu hỏi và prompt".
4. Câu hỏi, prompt và checklist sẽ tự động cá nhân hóa theo input mới.

Để tạo phiên bản riêng cho điểm đến khác (ví dụ: Hàn Quốc, Châu Âu), chỉ cần thay giá trị `value` trong các thẻ `<input>` và `<textarea>` trong phần form.
