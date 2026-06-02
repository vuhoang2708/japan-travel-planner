# Nội dung tạo Infographic / PPT: Từ câu hỏi du lịch Nhật đến AI Agent
**Ngày tạo:** 29/05/2026  
**Mục tiêu:** Chuyển case du lịch Nhật Bản thành nội dung trực quan, dễ hiểu cho người mới học AI Agent và vibe coding.  
**Đối tượng:** Người mới dùng AI trong công việc, chưa quen khái niệm agent, automation, verification.
**Prompt cho agent khác:** `Implementation Plan/agent_prompt_generate_japan_travel_visual_and_attach_20260529.md`
**Phase 1 artifact (đã ship):** `japan_travel_prompt_assistant_phase1_20260529.html` — công cụ tương tác giúp học viên làm rõ nhu cầu và tạo prompt sạch.

---

## 1. Thông điệp chính

**Một câu hỏi đời thường có thể trở thành một công cụ AI nhỏ nếu ta biết chia bài toán thành từng phase.**

Ví dụ:

> "Lập kế hoạch du lịch Nhật Bản 5 ngày cho gia đình 3 người lớn, tháng 7, ngân sách 35-40 triệu/người."

Không chỉ hỏi AI để lấy câu trả lời. Ta có thể dùng AI Agent để build dần một công cụ hỗ trợ:

1. Hỏi ngược để làm rõ nhu cầu.
2. Tạo prompt sạch.
3. Lập lịch trình nháp.
4. Ước tính ngân sách.
5. Gắn checklist kiểm chứng.
6. Xuất kế hoạch cuối để con người duyệt.

---

## 2. Nội dung cho Infographic một trang

### Tiêu đề

**Từ Prompt Đơn Giản Đến AI Agent: Case Du Lịch Nhật Bản**

### Phụ đề

Một ví dụ dễ hiểu về cách biến nhu cầu cá nhân thành công cụ hỗ trợ thông minh, từng bước an toàn hơn.

### Khu vực 1: Bài toán ban đầu

**Người dùng cần gì?**

- Gia đình 3 người lớn
- Du lịch Nhật Bản tháng 7
- Đi 5 ngày
- Ngân sách 35-40 triệu VND/người
- Muốn cảnh đẹp tự nhiên
- Muốn quán ăn local ngon
- Không muốn lịch quá vội

**Vấn đề nếu chỉ hỏi AI chung chung**

- Lịch trình dễ quá dày
- Chi phí có thể sai
- Giờ mở cửa có thể outdated
- Không rõ giả định
- Không có bước kiểm chứng trước khi đặt dịch vụ

### Khu vực 2: Tư duy IPO

**IPO = Đầu vào -> Xử lý -> Đầu ra**

| Thành phần | Trong case du lịch Nhật |
|---|---|
| Input - Đầu vào | số người, tháng đi, số ngày, ngân sách, sở thích, nhịp độ |
| Process - Cách xử lý | hỏi ngược, lọc điểm đến, so sánh lịch, ước tính chi phí, kiểm chứng |
| Output - Đầu ra | lịch trình, bảng ngân sách, checklist kiểm chứng, tin nhắn gửi gia đình |

### Khu vực 3: 5 mức độ tự động hóa

| Mức | Tên dễ hiểu | AI hỗ trợ gì? | Con người làm gì? |
|---:|---|---|---|
| 1 | Hỏi cho rõ | AI hỏi 5 câu để làm rõ nhu cầu | Trả lời và bổ sung thông tin |
| 2 | Viết prompt chuẩn | AI tạo prompt sạch để copy dùng lại | Kiểm tra prompt có đúng ý không |
| 3 | Lập lịch nháp | AI tạo bảng lịch trình 5 ngày | Chọn phương án phù hợp |
| 4 | Kiểm chứng rủi ro | AI liệt kê điểm cần kiểm tra: giá, giờ mở cửa, thời tiết, visa | Bấm kiểm tra nguồn thật |
| 5 | Công cụ bán tự động | AI xuất lịch cuối, ngân sách, email/Zalo chia sẻ | Phê duyệt trước khi đặt tiền |

### Khu vực 4: Vibe coding là gì?

**Vibe coding = mô tả công cụ muốn có, rồi để AI Agent build bản nháp.**

Trong case này, ta không chỉ nói:

> "Hãy lập lịch trình đi Nhật."

Ta giao việc rõ hơn:

> "Hãy build một web tool nhỏ: nhập số người, tháng đi, ngân sách, sở thích; xuất lịch trình, ngân sách, checklist kiểm chứng và tin nhắn chia sẻ."

### Khu vực 5: Nguyên tắc an toàn

**AI không được quyết định thay con người ở các bước rủi ro.**

Luôn cần kiểm chứng:

- Giá vé máy bay
- Giá khách sạn
- Giờ mở cửa điểm tham quan
- Thời tiết / mùa mưa nóng
- Visa và giấy tờ
- Khoảng cách di chuyển
- Tổng ngân sách trước khi đặt dịch vụ

### Khu vực 6: Bài học chốt

**AI Agent tốt không chỉ trả lời nhanh. Nó phải biết:**

- Hỏi lại khi thiếu dữ liệu
- Ghi rõ giả định
- Tạo bảng dễ kiểm tra
- Tách thông tin chắc và thông tin cần kiểm chứng
- Để con người phê duyệt trước quyết định quan trọng

---

## 3. Prompt tạo Infographic

Dán prompt này vào NotebookLM / Canva / Gamma / công cụ tạo infographic:

```text
Hãy tạo một infographic tiếng Việt, dễ hiểu cho người mới học AI, chủ đề:

"Từ Prompt Đơn Giản Đến AI Agent: Case Du Lịch Nhật Bản"

Mục tiêu:
Giải thích bằng ví dụ đời thường cách biến nhu cầu lập kế hoạch du lịch Nhật Bản thành một công cụ AI nhỏ, qua các mức độ tự động hóa từ thấp đến cao.

Phong cách:
- Rõ ràng, hiện đại, dễ đọc.
- Dành cho người mới, hạn chế thuật ngữ kỹ thuật.
- Nếu dùng thuật ngữ tiếng Anh, phải giải thích tiếng Việt ngay bên cạnh.
- Không dùng quá nhiều chữ; ưu tiên bảng, mũi tên, icon và timeline.

Cấu trúc infographic gồm 6 khu vực:

1. Bài toán ban đầu:
- Gia đình 3 người lớn
- Nhật Bản tháng 7
- 5 ngày
- Ngân sách 35-40 triệu VND/người
- Ưu tiên cảnh đẹp tự nhiên, quán ăn local ngon
- Không muốn lịch quá vội

2. Rủi ro nếu chỉ hỏi AI chung chung:
- Lịch trình quá dày
- Chi phí có thể sai
- Giờ mở cửa có thể outdated
- Không rõ giả định
- Không có bước kiểm chứng trước khi đặt dịch vụ

3. Tư duy IPO:
- Input - Đầu vào: số người, tháng đi, số ngày, ngân sách, sở thích, nhịp độ
- Process - Cách xử lý: hỏi ngược, lọc điểm đến, so sánh lịch, ước tính chi phí, kiểm chứng
- Output - Đầu ra: lịch trình, ngân sách, checklist kiểm chứng, tin nhắn gửi gia đình

4. 5 mức độ tự động hóa:
- Mức 1: Hỏi cho rõ - AI hỏi 5 câu
- Mức 2: Viết prompt chuẩn - AI tạo prompt sạch
- Mức 3: Lập lịch nháp - AI tạo bảng lịch trình 5 ngày
- Mức 4: Kiểm chứng rủi ro - AI liệt kê điểm cần kiểm tra
- Mức 5: Công cụ bán tự động - AI xuất lịch cuối, ngân sách, email/Zalo, con người duyệt

5. Vibe coding:
Giải thích ngắn: Vibe coding là mô tả công cụ muốn có, rồi để AI Agent build bản nháp.
Ví dụ: "Build một web tool nhỏ: nhập số người, tháng đi, ngân sách, sở thích; xuất lịch trình, ngân sách, checklist kiểm chứng và tin nhắn chia sẻ."

6. Bài học chốt:
- AI Agent tốt phải hỏi lại khi thiếu dữ liệu.
- Phải ghi rõ giả định.
- Phải tách thông tin chắc và thông tin cần kiểm chứng.
- Phải để con người phê duyệt trước khi đặt tiền hoặc ra quyết định quan trọng.

Yêu cầu trình bày:
- Dùng timeline hoặc bậc thang cho 5 mức độ tự động hóa.
- Dùng màu khác nhau để phân biệt: Input, Process, Output, Verify, Human approval.
- Tất cả chữ chính phải là tiếng Việt.
- Không tạo nội dung như quảng cáo du lịch; đây là infographic đào tạo AI.
```

---

## 4. Nội dung PPT 8 slide

### Slide 1: Mở bài

**Tiêu đề:** Từ câu hỏi du lịch Nhật đến AI Agent  
**Thông điệp:** Một nhu cầu đời thường có thể trở thành công cụ AI nhỏ nếu biết chia bài toán đúng cách.

Nội dung:

- Case thật từ survey lớp học
- Gia đình 3 người lớn, Nhật Bản, tháng 7, 5 ngày
- Ngân sách 35-40 triệu VND/người
- Mục tiêu: cảnh đẹp tự nhiên, ăn local, lịch không quá vội

### Slide 2: Nếu chỉ hỏi AI chung chung

**Tiêu đề:** Câu hỏi càng mơ hồ, kết quả càng khó tin  

Nội dung:

- AI có thể đưa lịch trình nghe rất hay
- Nhưng có thể sai giá, sai giờ mở cửa, lịch quá dày
- Không rõ AI đang giả định gì
- Người dùng khó biết cần kiểm tra lại chỗ nào

Visual gợi ý: một lịch trình đẹp nhưng có các dấu cảnh báo.

### Slide 3: Chuyển sang tư duy IPO

**Tiêu đề:** Muốn AI làm tốt, phải rõ Đầu vào - Xử lý - Đầu ra  

Nội dung:

- Đầu vào: người đi, ngày đi, ngân sách, sở thích, nhịp độ
- Xử lý: hỏi lại, so sánh, tính chi phí, kiểm chứng
- Đầu ra: lịch trình, ngân sách, checklist, tin nhắn chia sẻ

Visual gợi ý: 3 khối nối bằng mũi tên.

### Slide 4: Mức 1-2, AI là trợ lý hỏi và viết prompt

**Tiêu đề:** Tự động hóa thấp: AI giúp hỏi đúng và viết prompt sạch  

Nội dung:

- AI chưa lập lịch ngay
- AI hỏi tối đa 5 câu làm rõ
- AI tạo prompt hoàn chỉnh để dùng lại
- Người dùng vẫn kiểm tra và điều chỉnh

Ví dụ câu lệnh:

> "Đừng lập lịch trình ngay. Hãy hỏi tôi tối đa 5 câu để làm rõ trước."

### Slide 5: Mức 3, AI tạo lịch trình nháp

**Tiêu đề:** Tự động hóa vừa: AI tạo bảng lịch trình để con người chọn  

Nội dung:

- Bảng 5 ngày
- Mỗi ngày có sáng / chiều / tối
- Có nhịp độ di chuyển
- Có ghi chú ngân sách
- Có 2-3 phương án để so sánh

Visual gợi ý: bảng itinerary đơn giản.

### Slide 6: Mức 4, thêm cổng kiểm chứng

**Tiêu đề:** AI hữu ích hơn khi biết tự đánh dấu điều cần kiểm tra  

Nội dung:

- Giá vé máy bay
- Khách sạn
- Giờ mở cửa
- Thời tiết tháng 7
- Visa / giấy tờ
- Khoảng cách di chuyển

Thông điệp:

> "Thông tin thay đổi theo thời gian thì không được trình bày như sự thật chắc chắn."

### Slide 7: Mức 5, Agent workflow bán tự động

**Tiêu đề:** Tự động hóa cao: Agent tạo nhiều artifact, con người phê duyệt  

Nội dung:

Agent có thể xuất:

- Lịch trình cuối
- Bảng ngân sách
- Checklist việc cần làm
- Tin nhắn Zalo/email gửi gia đình

Con người vẫn quyết định:

- Chọn phương án
- Kiểm tra nguồn thật
- Đặt vé / khách sạn
- Thanh toán

### Slide 8: Bài học chốt

**Tiêu đề:** AI Agent không thay người, nó giúp người làm việc có hệ thống hơn  

Nội dung:

3 điều cần nhớ:

1. Prompt tốt là bản mô tả bài toán, không chỉ là câu hỏi.
2. Vibe coding giúp biến nhu cầu thành công cụ nhỏ rất nhanh.
3. Tự động hóa càng cao càng cần kiểm chứng và phê duyệt của con người.

Kết câu:

> "Hãy bắt đầu từ một việc thật, chia thành phase nhỏ, rồi để AI hỗ trợ từng bước."

---

## 5. Prompt tạo PPT

Dán prompt này vào Gamma / Canva / PowerPoint Copilot / công cụ tạo slide:

```text
Tạo một deck PowerPoint tiếng Việt gồm 8 slide cho người mới học AI Agent.

Chủ đề:
"Từ câu hỏi du lịch Nhật đến AI Agent"

Mục tiêu:
Giải thích bằng case đời thường cách dùng AI để đi từ một câu hỏi du lịch sang một công cụ hỗ trợ lập kế hoạch, với mức độ tự động hóa tăng dần.

Đối tượng:
Người mới dùng AI trong công việc, chưa quen khái niệm agent, automation, verification.

Phong cách:
- Dễ hiểu, ít chữ, nhiều sơ đồ.
- Không dùng giọng quảng cáo.
- Không dùng quá nhiều thuật ngữ tiếng Anh.
- Nếu có thuật ngữ tiếng Anh, giải thích tiếng Việt ngay bên cạnh.

Slide 1 - Mở bài:
Tiêu đề: Từ câu hỏi du lịch Nhật đến AI Agent
Nội dung: Case thật từ survey: gia đình 3 người lớn, Nhật tháng 7, 5 ngày, ngân sách 35-40 triệu/người, thích cảnh đẹp tự nhiên và quán ăn local.

Slide 2 - Vấn đề khi hỏi AI chung chung:
Tiêu đề: Câu hỏi càng mơ hồ, kết quả càng khó tin
Nội dung: AI có thể sai giá, sai giờ mở cửa, lịch quá dày, không rõ giả định, không có checklist kiểm chứng.

Slide 3 - Tư duy IPO:
Tiêu đề: Rõ Đầu vào - Xử lý - Đầu ra
Nội dung: Input gồm người đi/ngày/ngân sách/sở thích; Process gồm hỏi lại/so sánh/tính chi phí/kiểm chứng; Output gồm lịch trình/ngân sách/checklist/tin nhắn chia sẻ.

Slide 4 - Mức 1-2:
Tiêu đề: AI giúp hỏi đúng và viết prompt sạch
Nội dung: AI hỏi 5 câu làm rõ, tạo prompt hoàn chỉnh, người dùng kiểm tra lại.

Slide 5 - Mức 3:
Tiêu đề: AI tạo lịch trình nháp
Nội dung: Bảng 5 ngày, sáng/chiều/tối, nhịp độ di chuyển, ghi chú ngân sách, 2-3 phương án.

Slide 6 - Mức 4:
Tiêu đề: Thêm cổng kiểm chứng
Nội dung: Kiểm tra vé máy bay, khách sạn, giờ mở cửa, thời tiết, visa, khoảng cách di chuyển.

Slide 7 - Mức 5:
Tiêu đề: Agent workflow bán tự động
Nội dung: Agent xuất lịch cuối, bảng ngân sách, checklist việc cần làm, tin nhắn Zalo/email; con người phê duyệt trước khi đặt tiền.

Slide 8 - Bài học chốt:
Tiêu đề: AI Agent giúp làm việc có hệ thống hơn
Nội dung: Prompt tốt là bản mô tả bài toán; vibe coding biến nhu cầu thành công cụ nhỏ; tự động hóa càng cao càng cần kiểm chứng và phê duyệt.

Yêu cầu visual:
- Dùng timeline hoặc bậc thang cho 5 mức tự động hóa.
- Dùng icon đơn giản: câu hỏi, bảng lịch trình, ngân sách, kính lúp kiểm chứng, người phê duyệt.
- Mỗi slide chỉ có 1 ý chính.
- Tất cả chữ chính bằng tiếng Việt.
```

---

## 6. Gợi ý lời dẫn 2 phút

"Mình lấy một ví dụ rất đời thường: có bạn muốn lập kế hoạch du lịch Nhật Bản cho gia đình. Nếu mình chỉ hỏi AI 'lập lịch đi Nhật 5 ngày', AI sẽ trả lời rất nhanh, nhưng chưa chắc dùng được. Nó có thể sai giá, lịch quá dày, hoặc quên kiểm tra giờ mở cửa.

Điểm quan trọng là ta không chỉ dùng AI như chatbot hỏi đáp. Ta có thể biến bài toán này thành một quy trình: đầu tiên AI hỏi lại để làm rõ, sau đó tạo prompt sạch, rồi tạo lịch trình nháp, tiếp theo là ngân sách, rồi thêm cổng kiểm chứng. Cuối cùng, agent có thể xuất lịch trình, bảng ngân sách và tin nhắn gửi gia đình, nhưng con người vẫn là người duyệt trước khi đặt vé hay thanh toán.

Đó chính là cách hiểu đơn giản về AI Agent: không phải AI thay mình quyết định, mà AI giúp mình làm việc có hệ thống hơn, ít sót hơn, và nhanh hơn."
