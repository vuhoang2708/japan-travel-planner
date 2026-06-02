# Lab Guide: Travel Optimization Agent
**Session:** 03/06/2026  
**Thời lượng:** 30 phút  
**Mục tiêu:** Audience hiểu tool use, multi-skill orchestration, và verification qua bài toán thực tế

## Chuẩn bị
- [ ] Verify AI-Knowledge Mode chạy được (không cần API)
- [ ] Chuẩn bị 3 bài toán mẫu: HAN→SGN, HAN→BKK, HAN→NRT
- [ ] In hoặc share README.md và SKILL.md cho audience
- [ ] Chuẩn bị bảng so sánh output mẫu

## Bài tập từng bước

### 0–5 phút: Giới thiệu
- Giải thích 8 skills: mỗi skill là một "chuyên gia" riêng
- Giải thích AI-Knowledge Mode vs API-Enhanced Mode
- "Hôm nay chúng ta dùng AI-Knowledge Mode — không cần API key, chạy được ngay"

### 5–15 phút: Bài tập 1 — date-optimization
- Audience tự thử với chuyến bay thật của họ (hoặc dùng HAN→SGN)
- Chạy skill date-optimization
- Xem output: bảng so sánh giá theo ngày
- Thảo luận: "Kết quả này có đáng tin không? Cần verify thêm gì?"

### 15–25 phút: Bài tập 2 — fee-analysis + deals-verification
- Chạy fee-analysis với hãng audience hay dùng
- Chạy deals-verification với promo code thật (nếu có)
- Thảo luận: "Phí ẩn nào bạn chưa biết trước đây?"

### 25–30 phút: Thảo luận tổng kết
**Câu hỏi thảo luận:**
1. "Skill nào hữu ích nhất cho công việc của bạn?"
2. "Khi nào bạn cần human approval trước khi agent thực hiện?"
3. "Bài toán nào trong công việc của bạn có thể áp dụng multi-skill approach tương tự?"

## Key takeaway
> "Agent không phải magic — nó là workflow có thể tháo rời, test từng phần, và verify. Mỗi skill làm một việc rõ ràng. Bạn có thể dùng 1 skill hoặc cả 8 skill tùy bài toán."
