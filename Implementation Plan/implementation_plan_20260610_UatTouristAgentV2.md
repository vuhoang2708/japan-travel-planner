# Kế hoạch thực hiện UAT — Tourist Agent Wizard Edition v2

## Đề bài (Objective)
Thực hiện chạy toàn bộ 33 `test case` (trường hợp kiểm thử) nhóm A đến G, và 4 `edge case` (trường hợp biên) nhóm X cho ứng dụng Tourist Agent Wizard Edition v2 tại `URL` live: https://touristagent.vercel.app/planner/tourist-agent-v2.html.

## Hiện trạng (Current State)
Ứng dụng đã được triển khai lên môi trường live (`Vercel`). Cần thực hiện kiểm thử nghiệm thu để đảm bảo không có lỗi `runtime` (lỗi khi chạy) và các chức năng hoạt động đúng theo đặc tả yêu cầu trong file `uat_tourist_agent_v2_20260610.md`.

## Giải pháp kỹ thuật (Technical Approach)
1. Sử dụng công cụ `browser_subagent` (trình kiểm duyệt tự động phụ) của Antigravity để mở trình duyệt, truy cập vào trang web live.
2. Lần lượt đi qua từng nhóm `test case`:
   - **Nhóm A**: Khởi động & Offline (Kiểm tra giao diện ban đầu và tài nguyên offline).
   - **Nhóm B**: Bước 1 - Nhập thông tin (Kiểm tra form đầu vào và nút mở rộng).
   - **Nhóm C**: Bước 2 - Lịch trình nháp (Kiểm tra render accordion lịch trình).
   - **Nhóm D**: Bước 3 - Vé máy bay (Kiểm tra nút copy prompt, dán JSON mẫu và kiểm tra logic vé).
   - **Nhóm E**: Bước 4 - Kế hoạch cuối (Kiểm tra 3 tab thông tin, copy nội dung text sạch).
   - **Nhóm F**: Navigation & Reset (Kiểm tra các nút điều hướng và khôi phục trạng thái ban đầu).
   - **Nhóm G**: Responsive & UX (Kiểm tra hiển thị trên thiết bị di động/tablet và lỗi Console).
   - **Nhóm X**: Edge Cases (Kiểm tra số ngày tối thiểu/tối đa, JSON sai format).
3. Sử dụng dữ liệu `JSON` mẫu được cung cấp để thực hiện kiểm thử case D-05.
4. Ghi nhận chi tiết kết quả kiểm thử (PASS/FAIL) và chụp ảnh màn hình / lưu video làm bằng chứng (`evidence`).
5. Xuất báo cáo theo đúng mẫu chuẩn tại mục 4 của file UAT script gốc và ghi vào file trong workspace.

## Các file bị ảnh hưởng (Affected Files)
- Không có file mã nguồn nào bị ảnh hưởng.
- Tạo mới file báo cáo UAT trong thư mục dự án: `c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\UAT\uat_report_20260610.md` (để đảm bảo Rule 8.2 và 8.3 - lưu trữ trong repo).

## Rủi ro tiềm ẩn (Risks & Mitigations)
- **Rủi ro**: Trình duyệt có thể gặp sự cố mạng hoặc không định vị được phần tử DOM do cấu trúc động.
- **Biện pháp giảm thiểu**: Sử dụng cơ chế đợi phần tử (`wait_for_selector`) và kiểm tra console log thường xuyên.

## Auditor Review
- Codex review kế hoạch và cho ý kiến phản biện (nếu có).
