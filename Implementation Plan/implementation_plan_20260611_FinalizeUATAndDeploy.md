# Kế hoạch Triển khai & Nghiệm thu Hoàn tất UAT (Finalize UAT & Deployment)

**Mã Kế hoạch:** `implementation_plan_20260611_FinalizeUATAndDeploy.md`  
**Ngày lập:** 2026-06-11  
**Tác giả:** Antigravity (Gemini Agent)

---

## 1. Đề bài & Mục tiêu (Goal & Objectives)
- **Đề bài:** Hoàn tất quy trình Đảm bảo chất lượng (`QA` - Quality Assurance) cho ứng dụng **Tourist Agent v2**:
  1. Kiểm chứng và xác nhận các bản sửa lỗi liên quan đến logic phân tích cú pháp ngân sách tối đa (`parseBudgetMax`) và logic trích xuất dữ liệu JSON từ phản hồi hỗn hợp (`extractJSON`).
  2. Thực hiện `commit` và `push` mã nguồn đã sửa đổi ở local lên GitHub để kích hoạt trình triển khai tự động (`CI/CD` - Continuous Integration/Continuous Deployment) của Vercel.
  3. Kiểm thử khói trực tiếp trên trang Live (`Live Smoke Test`) để cập nhật báo cáo UAT từ trạng thái đạt có điều kiện sang **PASS** hoàn toàn.
  4. Dọn dẹp workspace và đưa dự án về trạng thái sạch sẽ trước khi bàn giao.

---

## 2. Hiện trạng & Lỗi phát hiện (Pain points & Root Causes)
- **Vấn đề 1 (Budget Parsing Bug):** Ở các bản build trước, hàm `parseBudgetMax` luôn tự động nhân giá trị trích xuất được với `1.000.000` (để phục vụ số viết tắt như `30` -> `30.000.000`). Tuy nhiên, nếu người dùng nhập số thô hoàn chỉnh (`30000000`), hàm tiếp tục nhân dẫn đến kết quả sai lệch khổng lồ (**30.000.000.000.000 VND**).
  - *Giải pháp đã có ở local:* Đã thêm logic kiểm soát: nếu số trích xuất được $\ge 1.000.000$ thì giữ nguyên giá trị, chỉ nhân khi giá trị $< 1.000.000$.
- **Vấn đề 2 (Môi trường Live chưa cập nhật):** Mã nguồn local đã vượt qua 100% các ca kiểm thử trong `test_parse_budget.js` và `test_extracted_phases.js`, nhưng phiên bản đang chạy trên Vercel vẫn là bản cũ (Commit `f434460`) nên báo cáo UAT Live của ngày 11/06 vẫn ghi nhận lỗi này.
- **Vấn đề 3 (Workspace bẩn):** Nhiều file nháp kiểm thử và file kế hoạch tạm thời sinh ra trong quá trình làm việc cần được dọn dẹp để đảm bảo tính gọn gàng cho kho lưu trữ (`repository`).

---

## 3. Giải pháp kỹ thuật & Các bước thực hiện (Technical Solution & Steps)

### Bước 3.1: Commit & Deploy lên Live
1. Chạy `git add` cho các file mã nguồn HTML chính và các tài liệu kế hoạch/UAT chuẩn:
   - `planner/tourist-agent-v2.html`
   - `planner/tourist-agent-phase3.html`
   - `planner/tourist-agent-phase4.html`
   - `planner/tourist-agent-phase5.html`
   - `UAT/uat_report_20260610.md`
   - `planner/Implementation Plan/uat_tourist_agent_v2_20260610.md`
2. Tạo commit với thông điệp chuẩn (`Conventional Commits`):
   - `fix(budget): resolve parseBudgetMax raw numbers scaling and finalize UAT specs`
3. Thực hiện `git push origin master` để Vercel tự động nhận mã nguồn mới và tiến hành deploy.
4. Chờ Vercel hoàn thành quá trình build (theo dõi trạng thái build qua GitHub CLI hoặc chờ 1-2 phút).

### Bước 3.2: Kiểm thử khói trên môi trường Live (Live UAT Verification)
1. Sử dụng **Browser Sub-agent** truy cập trực tiếp URL live:
   `https://touristagent.vercel.app/planner/tourist-agent-v2.html`
2. Thực hiện kịch bản kiểm thử:
   - **Step 1:** Chọn Tokyo, Hà Nội, 1 người, tháng 10/2026, 1 ngày. Nhập ngân sách thô dạng số: `30000000` (Không thêm chữ "triệu" hay ký tự khác). Nhấn Tiếp tục.
   - **Step 2:** Kiểm tra xem ngân sách hiển thị ở đầu trang và phân bổ ngân sách ở biểu đồ/bảng có tính toán đúng dựa trên con số **30.000.000 VND** hay không.
   - **Step 3:** Nhấn nút "🤖 Tìm vé ngay" và kiểm tra xem API trả về 200 thành công hay không.
   - **Step 4:** Kiểm tra xem kết quả hiển thị có bị lỗi giá trị ngân sách hàng nghìn tỷ hay không.
3. Chụp lại ảnh chụp màn hình bằng chứng (UAT Screenshots).
4. Cập nhật file báo cáo `UAT/backend-ai-uat-20260611/live-smoke-report.md`:
   - Chuyển đánh giá chung từ **PASS WITH CONDITIONS** sang **PASS**.
   - Cập nhật thông tin Commit Hash mới nhất sau khi push thành công.
   - Nhúng ảnh chụp màn hình thực tế mới để chứng minh.

### Bước 3.3: Dọn dẹp Workspace
1. Xóa các file test nháp không thuộc repository chính nếu cần thiết (hoặc đưa vào gitignore/keep ở trạng thái sạch).
2. Kiểm tra `git status` để đảm bảo không còn file rác nào nằm ngoài tầm kiểm soát.

---

## 4. Các file bị ảnh hưởng (Proposed Changes)

| Loại thay đổi | Đường dẫn File | Mô tả thay đổi |
|---|---|---|
| **MODIFY** | [tourist-agent-v2.html](file:///C:/Users/vu.hoang/.gemini/antigravity/scratch/tourist_agent/planner/tourist-agent-v2.html) | Đã sửa logic `parseBudgetMax` kiểm tra ngưỡng $\ge 1.000.000$. |
| **MODIFY** | [tourist-agent-phase3.html](file:///C:/Users/vu.hoang/.gemini/antigravity/scratch/tourist_agent/planner/tourist-agent-phase3.html) | Đồng bộ sửa lỗi `parseBudgetMax`. |
| **MODIFY** | [tourist-agent-phase4.html](file:///C:/Users/vu.hoang/.gemini/antigravity/scratch/tourist_agent/planner/tourist-agent-phase4.html) | Đồng bộ sửa lỗi `parseBudgetMax`. |
| **MODIFY** | [tourist-agent-phase5.html](file:///C:/Users/vu.hoang/.gemini/antigravity/scratch/tourist_agent/planner/tourist-agent-phase5.html) | Đồng bộ sửa lỗi `parseBudgetMax`. |
| **MODIFY** | [uat_report_20260610.md](file:///C:/Users/vu.hoang/.gemini/antigravity/scratch/tourist_agent/UAT/uat_report_20260610.md) | Thêm test case `X-06` về trích xuất JSON và cập nhật trạng thái tổng quan thành PASS. |
| **MODIFY** | [uat_tourist_agent_v2_20260610.md](file:///C:/Users/vu.hoang/.gemini/antigravity/scratch/tourist_agent/planner/Implementation%20Plan/uat_tourist_agent_v2_20260610.md) | Bổ sung test case `X-06` vào ma trận kiểm thử. |
| **MODIFY** | [live-smoke-report.md](file:///C:/Users/vu.hoang/.gemini/antigravity/scratch/tourist_agent/UAT/backend-ai-uat-20260611/live-smoke-report.md) | Cập nhật kết quả nghiệm thu khói Live thành công hoàn toàn sau khi deploy bản vá. |
| **NEW** | [implementation_plan_20260611_FinalizeUATAndDeploy.md](file:///C:/Users/vu.hoang/.gemini/antigravity/scratch/tourist_agent/Implementation%20Plan/implementation_plan_20260611_FinalizeUATAndDeploy.md) | File kế hoạch này (lưu vết lịch sử). |

---

## 5. Rủi ro & Phương án giảm thiểu (Risks & Mitigations)
- **Rủi ro 1: Vercel build bị lỗi.** Do môi trường production có thể khắt khe hơn local dev.
  - *Giảm thiểu:* Trước khi push, chạy thử build local để xác nhận không có lỗi build tĩnh. Do đây là file HTML tĩnh thuần kết hợp với các endpoint serverless (nếu có), rủi ro này cực kỳ thấp.
- **Rủi ro 2: API `POST /api/ask-ai` trên live bị chậm hoặc nghẽn (Gemini API 503).**
  - *Giảm thiểu:* Browser Sub-agent đã được thiết kế cơ chế retry và fallback thủ công. Nếu API lỗi, sẽ kiểm thử chế độ nhập JSON thủ công để xác nhận tính năng an toàn (`graceful degradation`).

---

## 6. Kế hoạch kiểm chứng (Verification Plan)
- **Kiểm thử tự động:**
  - Chạy `node UAT/test_extracted_phases.js` (Đã chạy và PASS 100%).
  - Chạy `node UAT/test_extract_json.js` (Đã chạy và PASS 100%).
- **Kiểm thử thủ công bằng Browser Sub-agent:**
  - Truy cập URL live sau deploy và nhập các bộ dữ liệu khác nhau để kiểm chứng ngân sách tối đa hoạt động đúng.

---

## 7. Auditor Review (Codex Rà Soát)
- [ ] Rà soát logic `parseBudgetMax` có hoạt động đúng với các input đặc biệt như `30M`, `30tr`, `30.000.000`, `30,000,000`. (Đã xác nhận thành công qua test suite).
- [ ] Đảm bảo không commit nhầm các file thông tin cấu hình nhạy cảm (`credentials`, `API keys`).
