# Prompt minh họa vibe coding: Japan Travel Planner Agent
**Ngày tạo:** 29/05/2026  
**Nguồn case:** Survey trước đào tạo AI, nhu cầu lập kế hoạch du lịch Nhật Bản tự túc cho gia đình 3 người lớn  
**Mục tiêu lớp học:** Minh họa cách dùng AI Agent để biến một nhu cầu đời thường thành công cụ hỗ trợ thực tế, với mức độ tự động hóa tăng dần qua từng phase.
**Bản visual hóa:** `Implementation Plan/japan_travel_infographic_ppt_content_20260529.md`

**Phase 1 artifact (đã ship):** `japan_travel_prompt_assistant_phase1_20260529.html`
- BRD: `Implementation Plan/brd_japan_travel_prompt_assistant_phase1_20260529.md`
- Technical note: `Implementation Plan/technical_note_japan_travel_prompt_assistant_phase1_20260529.md`
- UAT: `Implementation Plan/uat_japan_travel_prompt_assistant_phase1_20260529.md`

---

## 1. Ý tưởng demo

Case này dùng để dạy 3 lớp năng lực cùng lúc:

1. **Prompt tốt:** biến mong muốn rộng thành yêu cầu có ràng buộc, tiêu chí đúng/sai và output rõ.
2. **Vibe coding:** giao cho agent dựng nhanh một công cụ nhỏ thay vì chỉ trả lời trong chat.
3. **Tự động hóa theo phase:** không nhảy thẳng tới "AI tự làm hết", mà đi từ trợ lý gợi ý -> form nhập liệu -> bảng so sánh -> planner có kiểm chứng -> agent bán tự động.

Case gốc:

- Nhóm đi: gia đình 3 người lớn.
- Thời gian: tháng 7, 5 ngày.
- Ngân sách: 35-40 triệu VND/người.
- Ưu tiên: cảnh đẹp tự nhiên, quán ăn local ngon.
- Phong cách: tự túc, không quá vội, hạn chế đổi khách sạn nhiều.

---

## 2. Lộ trình tự động hóa từ thấp đến cao

| Phase | Mức tự động hóa | Công cụ cần build | Người dùng vẫn làm gì | Agent làm gì |
|---:|---|---|---|---|
| 1 | Thấp | Prompt checklist + bảng câu hỏi | Trả lời câu hỏi, tự copy kết quả | Hỏi ngược, làm rõ ràng buộc, xuất prompt sạch |
| 2 | Thấp-vừa | Form nhập nhu cầu + itinerary dạng bảng | Nhập thông tin, chọn option | Tạo lịch trình nháp theo input |
| 3 | Vừa | Planner có so sánh 2-3 phương án | Chọn phương án phù hợp | So sánh route, pace, chi phí, ưu/nhược điểm |
| 4 | Vừa-cao | Planner có checklist kiểm chứng | Bấm kiểm tra thủ công các nguồn | Gắn danh sách điểm cần verify: giá, giờ mở cửa, thời tiết, visa, di chuyển |
| 5 | Cao | Agent workflow bán tự động | Phê duyệt trước khi xuất bản/đặt dịch vụ | Nghiên cứu, lập bảng, đánh dấu rủi ro, xuất kế hoạch cuối và bản email chia sẻ |

Thông điệp cần nhấn mạnh trong lớp: **tự động hóa tốt không phải là bỏ con người ra khỏi quy trình, mà là đặt con người ở đúng điểm phê duyệt.**

---

## 3. Prompt mở đầu cho học viên

Dùng prompt này để cho học viên thấy: nếu chỉ hỏi "lập lịch đi Nhật 5 ngày" thì AI dễ trả lời chung chung; nếu mô tả đúng ràng buộc, kết quả sẽ tốt hơn nhiều.

```text
Tôi muốn bạn giúp lập kế hoạch du lịch Nhật Bản tự túc.

Đừng lập lịch trình ngay. Trước tiên hãy hỏi tôi tối đa 5 câu hỏi để làm rõ các điểm còn thiếu.

Bối cảnh hiện có:
- Nhóm đi: gia đình 3 người lớn.
- Thời gian: tháng 7, đi 5 ngày.
- Ngân sách: 35-40 triệu VND/người, gồm vé máy bay, khách sạn, di chuyển, ăn uống và vé tham quan cơ bản.
- Ưu tiên: cảnh đẹp tự nhiên, trải nghiệm địa phương, quán ăn local ngon.
- Phong cách: không quá vội, hạn chế đổi khách sạn quá nhiều.

Sau khi tôi trả lời, hãy lập kế hoạch theo 4 phần:
1. Các giả định bạn đang dùng.
2. Lịch trình từng ngày dạng bảng.
3. Ước tính ngân sách theo hạng mục.
4. Danh sách điểm cần kiểm chứng lại trước khi đặt dịch vụ, gồm vé máy bay, khách sạn, giờ mở cửa, thời tiết, chi phí di chuyển và yêu cầu visa.

Nếu thông tin nào bạn không chắc, hãy ghi rõ là cần kiểm chứng, không được trình bày như sự thật chắc chắn.
```

---

## 4. Prompt vibe coding cho Agent

Dùng prompt này trong Antigravity/Codex/Gemini/Claude có khả năng sửa file để agent build một công cụ demo nhỏ. Phù hợp để minh họa "AI không chỉ chat, mà có thể dựng tool".

```text
Bạn là một AI coding agent. Hãy xây dựng một công cụ web nhỏ chạy offline trong một file HTML duy nhất để hỗ trợ lập kế hoạch du lịch Nhật Bản tự túc.

Mục tiêu:
Tạo một "Japan Travel Planner" cho gia đình 3 người lớn, đi Nhật tháng 7 trong 5 ngày, ngân sách 35-40 triệu VND/người, ưu tiên cảnh đẹp tự nhiên và quán ăn local ngon.

Yêu cầu sản phẩm:
1. Tạo file HTML tự chạy offline, không cần backend.
2. Giao diện là một công cụ dùng ngay, không làm landing page quảng cáo.
3. Có form nhập:
   - số người đi
   - số ngày
   - tháng đi
   - ngân sách mỗi người
   - phong cách đi: thư thả / cân bằng / đi nhiều điểm
   - ưu tiên: thiên nhiên, ăn uống local, mua sắm, văn hóa, trẻ em/người lớn tuổi
4. Có nút tạo lịch trình nháp.
5. Kết quả hiển thị:
   - bảng lịch trình từng ngày
   - phân bổ ngân sách theo hạng mục
   - danh sách giả định đang dùng
   - checklist cần kiểm chứng trước khi đặt dịch vụ
   - cảnh báo rủi ro nếu lịch quá dày hoặc ngân sách quá thấp
6. Không được bịa giá vé, giá khách sạn hay giờ mở cửa cụ thể như sự thật chắc chắn. Nếu chưa có nguồn live, chỉ ghi "ước tính minh họa" và yêu cầu người dùng kiểm chứng.
7. Có 3 mức tự động hóa trong UI:
   - Mức 1: chỉ tạo checklist câu hỏi và prompt sạch.
   - Mức 2: tạo lịch trình nháp và ngân sách minh họa.
   - Mức 3: tạo kế hoạch có checklist kiểm chứng, rủi ro và email chia sẻ cho gia đình.

Ràng buộc kỹ thuật:
- Chỉ dùng HTML/CSS/JavaScript thuần.
- Không dùng thư viện ngoài.
- Thiết kế gọn, dễ đọc trên laptop và điện thoại.
- Các bảng không được tràn màn hình trên mobile.
- Dữ liệu mẫu phải thể hiện rõ case Nhật Bản 5 ngày, 3 người lớn, tháng 7, 35-40 triệu VND/người.

Quy trình làm việc:
1. Đọc yêu cầu và tự lập kế hoạch ngắn.
2. Tạo file HTML.
3. Kiểm tra lại logic JavaScript.
4. Mở file hoặc hướng dẫn cách mở file để kiểm thử.
5. Báo cáo ngắn những gì đã build và giới hạn của bản demo.
```

---

## 5. Prompt nâng cấp theo phase

### Phase 1: Prompt assistant

```text
Hãy chỉ build phần "Mức 1".
Người dùng nhập nhu cầu chuyến đi, công cụ xuất ra:
1. 5 câu hỏi cần làm rõ.
2. Một prompt hoàn chỉnh để copy sang Gemini/ChatGPT/Claude.
3. Checklist kiểm chứng trước khi tin kết quả.
```

### Phase 2: Itinerary generator

```text
Nâng cấp công cụ lên "Mức 2".
Sau khi người dùng nhập thông tin, hãy tạo lịch trình nháp 5 ngày dạng bảng.
Mỗi ngày cần có: khu vực chính, hoạt động sáng/chiều/tối, nhịp độ di chuyển, ghi chú ngân sách.
Không dùng dữ liệu giá/giờ mở cửa cụ thể nếu chưa có nguồn live.
```

### Phase 3: Budget planner

```text
Nâng cấp công cụ bằng phần phân bổ ngân sách.
Chia ngân sách mỗi người thành các hạng mục:
- vé máy bay
- khách sạn
- di chuyển nội địa
- ăn uống
- vé tham quan
- dự phòng

Nếu tổng ước tính vượt ngân sách, hãy cảnh báo và đề xuất cách giảm chi phí.
```

### Phase 4: Verification gate

```text
Thêm "cổng kiểm chứng" trước khi người dùng tin lịch trình.
Với mỗi ngày trong lịch trình, tạo checklist cần kiểm chứng:
- thời tiết/mùa
- giờ mở cửa
- chi phí di chuyển
- khoảng cách giữa các điểm
- độ phù hợp với người lớn tuổi nếu có
- rủi ro lịch quá dày

Kết quả phải phân biệt rõ: thông tin chắc, giả định, và điểm cần kiểm chứng.
```

### Phase 5: Semi-agent workflow

```text
Nâng cấp thành workflow bán tự động.
Công cụ cần xuất 3 artifact:
1. Lịch trình cuối cho gia đình.
2. Email/Zalo message ngắn để gửi mọi người cùng xem.
3. Danh sách việc người thật cần làm tiếp: kiểm tra vé, kiểm tra khách sạn, kiểm tra visa, đặt dịch vụ.

Không thêm nút đặt vé hoặc thanh toán. Mọi quyết định chi tiền phải nằm ở bước con người phê duyệt.
```

---

## 6. Cách giảng trên lớp

Trình tự demo gợi ý:

1. Cho học viên xem prompt du lịch dạng chat trước.
2. Hỏi lớp: "Nếu tuần nào cũng phải lập nhiều phương án như vậy thì có nên biến thành tool không?"
3. Chạy prompt vibe coding để agent build tool.
4. Mở tool và nhập lại case Nhật Bản.
5. Chỉ ra 3 điểm quan trọng:
   - Prompt là bản mô tả sản phẩm, không chỉ là câu hỏi.
   - Agent cần phase rõ để build từng bước, dễ kiểm soát.
   - Việc càng liên quan đến tiền/lịch thật thì càng cần verification gate và human approval.

---

## 7. Tiêu chí thành công của demo

Demo đạt yêu cầu nếu học viên nhìn thấy được:

- Từ một câu hỏi đời thường có thể tách thành yêu cầu sản phẩm.
- Vibe coding giúp tạo công cụ nhỏ rất nhanh, nhưng vẫn cần người kiểm tra logic.
- Mức tự động hóa nên tăng dần theo độ tin cậy của dữ liệu và rủi ro quyết định.
- Agent tốt phải biết ghi giả định, điểm chưa chắc, và việc cần con người duyệt.
