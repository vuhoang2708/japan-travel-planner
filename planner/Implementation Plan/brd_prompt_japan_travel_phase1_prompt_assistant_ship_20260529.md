# BRD Prompt: Phase 1 Japan Travel Prompt Assistant + Docs + GitHub Ship
**Ngày tạo:** 29/05/2026  
**Mục tiêu:** Copy prompt này cho agent khác để thực hiện ngay Phase 1 của case Japan Travel AI Agent, bao gồm build artifact, tạo tài liệu, kiểm thử, commit và push GitHub.

---

## Copy prompt cho agent thực hiện

```text
Bạn là một implementation agent nhận BRD và phải thực hiện end-to-end trong repo.

Workspace:
C:\Users\vu.hoang\.gemini\antigravity\scratch\training_AI

Repo GitHub:
origin = https://github.com/vuhoang2708/training_AI.git

BRD title:
Phase 1 - Japan Travel Prompt Assistant

Business context:
Bộ học liệu "AI Agent & Tối ưu hóa Prompt" đang có một case mới: lập kế hoạch du lịch Nhật Bản tự túc cho gia đình 3 người lớn, đi tháng 7 trong 5 ngày, ngân sách 35-40 triệu VND/người, ưu tiên cảnh đẹp tự nhiên và quán ăn local ngon.

Mục tiêu Phase 1:
Tạo một artifact đơn giản để người mới hiểu mức tự động hóa thấp nhất:
AI chưa lập lịch trình ngay, mà giúp người dùng:
1. Làm rõ nhu cầu bằng 5 câu hỏi.
2. Tạo prompt sạch để copy sang Gemini/ChatGPT/Claude.
3. Tạo checklist kiểm chứng trước khi tin kết quả.

Nguồn bắt buộc phải đọc trước khi làm:
1. Implementation Plan/japan_travel_vibe_coding_agent_prompt_20260529.md
2. Implementation Plan/japan_travel_infographic_ppt_content_20260529.md
3. Implementation Plan/survey_training_alignment_20260529.md
4. README.md
5. student_message_preread_ai_agent_friday_20260529.md
6. Implementation Plan/handoff_notebooklm_preread_artifact_pack_20260529.md

Problem statement:
Người học mới thường hỏi AI bằng câu quá rộng như "lập lịch đi Nhật 5 ngày". Kết quả dễ nghe hay nhưng khó dùng vì thiếu ràng buộc, thiếu giả định, thiếu bước kiểm chứng. Phase 1 phải minh họa rằng AI Agent tốt bắt đầu bằng việc hỏi lại và chuẩn hóa yêu cầu, không vội tạo kết quả cuối.

Scope in:
1. Tạo artifact Phase 1 dạng HTML offline, không backend.
2. Artifact phải giúp người dùng nhập nhu cầu du lịch và nhận:
   - 5 câu hỏi làm rõ.
   - Prompt sạch đã cấu trúc.
   - Checklist kiểm chứng.
3. Tạo tài liệu BRD/technical note/UAT note cho Phase 1.
4. Cập nhật README và các material liên quan bằng link tới artifact Phase 1.
5. Kiểm thử artifact.
6. Commit và push lên GitHub.

Scope out:
1. Không build Phase 2-5.
2. Không tạo lịch trình chi tiết thật.
3. Không bịa giá vé, khách sạn, giờ mở cửa, visa, thời tiết như dữ liệu chắc chắn.
4. Không thay link NotebookLM đã verify.
5. Không chỉnh các phần không liên quan đến Japan Travel Phase 1.

Functional requirements:
Tạo file:
japan_travel_prompt_assistant_phase1_20260529.html

Artifact HTML phải có:
1. Header ngắn:
   "Japan Travel Prompt Assistant - Phase 1"
2. Mô tả dễ hiểu:
   "Mục tiêu của Phase 1 là giúp bạn hỏi đúng trước khi yêu cầu AI lập lịch trình."
3. Form nhập liệu:
   - Điểm đến
   - Số người
   - Tháng đi
   - Số ngày
   - Ngân sách mỗi người
   - Sở thích chính
   - Nhịp độ mong muốn
   - Điều cần tránh hoặc ràng buộc đặc biệt
4. Nút tạo kết quả:
   "Tạo câu hỏi và prompt"
5. Output 1 - 5 câu hỏi làm rõ:
   Ví dụ:
   - Bạn muốn tập trung ở một vùng hay đi nhiều thành phố?
   - Ngân sách đã gồm vé máy bay và khách sạn chưa?
   - Có ai cần hạn chế đi bộ/di chuyển nhiều không?
   - Ưu tiên thiên nhiên, ăn uống, văn hóa hay mua sắm theo thứ tự nào?
   - Bạn muốn lịch thư thả hay tối ưu nhiều điểm tham quan?
6. Output 2 - Prompt sạch:
   Prompt phải yêu cầu AI:
   - Không lập lịch ngay nếu còn thiếu dữ liệu.
   - Ghi rõ giả định.
   - Xuất bảng lịch trình nháp.
   - Tách thông tin chắc và thông tin cần kiểm chứng.
   - Không bịa giá/giờ mở cửa/visa như sự thật.
7. Output 3 - Checklist kiểm chứng:
   - Vé máy bay
   - Khách sạn
   - Giờ mở cửa
   - Thời tiết tháng đi
   - Visa/giấy tờ
   - Khoảng cách di chuyển
   - Tổng ngân sách trước khi đặt dịch vụ
8. Có nút copy prompt nếu có thể làm bằng JavaScript thuần.
9. Có dữ liệu mặc định sẵn cho case:
   - Nhật Bản
   - 3 người lớn
   - tháng 7
   - 5 ngày
   - 35-40 triệu VND/người
   - cảnh đẹp tự nhiên, quán ăn local ngon
   - không quá vội

Non-functional requirements:
1. HTML chạy offline bằng double-click.
2. Không dùng thư viện ngoài.
3. Giao diện rõ ràng cho người mới.
4. Responsive trên laptop và mobile.
5. Text không tràn khỏi button/card/table.
6. Không dùng landing page marketing; màn hình đầu tiên phải là công cụ dùng được.

Documentation requirements:
Tạo các file sau:

1. Implementation Plan/brd_japan_travel_prompt_assistant_phase1_20260529.md
   Nội dung:
   - Business goal
   - User problem
   - Scope in/out
   - Functional requirements
   - Acceptance criteria
   - Risks and mitigations

2. Implementation Plan/technical_note_japan_travel_prompt_assistant_phase1_20260529.md
   Nội dung:
   - File artifact path
   - UI sections
   - JavaScript behavior
   - Data assumptions
   - Safety boundaries
   - How to reuse for another destination

3. Implementation Plan/uat_japan_travel_prompt_assistant_phase1_20260529.md
   Nội dung:
   - Test matrix
   - Manual test steps
   - Evidence rows with timestamp
   - PASS/FAIL/BLOCKED
   - Final verdict

Material update requirements:
Update these files safely:

1. README.md
   Add a new entry under Entry Points or Pre-read Flow:
   "Japan Travel Prompt Assistant Phase 1: japan_travel_prompt_assistant_phase1_20260529.html"

2. Implementation Plan/survey_training_alignment_20260529.md
   Add link/reference to the Phase 1 artifact in the Japan Travel section.

3. Implementation Plan/japan_travel_vibe_coding_agent_prompt_20260529.md
   Add reference to Phase 1 artifact and docs.

4. Implementation Plan/japan_travel_infographic_ppt_content_20260529.md
   Add reference to Phase 1 artifact if useful.

5. Implementation Plan/handoff_notebooklm_preread_artifact_pack_20260529.md
   Add a short handoff line:
   "Japan Travel Prompt Assistant Phase 1: <file path>"

Do not update `notebooklm_preread_source_ai_agent_friday_20260529.md` unless you can keep the addition very short and clearly scoped. If uncertain, leave it unchanged and mention in final report.

Acceptance criteria:
1. HTML artifact exists and opens offline.
2. Default Japan case values are visible.
3. Clicking the generate button produces:
   - 5 clarification questions.
   - A clean prompt.
   - Verification checklist.
4. Generated prompt includes explicit anti-hallucination/verification instruction.
5. Documentation files exist and are specific to Phase 1.
6. README and handoff references point to actual files.
7. `git status --short` is reviewed before staging.
8. Only intended files are staged.
9. Commit is created.
10. Branch is pushed to GitHub.

Required verification commands:
Run these or equivalent:

1. List created files:
   Get-ChildItem -Force | Select-Object Name,Length,LastWriteTime

2. Read the artifact and docs enough to verify content:
   Get-Content -Encoding UTF8 <file>

3. Check git state:
   git status --short --branch

4. Review diff:
   git diff -- <intended files>

5. After commit:
   git show --stat --oneline HEAD

6. After push:
   git status --short --branch

Git instructions:
1. Before staging, run `git status --short --branch`.
2. Do not stage unrelated files.
3. Commit message:
   Add Japan travel prompt assistant phase 1
4. Push active branch to origin.
5. Final report must include:
   - Branch name.
   - Commit SHA.
   - Push result.
   - Files created.
   - Files updated.
   - Files intentionally left untouched.

Safety rules:
1. Never claim push success without command output.
2. Never claim file exists without reading/listing it.
3. If Git push fails, report BLOCKED and include exact error.
4. If unrelated local changes exist, leave them uncommitted and list them.
5. If browser testing is unavailable, perform file-level and JS logic review, then mark browser UAT as BLOCKED rather than PASS.

Final response format:
Use this exact structure:

## Verdict
PASS / BLOCKED / FAIL

## Created
- ...

## Updated
- ...

## Verification
- ...

## GitHub
- Branch:
- Commit:
- Push:

## Notes
- ...
```

---

## Ghi chú cho người giao việc

Prompt này yêu cầu agent làm cả implementation, docs, UAT note, README/handoff update, commit và push. Nếu chỉ muốn agent tạo artifact mà chưa ship GitHub, hãy xóa phần `Git instructions` và `Material update requirements` trước khi gửi.
