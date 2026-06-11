const fs = require('fs');
const path = require('path');

function testFile(filePath) {
  console.log(`\nTesting: ${path.basename(filePath)}`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract parseBudgetMax function
  const functionMatch = content.match(/function parseBudgetMax[\s\S]+?return Math\.round\(val\);\s*\n\}/);
  if (!functionMatch) {
    console.error("FAIL: Could not extract parseBudgetMax function");
    return false;
  }
  
  const fnCode = functionMatch[0];
  console.log("Extracted function code successfully.");
  
  // Eval it in current context
  let parseBudgetMaxFn;
  try {
    parseBudgetMaxFn = eval(`(function() { ${fnCode}; return parseBudgetMax; })()`);
  } catch (err) {
    console.error("FAIL: Error evaluating extracted function:", err);
    return false;
  }
  
  const testCases = [
    { input: "30", expected: 30000000 },
    { input: "30.5", expected: 30500000 },
    { input: "30,5", expected: 30500000 },
    { input: "30 triệu", expected: 30000000 },
    { input: "30.5 triệu", expected: 30500000 },
    { input: "30,5 tr", expected: 30500000 },
    { input: "30000000", expected: 30000000 },
    { input: "30.000.000", expected: 30000000 },
    { input: "30,000,000", expected: 30000000 },
    { input: "30.500.000", expected: 30500000 },
    { input: "30,500,000", expected: 30500000 },
    { input: "40m", expected: 40000000 },
    { input: "30.000.000 VND", expected: 30000000 },
    { input: "Khoảng 30.500.000đ", expected: 30500000 },
    { input: "rác", expected: 40000000 },
    { input: "", expected: 40000000 }
  ];
  
  let passedCount = 0;
  for (const tc of testCases) {
    try {
      const result = parseBudgetMaxFn(tc.input);
      if (result === tc.expected) {
        passedCount++;
      } else {
        console.error(`FAIL: Input: "${tc.input}" -> Got: ${result} | Expected: ${tc.expected}`);
      }
    } catch (err) {
      console.error(`FAIL: Exception on input "${tc.input}":`, err);
    }
  }
  
  console.log(`Passed ${passedCount}/${testCases.length} tests.`);
  return passedCount === testCases.length;
}

const p3 = "C:\\Users\\vu.hoang\\.gemini\\antigravity\\scratch\\tourist_agent\\planner\\tourist-agent-phase3.html";
const p4 = "C:\\Users\\vu.hoang\\.gemini\\antigravity\\scratch\\tourist_agent\\planner\\tourist-agent-phase4.html";
const p5 = "C:\\Users\\vu.hoang\\.gemini\\antigravity\\scratch\\tourist_agent\\planner\\tourist-agent-phase5.html";
const pv2 = "C:\\Users\\vu.hoang\\.gemini\\antigravity\\scratch\\tourist_agent\\planner\\tourist-agent-v2.html";

const ok3 = testFile(p3);
const ok4 = testFile(p4);
const ok5 = testFile(p5);
const okv2 = testFile(pv2);

if (ok3 && ok4 && ok5 && okv2) {
  console.log("\nALL PHASES AND PRODUCTION V2 PASSED VERIFICATION!");
  process.exit(0);
} else {
  console.error("\nSOME PHASES OR PRODUCTION V2 FAILED VERIFICATION!");
  process.exit(1);
}
