# 📱 心靈療癒學院 App 部署指南

本指南包含兩種方案的完整部署步驟：
1. **PWA（漸進式網頁應用）** — 立即可用，用戶可安裝到桌面
2. **Capacitor 原生 App** — 上架 App Store / Google Play

---

## 🌟 方案一：PWA（推薦先做）

### 優點
- ✅ 無需審核，立即上線
- ✅ 改動最小，幾小時內完成
- ✅ iOS + Android + 電腦都支援
- ✅ 自動更新，無需重新下載

### 部署步驟

#### 步驟 1：上傳 PWA 文件到網站

將以下文件上傳到你的 GitHub 倉庫根目錄：

```
你的網站/
├── manifest.json          ← PWA 配置
├── service-worker.js      ← 離線緩存
├── offline.html           ← 離線頁面
└── icons/                 ← App 圖標資料夾
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    ├── icon-512x512.png
    ├── apple-touch-icon.png  (180x180)
    ├── shortcut-chat.png     (96x96)
    ├── shortcut-supervision.png
    └── shortcut-journal.png
```

#### 步驟 2：生成 App 圖標

1. 在瀏覽器打開 `icon-generator.html`
2. 點擊每個尺寸下方的「下載」按鈕
3. 將下載的 PNG 檔案放入 `/icons/` 資料夾

#### 步驟 3：修改 HTML 頁面

在每個 HTML 頁面的 `<head>` 區域加入：

```html
<!-- PWA Meta 標籤 -->
<meta name="theme-color" content="#B87333">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="療癒學院">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
```

在 `</body>` 之前加入：

```html
<script>
// Service Worker 註冊
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('✅ SW 註冊成功'))
        .catch(err => console.error('❌ SW 註冊失敗', err));
}
</script>
```

#### 步驟 4：加入安裝提示（可選）

將 `pwa-snippet.html` 中的安裝橫幅代碼加入你的頁面，
這樣用戶會看到「安裝 App」的提示。

#### 步驟 5：驗證 PWA

1. 部署到 GitHub Pages
2. 打開 Chrome DevTools → Application → Manifest
3. 確認沒有錯誤
4. 點擊「Install」測試安裝功能

### PWA 測試清單

- [ ] manifest.json 可正常載入
- [ ] Service Worker 已註冊
- [ ] 可以安裝到桌面
- [ ] 離線時顯示 offline.html
- [ ] 啟動時沒有地址欄（standalone 模式）

---

## 📦 方案二：Capacitor 原生 App

### 前置需求

**iOS 開發：**
- macOS 電腦
- Xcode 15+
- Apple Developer 帳號（$99/年）

**Android 開發：**
- Android Studio
- JDK 17+
- Google Play Developer 帳號（$25 一次性）

### 環境設置

#### 步驟 1：安裝 Node.js

如果還沒有，先安裝 [Node.js](https://nodejs.org/)（建議 v18+）

#### 步驟 2：創建項目資料夾

```bash
# 創建項目
mkdir healing-academy-app
cd healing-academy-app

# 複製 package.json 和 capacitor.config.json 到此資料夾

# 安裝依賴
npm install
```

#### 步驟 3：準備網站文件

```bash
# 創建 www 資料夾
mkdir www

# 將你的網站所有文件複製到 www/
# 包括：
# - academy.html
# - ai-chat.html
# - case-supervision.html
# - reflection-journal.html
# - manifest.json
# - service-worker.js
# - icons/ 資料夾
# - 其他所有 HTML、CSS、JS 文件
```

#### 步驟 4：初始化 Capacitor

```bash
# 添加 iOS 平台
npx cap add ios

# 添加 Android 平台
npx cap add android

# 同步代碼
npx cap sync
```

### iOS App 打包

#### 步驟 1：打開 Xcode 項目

```bash
npx cap open ios
```

#### 步驟 2：設置簽名

1. 在 Xcode 選擇你的團隊（Team）
2. 確保 Bundle Identifier 正確：`art.spacebetween.healingacademy`
3. 選擇正確的開發憑證

#### 步驟 3：設置 App 圖標

1. 在 Xcode 打開 `Assets.xcassets`
2. 點擊 `AppIcon`
3. 拖入各尺寸的圖標：
   - 20pt, 29pt, 40pt, 60pt, 76pt, 83.5pt
   - 每個尺寸需要 1x, 2x, 3x 版本

#### 步驟 4：設置啟動畫面

1. 打開 `LaunchScreen.storyboard`
2. 自定義啟動畫面設計
3. 或使用 Capacitor 的 SplashScreen 插件

#### 步驟 5：打包上架

1. Product → Archive
2. Distribute App → App Store Connect
3. 在 App Store Connect 填寫應用資料
4. 提交審核

### Android App 打包

#### 步驟 1：打開 Android Studio 項目

```bash
npx cap open android
```

#### 步驟 2：設置 App 圖標

1. 右鍵點擊 `res` 資料夾
2. New → Image Asset
3. 選擇你的圖標文件
4. 生成各種尺寸

#### 步驟 3：設置簽名

1. Build → Generate Signed Bundle / APK
2. 創建新的 keystore（第一次）或使用現有的
3. 記住密碼！丟失無法恢復

#### 步驟 4：打包上架

1. Build → Generate Signed Bundle → Android App Bundle
2. 選擇 release 版本
3. 上傳到 Google Play Console
4. 填寫商店資訊
5. 提交審核

---

## 📋 App Store 資訊準備

### 基本資訊

| 項目 | 內容 |
|------|------|
| App 名稱 | 心靈療癒學院 |
| 副標題 | AI 療癒陪伴・心理健康學習 |
| Bundle ID | art.spacebetween.healingacademy |
| 類別 | 健康與健身 / 教育 |
| 年齡分級 | 12+ |

### App 描述（繁體中文）

```
🌙 心靈療癒學院 — 在光與暗之間，療癒發生

「心靈療癒學院」是一個結合療癒奇幻故事與心理健康教育的創新平台，讓你隨時隨地進行心靈自我照顧。

【主要功能】

💬 心光咨詢站
與五位 AI 療癒角色對話，獲得溫暖的情緒陪伴：
• 🌙 曦婆婆 — 溫暖智慧的長者
• ✨ 曜 — 溫柔內斂的療癒師
• ☀️ 晴 — 務實接地的社工師
• 🔧 路遙 — 犀利洞察的建築師
• 💜 顧曼 — 專業細膩的心理師

🎓 個案督導室
專業級的心理個案學習系統：
• 4 種互動模式：蘇格拉底提問、案例討論、角色扮演、督導反思
• 7 個教學案例，涵蓋依附、創傷、家庭系統等主題
• 整合榮格心理學、IFS 內在家庭系統等專業理論

📔 療癒反思日記
AI 引導的心理健康日記：
• 記錄每日心得與感恩
• 曦婆婆的溫暖回饋
• 追蹤情緒變化

【特色】
✨ 源自療癒奇幻小說《逐光的藥師》《違章靈魂改建事務所》的世界觀
✨ 專業心理學知識，以故事形式呈現
✨ 完全免費，無廣告
✨ 隱私保護，對話不會上傳伺服器

【免責聲明】
本應用提供情緒支持與心理健康知識普及，不能取代專業心理諮商或醫療。如需專業協助，請尋求專業管道。

讓療癒，從這裡開始。🌿
```

### 關鍵字

```
心理健康,療癒,冥想,情緒管理,心理諮商,自我成長,壓力管理,焦慮,AI陪伴,心理學,個案督導,心理師
```

### 截圖需求

| 裝置 | 尺寸 | 數量 |
|------|------|------|
| iPhone 6.7" | 1290 x 2796 | 3-5 張 |
| iPhone 6.5" | 1242 x 2688 | 3-5 張 |
| iPhone 5.5" | 1242 x 2208 | 3-5 張 |
| iPad 12.9" | 2048 x 2732 | 3-5 張 |

建議截圖內容：
1. 療癒學院首頁
2. 心光咨詢站對話畫面
3. 個案督導室
4. 療癒反思日記
5. 角色選擇畫面

---

## 🔧 常見問題

### PWA 相關

**Q: iOS 無法安裝 PWA？**
A: iOS 必須使用 Safari 瀏覽器，點擊分享 → 加入主畫面

**Q: Service Worker 沒有生效？**
A: 確保網站使用 HTTPS，並檢查 Console 是否有錯誤

### Capacitor 相關

**Q: iOS 模擬器無法連網？**
A: 檢查 `capacitor.config.json` 中的 `server.url` 是否正確

**Q: Android 打包失敗？**
A: 確保 JDK 版本正確，清除緩存後重試：
```bash
cd android
./gradlew clean
cd ..
npx cap sync
```

---

## 📞 需要幫助？

如果在部署過程中遇到問題，可以：
1. 回到 Claude 對話，描述具體錯誤
2. 查看 Capacitor 官方文檔：https://capacitorjs.com/docs
3. 查看 PWA 指南：https://web.dev/progressive-web-apps/

---

*Space Between Art | 心靈療癒學院 | 2025*
