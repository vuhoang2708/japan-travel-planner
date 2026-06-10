# Kế hoạch thực hiện Re-test — Tourist Agent Wizard Edition v2

## Đề bài (Objective)
Thực hiện chạy kiểm thử lại (`re-test`) các trường hợp lỗi đã được xử lý trong bản vá mới tại `URL` live: https://touristagent.vercel.app/planner/tourist-agent-v2.html.
Cập nhật kết quả vào báo cáo `UAT/uat_report_20260610.md` và thực hiện `stage` / `commit` kết quả vào `repository` (kho lưu trữ mã nguồn).

## Hiện trạng (Current State)
- Các lỗi về địa danh (B-04, C-03, E-08, G-03) đã được giải quyết qua cơ chế tổng quát hóa (`generic`).
- 5 lỗi thực tế (F-02, G-01, A-01, F-01, X-05) đã được sửa trong commit `54f978e` và được triển khai tự động lên `Vercel`.
- Cần thực hiện kiểm chứng thực tế (`verification`) xem lỗi đã hết chưa để nghiệm thu đạt trạng thái `PASS` hoàn toàn.

## Giải pháp kỹ thuật (Technical Approach)
1. Sử dụng công cụ `browser_subagent` (trình kiểm duyệt tự động phụ) để truy cập URL live.
2. Kiểm tra trực tiếp 5 điểm vá lỗi:
   - **A-01:** Xem có emoji `✈️` ở đầu header `✈️ Tourist Agent` chưa.
   - **B-04 / C-03 / E-08 / G-03:** Thay đổi điểm đến thành "Hàn Quốc" xem lịch trình, việc cần làm có còn rò rỉ địa danh Nhật Bản/mã sân bay không.
   - **F-01:** Xem tại Bước 4 có nút "← Quay lại Bước 3" chưa.
   - **F-02:** Xem nút "Quay lại từ đầu" có reset sạch form Bước 1 về giá trị mặc định ban đầu không.
   - **G-01:** Kiểm tra layout trên màn hình 375px ở Bước 2 xem các nút hành động đã xếp dọc và hiển thị vừa vặn không.
   - **X-05:** Kiểm tra validation ở Bước 1 bằng cách nhập dữ liệu không hợp lệ (số ngày = 0 hoặc 31, số khách = 0, ngân sách = -1) xem có hiển thị cảnh báo lỗi/chặn chuyển bước không.
3. Chụp hình/video bằng chứng kiểm thử mới.
4. Cập nhật nội dung file `UAT/uat_report_20260610.md` chuyển trạng thái sang `PASS` và kết luận tổng thể đạt `PASS`.
5. Thực hiện `git add` và `git commit` các file báo cáo và kế hoạch vào nhánh hiện tại.

## Các file bị ảnh hưởng (Affected Files)
- `[MODIFY] UAT/uat_report_20260610.md` (Cập nhật báo cáo UAT).
- `[MODIFY] UAT/uat_tourist_agent_v2.webp` (Cập nhật video bằng chứng).

## Rủi ro tiềm ẩn (Risks & Mitigations)
- **Rủi ro:** Vercel chưa hoàn tất deploy bản build mới khi bắt đầu test.
- **Biện pháp giảm thiểu:** Kiểm tra header của trang hoặc kiểm tra DOM của emoji máy bay trước để chắc chắn bản build mới đã có hiệu lực trên live URL.

## Auditor Review
- Codex review kế hoạch và cho ý kiến phản biện (nếu có).
