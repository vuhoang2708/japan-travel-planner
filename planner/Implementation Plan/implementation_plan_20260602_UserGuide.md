# Kế hoạch thực hiện: Cẩm Nang Sử Dụng Japan Travel Planner

**Ngày:** 2026-06-02  
**Người giao:** Vu Hoang  
**Ưu tiên:** Cao — cần có trước buổi showcase/demo

---

## 1. Đề bài & Yêu cầu

Tạo file `planner/user_guide_japan_travel_planner.html` — cẩm nang người dùng dạng HTML offline, user-friendly, dùng để showcase toàn bộ bộ tool Japan Travel Planner + Travel Optimizer.

**Mục tiêu:** Người dùng lần đầu đọc cẩm nang này là hiểu được làm gì, dùng như thế nào, và tự chạy được.

---

## 2. Hiện trạng

| File | Trạng thái |
|---|---|
| `planner/japan_travel_prompt_assistant_phase1_20260529.html` | Done |
| `planner/japan-planner-phase2.html` | Done |
| `planner/japan-planner-phase3.html` | Done |
| `planner/japan-planner-phase4.html` | Done |
| `planner/japan-planner-phase5.html` | Chưa build (Phase 5 đang được xây dựng song song) |
| `travel-optimizer/README.md` | Done — nguồn nội dung 8 skills |
| `travel-optimizer/lab_guide_travel_agent_03062026.md` | Done — nguồn nội dung lab guide |

---

## 3. Cấu trúc nội dung cẩm nang

### 3.1 Header
- Tên: **Japan Travel Planner — Cẩm Nang Sử Dụng**
- Badge: `User Guide · v1.0` màu teal `#0d9488`
- Mô tả 1 dòng: "Hướng dẫn sử dụng bộ công cụ lập kế hoạch du lịch Nhật Bản từ A đến Z"

### 3.2 Phần 1 — Tổng quan
- Bộ tool này làm gì (2–3 câu ngắn gọn)
- Dành cho ai (gia đình, nhóm bạn muốn tự lập lịch)
- **Không cần cài đặt** — mở file HTML bằng trình duyệt là dùng được

### 3.3 Phần 2 — Sơ đồ luồng 5 Phase
Render bằng CSS/HTML thuần (không dùng thư viện diagram):

```
Phase 1          Phase 2          Phase 3          Phase 4          Phase 5
Prompt           Lịch trình       So sánh vé       Kiểm chứng       Kế hoạch
Assistant   →    nháp        →    máy bay     →    & Deals     →    cuối
(Phase 1)        (Phase 2)        (Phase 3)         (Phase 4)        (Phase 5)
```

Mỗi phase là một box với màu gradient từ xanh dương → tím → xanh lá, nối bằng mũi tên `→`.

### 3.4 Phần 3 — Hướng dẫn từng Phase

Với mỗi phase, hiển thị dạng **accordion** (thẻ `<details>/<summary>`):

**Phase 1 — Prompt Assistant**
- Mở file: `japan_travel_prompt_assistant_phase1_20260529.html`
- Làm gì: Nhập thông tin chuyến đi → nhận 5 câu hỏi làm rõ + prompt sạch
- Output: Prompt copy sang AI (Gemini/ChatGPT/Claude) để lấy ý tưởng
- Screenshot placeholder: box màu xám nhạt với text "→ Mở Phase 1"

**Phase 2 — Lịch trình nháp**
- Mở file: `japan-planner-phase2.html`
- Làm gì: AI trả về lịch trình → nhập vào form → xem lịch trình từng ngày dạng bảng
- Output: Lịch trình nháp theo ngày

**Phase 3 — So sánh vé máy bay**
- Mở file: `japan-planner-phase3.html`
- Làm gì: Sinh prompt cho Travel Optimizer → copy → paste JSON kết quả → xem bảng so sánh
- Output: Bảng 3 phương án vé + phương án khuyến nghị
- Lưu ý: Dùng **AI-Knowledge Mode** — không cần API key

**Phase 4 — Verification Gate (cổng kiểm chứng)**
- Mở file: `japan-planner-phase4.html`
- Làm gì: Sinh prompt Verification → paste JSON → xem checklist từng ngày + deals
- Output: Checklist confirmed/assumption/needs_verification + bảng deals

**Phase 5 — Kế hoạch cuối**
- Mở file: `japan-planner-phase5.html`
- Làm gì: Tổng hợp tất cả → xuất 3 artifact
- Output:
  - Tab 1: Lịch trình cuối (accordion theo ngày)
  - Tab 2: Email/Zalo message sẵn sàng gửi
  - Tab 3: Todo list việc cần làm (có thể tick)

### 3.5 Phần 4 — Travel Optimizer: 8 Skills

Bảng 3 cột: **Skill** | **Dùng khi nào** | **Ví dụ**

| Skill | Dùng khi nào | Ví dụ |
|---|---|---|
| date-optimization | Linh hoạt ngày bay | Bay thứ 3 rẻ hơn thứ 6 bao nhiêu? |
| flight-search | Mọi lần tìm vé | Tìm vé HAN→NRT tháng 7 |
| fee-analysis | So sánh LCC vs FSC | Vietjet thực ra tốn bao nhiêu? |
| route-optimization | Route quốc tế dài | HAN→NRT qua ICN có rẻ hơn không? |
| deals-verification | Mọi lần booking | Mã SUMMER2026 còn hiệu lực không? |
| flexibility-analysis | Lịch trình chưa chắc | Non-refundable có đáng mua không? |
| negotiation-email | Doanh nghiệp 50+ chuyến/năm | Soạn email xin giá corporate |
| hidden-city-strategy | Nâng cao | Chỉ dùng khi hiểu rõ rủi ro |

Kèm **2 chế độ hoạt động**:
- AI-Knowledge Mode: không cần API, dùng được ngay
- API-Enhanced Mode: kết nối Kiwi/Amadeus để có giá thực

### 3.6 Phần 5 — FAQ

5 câu hỏi thường gặp dạng accordion:

1. **Tôi không biết code, dùng được không?** → Có, chỉ cần double-click file HTML
2. **Giá vé trong tool có chính xác không?** → Là ước tính, cần verify trên Google Flights/Skyscanner trước khi đặt
3. **Phase nào bắt buộc phải làm?** → Phase 1 và 2 là bắt buộc. Phase 3–5 tùy chọn nhưng nên làm để có kế hoạch đầy đủ
4. **Travel Optimizer cần cài đặt gì không?** → AI-Knowledge Mode không cần gì. API Mode cần Python + API key (xem README)
5. **Dùng AI nào?** → Gemini, ChatGPT, hoặc Claude đều được

### 3.7 Footer — Disclaimer
Box vàng nhạt:
> "Tất cả thông tin giá vé, giờ mở cửa, và lịch trình trong tool này là ước tính do AI tạo ra. Luôn kiểm chứng thực tế trên Google Flights, Booking.com, và trang web chính thức trước khi đặt dịch vụ."

---

## 4. Yêu cầu kỹ thuật

1. **HTML/CSS/JavaScript thuần** — không CDN, không framework
2. **CSS variables** kế thừa từ Phase 4: `--navy`, `--orange`, `--green`, `--muted`, v.v.
3. **Responsive** — test ở 375px width
4. **Badge màu teal** `#0d9488` để phân biệt với các phase (không trùng màu)
5. **Accordion** dùng `<details>/<summary>` native — không dùng JS toggle
6. Sơ đồ luồng 5 phase dùng **CSS flexbox** — không dùng SVG hay canvas

---

## 5. File output

```
c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\planner\user_guide_japan_travel_planner.html
```

---

## 6. Acceptance Criteria

| # | Tiêu chí | Cách kiểm tra |
|---|---|---|
| AC-01 | File mở được offline bằng double-click | Double-click file trong Explorer |
| AC-02 | Sơ đồ 5 phase hiển thị đúng thứ tự, có mũi tên | Xem phần 2 |
| AC-03 | Accordion 5 phase hoạt động — click mở/đóng | Click từng phase |
| AC-04 | Bảng 8 skills hiển thị đủ 3 cột | Xem phần 4 |
| AC-05 | FAQ accordion hoạt động | Click từng câu hỏi |
| AC-06 | Responsive — không vỡ layout ở 375px | DevTools → iPhone 12 |
| AC-07 | Không có link ngoài (CDN, external URL) | Inspect source |
| AC-08 | Disclaimer hiển thị ở cuối trang | Scroll xuống đáy |

---

## 7. Checklist báo cáo cho agent

Khi xong, agent báo cáo:

```
1. File path: [đường dẫn tuyệt đối]
2. Kích thước: [số dòng] dòng
3. AC pass: [AC-01 đến AC-08: PASS / FAIL]
4. Điểm cần kiểm tra thêm: [nếu có]
```

---

## 8. Prompt giao việc cho agent (Copy-Pasteable)

```
Đọc file plan tại:
c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\planner\Implementation Plan\implementation_plan_20260602_UserGuide.md

Sau đó:
1. Đọc file Phase 4 để kế thừa CSS variables và cấu trúc HTML:
   c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\planner\japan-planner-phase4.html

2. Đọc README Travel Optimizer để lấy nội dung 8 skills:
   c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\travel-optimizer\README.md

3. Build file cẩm nang theo đúng cấu trúc trong plan, lưu tại:
   c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\planner\user_guide_japan_travel_planner.html

4. Tự kiểm tra AC-01 đến AC-08.

5. Báo cáo đủ 4 mục theo mẫu ở mục 7.
```

---

*Plan tạo ngày 2026-06-02. Người duyệt: Vu Hoang.*
