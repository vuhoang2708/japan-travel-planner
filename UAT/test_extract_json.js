// Script kiểm thử thuật toán extractJSON của Tourist Agent v2
const fs = require('fs');
const path = require('path');

// Giả lập hàm extractJSON từ mã nguồn
function extractJSON(str) {
  // Ưu tiên 1: strip markdown code block ```json ... ``` hoặc ``` ... ```
  var mdMatch = str.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (mdMatch) return mdMatch[1].trim();
  // Ưu tiên 2: tìm { đầu tiên và } cuối cùng (bao gồm nested objects)
  var start = str.indexOf("{");
  var end = str.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) return str.slice(start, end + 1);
  return str;
}

// Các test case
const testCases = [
  {
    name: "JSON sạch 100%",
    input: `{"status": "ok", "value": 123}`,
    expected: `{"status": "ok", "value": 123}`
  },
  {
    name: "Có markdown code block ```json",
    input: `Đây là kết quả:\n\`\`\`json\n{"status": "ok", "value": 123}\n\`\`\`\nChúc bạn đi vui vẻ!`,
    expected: `{"status": "ok", "value": 123}`
  },
  {
    name: "Có text rác ở cuối (như lỗi của người dùng)",
    input: `{\n  "status": "ok",\n  "value": 123\n}\n\nQuy tắc (Anti-hallucination): Tránh bịa đặt thông tin.`,
    expected: `{\n  "status": "ok",\n  "value": 123\n}`
  },
  {
    name: "Có text rác ở cả đầu và cuối",
    input: `Chào bạn, đây là thông tin:\n{\n  "status": "ok",\n  "value": 123\n}\nHy vọng thông tin này có ích.`,
    expected: `{\n  "status": "ok",\n  "value": 123\n}`
  },
  {
    name: "Markdown code block không có chữ json",
    input: `\`\`\`\n{"status": "ok", "value": 123}\n\`\`\``,
    expected: `{"status": "ok", "value": 123}`
  }
];

let allPassed = true;
testCases.forEach((tc, idx) => {
  const result = extractJSON(tc.input);
  const isMatch = result.trim() === tc.expected.trim();
  if (isMatch) {
    console.log(`[PASS] Case ${idx + 1}: ${tc.name}`);
  } else {
    console.log(`[FAIL] Case ${idx + 1}: ${tc.name}`);
    console.log(`  Input: ${tc.input}`);
    console.log(`  Expected: ${tc.expected}`);
    console.log(`  Actual: ${result}`);
    allPassed = false;
  }
  
  // Thử parse JSON thực tế xem có lỗi không
  try {
    JSON.parse(result);
    console.log(`  -> JSON.parse: SUCCESS`);
  } catch (err) {
    console.log(`  -> JSON.parse: FAILED (${err.message})`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log("\nTẤT CẢ CÁC TEST CASE ĐÃ ĐẠT (PASS)!");
  process.exit(0);
} else {
  console.log("\nCÓ TEST CASE BỊ LỖI (FAIL)!");
  process.exit(1);
}
