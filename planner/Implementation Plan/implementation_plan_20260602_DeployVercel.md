# Kế hoạch: Fix Links + GitHub Repo + Deploy Vercel

**Ngày:** 2026-06-02  
**Người giao:** Vu Hoang  
**Ưu tiên:** Cao — cần có link public để showcase

---

## 1. Tổng quan công việc

3 việc theo thứ tự:

1. **Fix placeholder links** trong `user_guide_japan_travel_planner.html` — thêm href thực trỏ sang từng file phase
2. **Tạo GitHub repo** và push toàn bộ `tourist_agent/`
3. **Deploy lên Vercel** và lấy link public

---

## 2. Việc 1 — Fix links trong User Guide

### 2.1 File cần sửa
```
c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\planner\user_guide_japan_travel_planner.html
```

### 2.2 Thay thế các placeholder-box

Tìm và thay 5 dòng placeholder-box hiện tại (không có href):

```html
<div class="placeholder-box">→ Mở Phase 1</div>
```

Thay bằng link button thực:

```html
<a href="japan_travel_prompt_assistant_phase1_20260529.html" target="_blank" class="open-link">→ Mở Phase 1 (mở tab mới)</a>
```

Làm tương tự cho cả 5 phase:

| Phase | href |
|---|---|
| Phase 1 | `japan_travel_prompt_assistant_phase1_20260529.html` |
| Phase 2 | `japan-planner-phase2.html` |
| Phase 3 | `japan-planner-phase3.html` |
| Phase 4 | `japan-planner-phase4.html` |
| Phase 5 | `japan-planner-phase5.html` |

### 2.3 Thêm CSS cho open-link

Thêm vào `<style>`:

```css
.open-link {
  display: inline-block;
  background: var(--teal);
  color: #fff;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  margin-top: 12px;
  transition: background .15s;
}
.open-link:hover { background: #0f766e; }
```

### 2.4 Acceptance Criteria — Fix links

| # | Tiêu chí | Cách kiểm tra |
|---|---|---|
| AC-L1 | 5 link button hiển thị màu teal, không còn placeholder | Mở file → xem 5 button |
| AC-L2 | Click Phase 1 → mở đúng file phase 1 trong tab mới | Click thử |
| AC-L3 | File vẫn mở được offline (không dùng CDN mới) | Double-click |

---

## 3. Việc 2 — Tạo GitHub repo và push

### 3.1 Cấu trúc repo

Repo name gợi ý: **`japan-travel-planner`**  
Visibility: **Public** (cần public để Vercel deploy miễn phí)  
Owner: `vuhoang2708`

### 3.2 File cần có trước khi push

Tạo file `index.html` tại root của `tourist_agent/` — đây là entry point cho Vercel:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="refresh" content="0; url=planner/user_guide_japan_travel_planner.html" />
  <title>Japan Travel Planner</title>
</head>
<body>
  <p>Đang chuyển hướng... <a href="planner/user_guide_japan_travel_planner.html">Nhấn đây nếu không tự chuyển</a></p>
</body>
</html>
```

File này redirect ngay sang User Guide — ai vào root URL cũng thấy cẩm nang ngay.

### 3.3 Cập nhật README.md

Cập nhật `tourist_agent/README.md` — thêm section **Live Demo** ở đầu file:

```markdown
## Live Demo

🌐 **User Guide:** https://japan-travel-planner.vercel.app/planner/user_guide_japan_travel_planner.html  
✈️ **Phase 5 (Final Plan):** https://japan-travel-planner.vercel.app/planner/japan-planner-phase5.html
```

*(Điền URL thật sau khi Vercel cấp domain)*

### 3.4 File `.gitignore`

Tạo `.gitignore` tại root `tourist_agent/`:

```
# Python
__pycache__/
*.pyc
*.pyo
.env
*.key

# Windows
Thumbs.db
desktop.ini

# macOS
.DS_Store
```

### 3.5 Lệnh git (thực hiện tuần tự)

```powershell
# Bước 1: Tạo repo trên GitHub bằng gh CLI
gh repo create vuhoang2708/japan-travel-planner --public --description "Japan Travel Planner - 5-phase AI-powered trip planning tool"

# Bước 2: Add remote vào repo local
git -C "c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent" remote add origin https://github.com/vuhoang2708/japan-travel-planner.git

# Bước 3: Stage tất cả file
git -C "c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent" add .

# Bước 4: Commit
git -C "c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent" commit -m "feat: Japan Travel Planner v1.0 - 5 phases + Travel Optimizer + User Guide"

# Bước 5: Push
git -C "c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent" push -u origin master
```

**Lưu ý:** Kiểm tra `gh auth status` trước. Nếu chưa login, chạy `gh auth login` trước bước 1.

### 3.6 Acceptance Criteria — GitHub

| # | Tiêu chí | Cách kiểm tra |
|---|---|---|
| AC-G1 | Repo tồn tại tại `github.com/vuhoang2708/japan-travel-planner` | Mở URL |
| AC-G2 | Thấy đủ 6 file HTML trong thư mục `planner/` | Xem repo tree |
| AC-G3 | `index.html` ở root redirect về user guide | Click file |

---

## 4. Việc 3 — Deploy Vercel

### 4.1 Cách deploy (dùng Vercel CLI)

```powershell
# Bước 1: Kiểm tra vercel CLI
vercel --version

# Nếu chưa có, cài:
npm install -g vercel

# Bước 2: Login Vercel
vercel login

# Bước 3: Deploy từ thư mục tourist_agent
cd "c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent"
vercel --prod
```

Khi Vercel hỏi:
- **Set up and deploy?** → Y
- **Which scope?** → chọn account cá nhân
- **Link to existing project?** → N
- **Project name?** → `japan-travel-planner`
- **In which directory is your code located?** → `./` (root hiện tại)
- **Want to modify settings?** → N

### 4.2 Cấu hình `vercel.json` (tùy chọn, để clean URL)

Tạo `vercel.json` tại root `tourist_agent/`:

```json
{
  "rewrites": [
    { "source": "/", "destination": "/planner/user_guide_japan_travel_planner.html" }
  ]
}
```

### 4.3 Sau khi deploy

Vercel sẽ cấp URL dạng:
- `https://japan-travel-planner.vercel.app` → redirect về User Guide
- `https://japan-travel-planner.vercel.app/planner/japan-planner-phase5.html` → Phase 5

Copy URL này và điền vào `README.md` section **Live Demo** đã tạo ở bước 3.3.

### 4.4 Acceptance Criteria — Vercel

| # | Tiêu chí | Cách kiểm tra |
|---|---|---|
| AC-V1 | URL root mở được và redirect về User Guide | Mở link trong browser |
| AC-V2 | `/planner/japan-planner-phase5.html` load đúng | Mở trực tiếp URL |
| AC-V3 | Tất cả 6 file HTML accessible qua URL | Test từng link trong User Guide |
| AC-V4 | Không có lỗi 404 hay mixed content | Kiểm tra DevTools Console |

---

## 5. Thứ tự thực hiện

```
Việc 1: Fix links user_guide      (~5 phút)
   ↓
Việc 2: Tạo index.html + .gitignore + push GitHub   (~10 phút)
   ↓
Việc 3: Deploy Vercel + lấy URL + cập nhật README   (~5 phút)
```

---

## 6. Checklist báo cáo cho agent

Khi xong, báo cáo đủ 5 mục:

```
1. GitHub repo URL: https://github.com/vuhoang2708/...
2. Vercel URL: https://...vercel.app
3. AC pass: [AC-L1 đến AC-L3, AC-G1 đến AC-G3, AC-V1 đến AC-V4]
4. README đã cập nhật Live Demo: DONE / NOT DONE
5. Điểm cần kiểm tra thêm: [nếu có]
```

---

## 7. Prompt giao việc cho agent (Copy-Pasteable)

```
Đọc file plan tại:
c:\Users\vu.hoang\.gemini\antigravity\scratch\tourist_agent\planner\Implementation Plan\implementation_plan_20260602_DeployVercel.md

Sau đó thực hiện 3 việc theo thứ tự trong plan:
1. Fix placeholder links trong user_guide_japan_travel_planner.html
2. Tạo index.html, .gitignore, cập nhật README, tạo GitHub repo và push
3. Deploy lên Vercel và cập nhật README với link thật

Trước khi bắt đầu: kiểm tra gh auth status và vercel --version để xác nhận tool đã sẵn sàng.

Báo cáo đủ 5 mục theo mẫu ở mục 6 trong plan khi hoàn thành.
```

---

*Plan tạo ngày 2026-06-02. Người duyệt: Vu Hoang.*
