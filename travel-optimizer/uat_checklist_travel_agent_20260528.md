# UAT Checklist: Travel Optimization Agent
**Ngày:** 2026-05-28  
**Môi trường:** AI-Knowledge Mode (không cần API) + API-Enhanced Mode (cần key)

## Pre-conditions
- [ ] Python environment hoạt động
- [ ] API keys (nếu test API mode): AMADEUS_API_KEY, AMADEUS_API_SECRET, KIWI_API_KEY — **cần verify trước lab 03/06**
- [ ] AI-Knowledge Mode: không cần API key — chạy được ngay

## Test Cases — AI-Knowledge Mode

| TC | Input | Expected | Status |
|----|-------|----------|--------|
| TC-01 | date-optimization: HAN → SGN, flexible ±7 ngày | Bảng so sánh giá theo ngày, highlight ngày rẻ nhất | ⏳ PENDING |
| TC-02 | fee-analysis: Vietjet, hành lý xách tay | Breakdown phí ẩn: phí chọn ghế, phí hành lý, phí thanh toán | ⏳ PENDING |
| TC-03 | route-optimization: HAN → BKK | Gợi ý hub routing (ví dụ: HAN → SGN → BKK) nếu rẻ hơn bay thẳng | ⏳ PENDING |
| TC-04 | deals-verification: promo code "SUMMER2026" | Kết quả verify rõ ràng: valid/invalid/expired | ⏳ PENDING |
| TC-05 | flexibility-analysis: non-refundable vs refundable | So sánh risk/reward, gợi ý dựa trên risk_tolerance | ⏳ PENDING |

## Test Cases — API-Enhanced Mode

| TC | Input | Expected | Status |
|----|-------|----------|--------|
| TC-06 | flight-search: HAN → SGN, 2026-06-15, 1 adult | Kết quả thật từ Kiwi API hoặc Amadeus | ⏳ PENDING |
| TC-07 | hidden-city-strategy: bất kỳ route | Có risk disclaimer rõ ràng trước khi show kết quả | ⏳ PENDING |

## Claim Verification
- README claim "tiết kiệm 30-66% cho cá nhân, 10-15% cho doanh nghiệp" — **PENDING, chưa có evidence thực tế**
- Cần test với chuyến bay thật và so sánh với giá booking trực tiếp

## Fallback
Nếu API fail: dùng AI-Knowledge Mode — vẫn demo được concept đầy đủ, không cần API.
