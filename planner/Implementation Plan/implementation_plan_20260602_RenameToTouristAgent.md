# Kế hoạch: Đổi tên "Japan" → "Tourist Agent" toàn bộ workspace

**Ngày:** 2026-06-02  
**Người giao:** Vu Hoang  
**Phạm vi:** Toàn bộ thư mục `tourist_agent/` — tên file, title HTML, nội dung hiển thị, config, README

---

## 1. Nguyên tắc đổi tên

| Pattern cũ | Pattern mới | Ghi chú |
|---|---|---|
| `Japan Travel Planner` | `Tourist Agent` | Brand chính hiển thị với người dùng |
| `japan-planner-` | `tourist-agent-` | Prefix tên file HTML |
| `japan_travel_` | `tourist_agent_` | Prefix tên file MD/HTML dạng underscore |
| `Japan Travel Planner – Phase N` | `Tourist Agent – Phase N` | `<title>` tag |
| `Japan Travel Prompt Assistant` | `Tourist Agent – Phase 1` | Title Phase 1 |
| `japan-planner-v2` | `tourist-agent-v2` | File v2 |
| `user_guide_japan_travel_planner` | `user_guide_tourist_agent` | User guide |

**Không đổi:**
- Nội dung bên trong prompt gửi AI (vẫn nói "Nhật Bản" vì đó là dữ liệu chuyến đi mẫu)
- Logic JS `mapDest()` — `if(l.indexOf("japan")>=0)return"TYO"` là logic nhận diện input, không phải tên sản phẩm
- Tên file trong `Implementation Plan/` có ngày tháng (historical artifacts — không cần đổi)
- Nội dung bên trong các file `Implementation Plan/*.md` cũ (historical)

---

## 2. Danh sách thay đổi chi tiết

### 2.1 Rename file (dùng git mv để giữ history)

```powershell
cd "c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent"

# HTML files trong planner/
git mv "planner/japan-planner-phase2.html" "planner/tourist-agent-phase2.html"
git mv "planner/japan-planner-phase3.html" "planner/tourist-agent-phase3.html"
git mv "planner/japan-planner-phase4.html" "planner/tourist-agent-phase4.html"
git mv "planner/japan-planner-phase5.html" "planner/tourist-agent-phase5.html"
git mv "planner/japan-planner-v2.html" "planner/tourist-agent-v2.html"
git mv "planner/japan_travel_prompt_assistant_phase1_20260529.html" "planner/tourist_agent_prompt_assistant_phase1_20260529.html"
git mv "planner/japan_travel_ai_agent_infographic_20260529.html" "planner/tourist_agent_ai_agent_infographic_20260529.html"
git mv "planner/user_guide_japan_travel_planner.html" "planner/user_guide_tourist_agent.html"
```

### 2.2 Sửa nội dung `<title>` và badge trong 7 file HTML

Sau khi rename, mở từng file và sửa:

| File (tên mới) | `<title>` cũ | `<title>` mới |
|---|---|---|
| `tourist_agent_prompt_assistant_phase1_20260529.html` | `Japan Travel Prompt Assistant – Phase 1` | `Tourist Agent – Phase 1` |
| `tourist-agent-phase2.html` | `Japan Travel Planner – Phase 2` | `Tourist Agent – Phase 2` |
| `tourist-agent-phase3.html` | `Japan Travel Planner – Phase 3` | `Tourist Agent – Phase 3` |
| `tourist-agent-phase4.html` | `Japan Travel Planner – Phase 4` | `Tourist Agent – Phase 4` |
| `tourist-agent-phase5.html` | `Japan Travel Planner – Phase 5` | `Tourist Agent – Phase 5` |
| `tourist-agent-v2.html` | `Lên kế hoạch du lịch Nhật Bản` | `Tourist Agent – Lên kế hoạch du lịch` |
| `user_guide_tourist_agent.html` | `Cẩm Nang Sử Dụng - Japan Travel Planner` | `Tourist Agent – Cẩm Nang Sử Dụng` |

Sửa thêm trong mỗi file:
- `.phase-badge` text: `Phase N · ...` — giữ nguyên (không có "Japan")
- `<h1>`: đổi `Japan Travel Planner` → `Tourist Agent`
- `.header p` (mô tả): đổi các đề cập "Japan Travel Planner" → "Tourist Agent"

### 2.3 Sửa `user_guide_tourist_agent.html` — badge và link href

File này có 5 badge + 5 href trỏ sang các file phase — cần cập nhật href sau khi rename:

| href cũ | href mới |
|---|---|
| `japan_travel_prompt_assistant_phase1_20260529.html` | `tourist_agent_prompt_assistant_phase1_20260529.html` |
| `japan-planner-phase2.html` | `tourist-agent-phase2.html` |
| `japan-planner-phase3.html` | `tourist-agent-phase3.html` |
| `japan-planner-phase4.html` | `tourist-agent-phase4.html` |
| `japan-planner-phase5.html` | `tourist-agent-phase5.html` |

Cập nhật badge text tương ứng.

### 2.4 Sửa `index.html`

```html
<!-- Cũ -->
<title>Japan Travel Planner</title>
<meta http-equiv="refresh" content="0; url=planner/user_guide_japan_travel_planner.html" />
<a href="planner/user_guide_japan_travel_planner.html">...</a>

<!-- Mới -->
<title>Tourist Agent</title>
<meta http-equiv="refresh" content="0; url=planner/user_guide_tourist_agent.html" />
<a href="planner/user_guide_tourist_agent.html">...</a>
```

### 2.5 Sửa `vercel.json`

```json
{
  "rewrites": [
    { "source": "/", "destination": "/planner/user_guide_tourist_agent.html" }
  ]
}
```

### 2.6 Sửa `README.md`

Cập nhật:
- Section **Live Demo** — URL paths
- Section **Cấu Trúc** — danh sách file
- Section **Trạng Thái Hiện Tại** — tên file
- Heading `# Tourist Agent Workspace` (đã đúng) — giữ nguyên

### 2.7 Sửa `CLAUDE.md`

Dòng 18: đổi `planner/japan-planner-phase5.html` → `planner/tourist-agent-phase5.html`

---

## 3. Thứ tự thực hiện

```
Bước 1: git mv tất cả 8 file HTML (mục 2.1)
   ↓
Bước 2: Sửa <title> + <h1> + href trong 7 file HTML (mục 2.2 + 2.3)
   ↓
Bước 3: Sửa index.html + vercel.json (mục 2.4 + 2.5)
   ↓
Bước 4: Sửa README.md + CLAUDE.md (mục 2.6 + 2.7)
   ↓
Bước 5: git add . && git commit -m "rename: japan → tourist-agent across all files"
   ↓
Bước 6: git push origin master (nếu remote đã có)
```

---

## 4. Acceptance Criteria

| # | Tiêu chí | Cách kiểm tra |
|---|---|---|
| AC-01 | Không còn file nào tên chứa `japan-planner` hoặc `japan_travel` trong `planner/` | `dir planner\*japan*` → trống |
| AC-02 | `<title>` 7 file HTML không còn chữ "Japan" | Grep `<title>` trong 7 file |
| AC-03 | `user_guide_tourist_agent.html` — 5 link href trỏ đúng tên file mới | Mở file, click từng link |
| AC-04 | `index.html` redirect đúng sang `user_guide_tourist_agent.html` | Mở index.html |
| AC-05 | `vercel.json` destination đúng | Đọc file |
| AC-06 | `README.md` không còn đề cập tên file cũ | Grep `japan-planner\|japan_travel` trong README |
| AC-07 | Tất cả file HTML vẫn mở được offline sau khi rename | Double-click từng file |
| AC-08 | Commit thành công, git status sạch | `git status` → nothing to commit |

---

## 5. Checklist báo cáo cho agent

```
1. Số file đã rename: [n]/8
2. AC pass: [AC-01 đến AC-08: PASS / FAIL]
3. Git commit hash: [hash]
4. Điểm cần kiểm tra thêm: [nếu có]
```

---

## 6. Prompt giao việc cho agent (Copy-Pasteable)

```
Đọc file plan tại:
c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\planner\Implementation Plan\implementation_plan_20260602_RenameToTouristAgent.md

Thực hiện tuần tự 6 bước trong mục 3 của plan:
1. git mv 8 file HTML theo bảng mục 2.1
2. Sửa <title>, <h1>, .header p trong 7 file HTML theo bảng mục 2.2
3. Sửa href và badge text trong user_guide_tourist_agent.html theo bảng mục 2.3
4. Sửa index.html và vercel.json theo mục 2.4 và 2.5
5. Sửa README.md và CLAUDE.md theo mục 2.6 và 2.7
6. git add . && git commit

Sau mỗi bước xác nhận bằng lệnh thực tế (git status, cat file) trước khi sang bước tiếp.
Báo cáo đủ 4 mục theo mẫu mục 5 trong plan khi xong.
```

---

*Plan tạo ngày 2026-06-02. Người duyệt: Vu Hoang.*
