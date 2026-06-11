"use strict";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const GEMINI_API_BASE =
  "https://generativelanguage.googleapis.com/v1beta/models";
const REQUEST_TIMEOUT_MS = 45000;
const MAX_INPUT_LENGTH = 500;

function setResponseHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
}

function cleanText(value, fallback) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.trim().slice(0, MAX_INPUT_LENGTH);
  return cleaned || fallback;
}

function normalizeTripContext(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;

  const adults = Number.parseInt(input.adults, 10);
  const budgetMax = Number.parseInt(input.budget_max, 10);

  return {
    origin: cleanText(input.origin, "HAN"),
    destination: cleanText(input.destination, "INT"),
    departure_date: cleanText(input.departure_date, ""),
    return_date: cleanText(input.return_date, ""),
    adults: Number.isFinite(adults) && adults > 0 ? Math.min(adults, 20) : 1,
    budget_min:
      Number.isFinite(Number(input.budget_min)) && Number(input.budget_min) >= 0
        ? Number(input.budget_min)
        : 0,
    budget_max:
      Number.isFinite(budgetMax) && budgetMax > 0 ? budgetMax : 40000000,
    flexibility: cleanText(input.flexibility, "medium"),
    month: cleanText(input.month, ""),
    interests: cleanText(input.interests, ""),
    constraints: cleanText(input.constraints, ""),
    pace: cleanText(input.pace, "cân bằng"),
  };
}

function buildPrompt(tripCtx, days) {
  return `Bạn là trợ lý lập kế hoạch du lịch, hỗ trợ hai nhiệm vụ cho hành trình:

THÔNG TIN CHUYẾN ĐI
- Hành trình: ${tripCtx.origin} → ${tripCtx.destination} → ${tripCtx.origin}
- Ngày khởi hành: ${tripCtx.departure_date || "chưa xác định"}
- Ngày về: ${tripCtx.return_date || "chưa xác định"}
- Số người lớn: ${tripCtx.adults}
- Số ngày: ${days}
- Ngân sách mục tiêu: ${tripCtx.budget_min}–${tripCtx.budget_max} VND/người
- Độ linh hoạt: ${tripCtx.flexibility}
- Sở thích: ${tripCtx.interests || "không có yêu cầu riêng"}
- Ràng buộc: ${tripCtx.constraints || "không có yêu cầu riêng"}

NHIỆM VỤ 1 — PHƯƠNG ÁN VÉ MÁY BAY
Đề xuất tối đa 3 phương án vé khứ hồi hạng phổ thông, có hành lý ký gửi.
Tính đủ giá niêm yết, thuế phí, hành lý và phí thanh toán trong
true_total_per_person_vnd. Chọn recommended_option_id phù hợp nhất.

NHIỆM VỤ 2 — KIỂM TRA TRƯỚC KHI ĐẶT
1. Tạo deals cho ưu đãi có thể kiểm tra được.
2. Với mỗi ngày, tạo checklist gồm weather_season, opening_hours,
transport_cost, distance_between_spots và schedule_density_risk.
3. Tính budget_alert so với budget_max=${tripCtx.budget_max} VND/người.

QUY TẮC CHỐNG BỊA ĐẶT
- Không khẳng định đây là giá trực tuyến nếu không có nguồn xác minh.
- Khi không có dữ liệu thời gian thực, dùng data_confidence="estimated".
- Trạng thái checklist chỉ được là confirmed, assumption hoặc needs_verification.
- Nếu chưa chắc, dùng needs_verification và ghi action_required cụ thể.
- Không thêm markdown, lời dẫn hoặc giải thích ngoài JSON.

Chỉ trả về đúng một object JSON theo cấu trúc sau:
{
  "options": [
    {
      "rank": 1,
      "option_id": "OPT-001",
      "airline": "...",
      "tags": ["[DIRECT]"],
      "route": {"outbound": "...", "return": "..."},
      "departure_date": "...",
      "return_date": "...",
      "price": {
        "advertised_per_person_vnd": 0,
        "true_total_per_person_vnd": 0,
        "total_all_passengers_vnd": 0
      },
      "flexibility_score": {"score": 80},
      "data_confidence": "estimated"
    }
  ],
  "recommended_option_id": "OPT-001",
  "budget_alert": {
    "over_budget": false,
    "total_estimated_per_person_vnd": 0,
    "budget_max_per_person_vnd": ${tripCtx.budget_max},
    "overage_vnd": 0,
    "cost_reduction_suggestions": []
  },
  "deals": [
    {
      "description": "...",
      "discount_vnd": 0,
      "valid_until": "...",
      "confidence_level": "estimated"
    }
  ],
  "checklist_per_day": [
    {
      "day": 1,
      "date": "...",
      "checks": [
        {
          "category": "weather_season",
          "status": "needs_verification",
          "detail": "...",
          "action_required": "..."
        }
      ]
    }
  ],
  "generated_at": "ISO8601"
}`;
}

function extractJSON(text) {
  const markdownMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (markdownMatch) return markdownMatch[1].trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end > start) return text.slice(start, end + 1);
  return text;
}

function isValidResponse(data) {
  return (
    data &&
    typeof data === "object" &&
    Array.isArray(data.options) &&
    data.options.length > 0 &&
    typeof data.recommended_option_id === "string" &&
    data.budget_alert &&
    typeof data.budget_alert === "object" &&
    Array.isArray(data.deals) &&
    Array.isArray(data.checklist_per_day)
  );
}

async function handler(req, res) {
  setResponseHeaders(res);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Phương thức không được hỗ trợ." });
  }

  const tripCtx = normalizeTripContext(req.body && req.body.tripCtx);
  const days = Number.parseInt(req.body && req.body.days, 10);
  if (!tripCtx || !Number.isFinite(days) || days < 1 || days > 30) {
    return res.status(400).json({
      error: "Thông tin chuyến đi không hợp lệ. Vui lòng kiểm tra và thử lại.",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error:
        "Dịch vụ AI chưa được cấu hình. Vui lòng dùng chế độ nhập thủ công.",
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${GEMINI_API_BASE}/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: buildPrompt(tripCtx, days) }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json",
          },
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      console.error("Gemini API error:", response.status, detail.slice(0, 1000));
      return res.status(502).json({
        error:
          "Gemini đang tạm thời không phản hồi. Vui lòng thử lại hoặc nhập thủ công.",
      });
    }

    const payload = await response.json();
    const text =
      payload.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("") || "";

    const parsed = JSON.parse(extractJSON(text));
    if (!isValidResponse(parsed)) {
      console.error("Gemini returned an unexpected JSON structure.");
      return res.status(502).json({
        error:
          "Kết quả AI thiếu dữ liệu cần thiết. Vui lòng thử lại hoặc nhập thủ công.",
      });
    }

    return res.status(200).json(parsed);
  } catch (error) {
    if (error && error.name === "AbortError") {
      return res.status(504).json({
        error: "Yêu cầu AI quá thời gian chờ. Vui lòng thử lại.",
      });
    }

    console.error("ask-ai failed:", error);
    return res.status(502).json({
      error:
        "Không thể xử lý kết quả từ AI. Vui lòng thử lại hoặc nhập thủ công.",
    });
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = handler;
module.exports.buildPrompt = buildPrompt;
module.exports.extractJSON = extractJSON;
module.exports.normalizeTripContext = normalizeTripContext;
