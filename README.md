# ⚡ 快速啟動指南

## 5 分鐘部署你的網站

---

### 步驟 1️⃣ 上傳到 GitHub

1. 創建新 Repository（[GitHub](https://github.com/new)）
2. 上傳所有檔案

---

### 步驟 2️⃣ 連接 Cloudflare Pages

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Workers & Pages** → **Create** → **Pages**
3. **Connect to Git** → 選擇你的 Repository
4. 設定：
   - Project name: `spacebetweenart`
   - Build command: **留空**
   - Build output directory: **留空**
5. **Save and Deploy**

---

### 步驟 3️⃣ 設定 API Key

1. 進入專案 → **Settings** → **Environment variables**
2. **Add variable**：
   - Name: `CLAUDE_API_KEY`
   - Value: 你的 Anthropic API Key
3. **Save**
4. **Deployments** → 重新部署

---

### 步驟 4️⃣ 完成！

訪問 `https://spacebetweenart.pages.dev`

測試 AI 小編：`/ai-chat.html`

---

## 常見問題

| 問題 | 解決 |
|-----|-----|
| AI 不回覆 | 檢查 API Key 是否正確設定 |
| 網站打不開 | 等待 1-2 分鐘部署完成 |
| 圖片不顯示 | 確認圖片路徑正確 |

---

詳細說明請看 `docs/完整部署指南.md`
