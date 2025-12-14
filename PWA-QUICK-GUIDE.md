# 🚀 PWA 快速部署指南

## 需要上傳的文件

```
你的 GitHub 倉庫/
├── academy.html        ← 已更新（含 PWA 代碼）✅
├── manifest.json       ← 新增 ✅
├── service-worker.js   ← 新增 ✅
├── offline.html        ← 新增 ✅
└── icons/              ← 需要創建 ⚠️
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    ├── icon-512x512.png
    └── apple-touch-icon.png (180x180)
```

---

## 三步驟部署

### Step 1：生成圖標
1. 用瀏覽器打開 `icon-generator.html`
2. 點擊每個尺寸的「下載」按鈕
3. 在 GitHub 倉庫創建 `icons` 資料夾
4. 上傳所有圖標 PNG 文件

### Step 2：上傳 PWA 文件
將以下文件上傳到 GitHub 倉庫根目錄：
- `manifest.json`
- `service-worker.js`
- `offline.html`

### Step 3：更新 academy.html
用新的 `academy.html` 替換舊的（已整合 PWA 代碼）

---

## 測試 PWA

1. 訪問你的網站
2. 打開 Chrome DevTools (F12)
3. 點擊 Application → Manifest
4. 確認沒有錯誤

**安裝測試：**
- Android/Desktop：應該看到「安裝」橫幅
- iOS Safari：點擊分享 → 加入主畫面

---

## 已整合的功能

✅ PWA manifest 配置
✅ Service Worker 離線緩存
✅ 安裝提示橫幅（Android/Desktop）
✅ iOS 安裝指南
✅ 離線頁面
✅ App 圖標規格

---

*完成後，用戶可以將療癒學院「安裝」到手機桌面，像原生 App 一樣使用！*
