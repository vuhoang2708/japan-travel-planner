# Copy prompt cho agent khác: tạo visual case Nhật Bản và gắn vào material hiện tại
**Ngày tạo:** 29/05/2026  
**Mục tiêu:** Dán prompt này cho agent khác để tạo infographic/PPT/visual material từ case du lịch Nhật Bản, sau đó gắn vào bộ học liệu AI Agent hiện tại.

---

## Prompt copy-paste

```text
Bạn là một agent hỗ trợ thiết kế học liệu và cập nhật file trong repo.

Bối cảnh:
Tôi đang có bộ học liệu cho buổi đào tạo "AI Agent & Tối ưu hóa Prompt" trong thư mục:
C:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI

Case mới cần thêm:
"Du lịch Nhật Bản 5 ngày cho gia đình 3 người lớn, đi tháng 7, ngân sách 35-40 triệu VND/người, ưu tiên cảnh đẹp tự nhiên và quán ăn local ngon."

Mục tiêu đào tạo của case:
Giúp người mới hiểu cách đi từ một câu hỏi đời thường sang:
1. Prompt tốt.
2. Tư duy IPO - Input, Process, Output.
3. Vibe coding - mô tả công cụ muốn có để AI Agent build bản nháp.
4. Các mức tự động hóa từ thấp đến cao.
5. Verification gate - cổng kiểm chứng trước khi tin kết quả.
6. Human approval - con người phê duyệt trước quyết định liên quan đến tiền/đặt dịch vụ.

Nguồn nội dung cần đọc trước:
1. Implementation Plan/japan_travel_infographic_ppt_content_20260529.md
2. Implementation Plan/japan_travel_vibe_coding_agent_prompt_20260529.md
3. Implementation Plan/survey_training_alignment_20260529.md
4. student_message_preread_ai_agent_friday_20260529.md
5. notebooklm_preread_source_ai_agent_friday_20260529.md
6. README.md

Yêu cầu đầu ra:
Hãy tạo một trong hai phương án sau, ưu tiên phương án A nếu có thể:

Phương án A - Infographic / visual page:
- Tạo một file HTML hoặc Markdown visual dễ đọc cho người mới.
- Tên file đề xuất:
  japan_travel_ai_agent_infographic_20260529.html
  hoặc
  japan_travel_ai_agent_infographic_20260529.md
- Nội dung phải gồm:
  1. Bài toán ban đầu.
  2. Rủi ro nếu chỉ hỏi AI chung chung.
  3. IPO: Đầu vào -> Xử lý -> Đầu ra.
  4. 5 mức độ tự động hóa.
  5. Vibe coding là gì.
  6. Verification gate và human approval.
  7. Bài học chốt cho người mới.

Phương án B - PPT storyboard:
- Tạo một file Markdown storyboard cho deck 8 slide.
- Tên file đề xuất:
  japan_travel_ai_agent_ppt_storyboard_20260529.md
- Nội dung phải gồm 8 slide:
  1. Từ câu hỏi du lịch Nhật đến AI Agent.
  2. Vấn đề khi hỏi AI chung chung.
  3. Tư duy IPO.
  4. Mức 1-2: AI hỏi đúng và viết prompt sạch.
  5. Mức 3: AI tạo lịch trình nháp.
  6. Mức 4: thêm cổng kiểm chứng.
  7. Mức 5: Agent workflow bán tự động.
  8. Bài học chốt.

Yêu cầu ngôn ngữ:
- Viết bằng tiếng Việt.
- Dành cho người mới.
- Nếu dùng thuật ngữ tiếng Anh như vibe coding, AI Agent, verification gate, human approval, phải giải thích ngay bằng tiếng Việt.
- Không viết như quảng cáo du lịch.
- Không được bịa giá vé, khách sạn, giờ mở cửa hoặc thông tin visa như sự thật chắc chắn.
- Những thông tin có thể thay đổi phải ghi rõ là cần kiểm chứng.

Yêu cầu gắn vào material hiện tại:
Sau khi tạo file mới, hãy cập nhật các file sau nếu phù hợp:

1. README.md
   - Thêm dòng entry point mới dưới phần Entry Points hoặc Pre-read Flow:
     "Japan Travel AI Agent case: <tên file mới>"

2. student_message_preread_ai_agent_friday_20260529.md
   - Thêm một đoạn ngắn trong phần tài liệu xem trước hoặc trang showcase:
     "Case bonus: Từ kế hoạch du lịch Nhật Bản đến AI Agent - ví dụ dễ hiểu về prompt, vibe coding và kiểm chứng."
   - Không làm tin nhắn dài quá. Chỉ thêm 1-2 dòng.

3. Implementation Plan/survey_training_alignment_20260529.md
   - Đảm bảo đã có link tới file mới ở phần case Nhật Bản.

4. Implementation Plan/handoff_notebooklm_preread_artifact_pack_20260529.md
   - Thêm vào phần liên kết tài liệu phục vụ UAT hoặc phần bàn giao:
     "Japan Travel AI Agent visual/storyboard: <tên file mới>"

5. notebooklm_preread_source_ai_agent_friday_20260529.md
   - Chỉ cập nhật nếu thật sự cần đưa case này vào source chính.
   - Nếu cập nhật, thêm một mục ngắn ở phần case study/demo, không làm loãng nội dung chính.

Ràng buộc an toàn:
- Không xóa hoặc thay đổi các link NotebookLM đã verify hiện tại.
- Không đổi tên file cũ.
- Không chỉnh nội dung ngoài phạm vi case Nhật Bản.
- Không commit/push trừ khi được yêu cầu riêng.
- Nếu không chắc file nào nên cập nhật, chỉ tạo file mới và ghi rõ đề xuất cập nhật trong báo cáo.

Quy trình làm việc:
1. Đọc các file nguồn đã nêu.
2. Tạo file visual/storyboard mới.
3. Cập nhật các file material hiện tại theo phạm vi an toàn.
4. Kiểm tra lại bằng cách đọc các đoạn vừa sửa.
5. Báo cáo:
   - File mới đã tạo.
   - File hiện có đã cập nhật.
   - Những gì chưa làm và lý do.
```

---

## Gợi ý dùng nhanh

Nếu chỉ muốn agent tạo file visual mà chưa gắn vào material, dùng câu rút gọn:

```text
Đọc `Implementation Plan/japan_travel_infographic_ppt_content_20260529.md` và tạo một file HTML infographic offline cho người mới, tên `japan_travel_ai_agent_infographic_20260529.html`. Chưa cập nhật file khác.
```

Nếu muốn agent gắn vào material sau khi tạo xong:

```text
Sau khi tạo file visual case Nhật Bản, cập nhật `README.md`, `student_message_preread_ai_agent_friday_20260529.md`, `Implementation Plan/survey_training_alignment_20260529.md`, và `Implementation Plan/handoff_notebooklm_preread_artifact_pack_20260529.md` bằng link tương đối tới file mới. Không thay link NotebookLM hiện tại.
```
