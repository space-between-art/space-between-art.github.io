# 🖼️ 社群分享圖片（OG Image）製作指南

## 為什麼需要 OG Image？

當有人在 Facebook、Twitter、LINE 分享你的網站時，會顯示一張預覽圖片。
好的 OG Image 可以大幅提升點擊率！

---

## 需要製作的圖片

| 檔案名稱 | 用途 | 尺寸 |
|---------|------|------|
| `og-image.png` | 首頁分享圖 | 1200 x 630 px |
| `og-healing-universe.png` | 療癒宇宙頁面 | 1200 x 630 px |
| `og-ai-chat.png` | AI 小編頁面 | 1200 x 630 px |
| `og-quiz.png` | 心靈建築測驗 | 1200 x 630 px |
| `apple-touch-icon.png` | iOS 書籤圖示 | 180 x 180 px |

---

## 設計建議

### og-image.png（首頁）

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│     🌿         Space Between Art          🔧       │
│                                                     │
│            「在光與暗之間，療癒發生」                 │
│                                                     │
│     《逐光的藥師》    《違章靈魂改建事務所》          │
│                                                     │
│              療癒系都市奇幻小說                      │
│                                                     │
└─────────────────────────────────────────────────────┘

背景：深森林綠到深藍漸層
文字：金色/銅色
```

### og-quiz.png（心靈建築測驗）

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                   🏠                                │
│                                                     │
│          你的心裡住著什麼房子？                      │
│                                                     │
│              心靈建築測驗                           │
│                                                     │
│         🏛️ 玻璃屋 🏰 碉堡 🏠 樣品屋                 │
│                                                     │
│              Space Between Art                      │
│                                                     │
└─────────────────────────────────────────────────────┘

背景：深色（#0d1117）
強調色：銅色
```

---

## 免費製作工具

1. **Canva**（推薦）
   - https://www.canva.com
   - 搜尋「OG Image」模板
   - 免費版足夠使用

2. **Figma**
   - https://www.figma.com
   - 更專業的設計工具
   - 完全免費

3. **Adobe Express**
   - https://express.adobe.com
   - 有預設模板

---

## 上傳位置

製作完成後，將圖片放到：

```
space-between-art-seo/
└── images/
    ├── og-image.png           ← 首頁
    ├── og-healing-universe.png
    ├── og-ai-chat.png
    ├── og-quiz.png
    ├── apple-touch-icon.png   ← iOS 書籤
    ├── favicon.svg            ← 已建立
    └── logo.png               ← 網站 logo
```

---

## 測試工具

上傳後，用這些工具測試顯示效果：

- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/
- **通用**: https://www.opengraph.xyz/

---

## 臨時方案

如果暫時沒有圖片，可以先用線上工具自動產生：

1. 訪問 https://og-image.vercel.app/
2. 輸入標題和描述
3. 下載生成的圖片

或者使用 Cloudflare 的 og-image 服務（進階）

---

*Space Between Art | SEO 優化指南*
