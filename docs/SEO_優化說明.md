# 🔍 SEO 優化完整說明

## 已完成的 SEO 優化

### ✅ 基本 Meta Tags

每個頁面都已加入：

| Meta Tag | 說明 |
|----------|------|
| `title` | 頁面標題（60字內） |
| `description` | 頁面描述（150字內） |
| `keywords` | 關鍵字 |
| `robots` | 搜尋引擎指令 |
| `canonical` | 標準網址 |

### ✅ Open Graph（Facebook/社群分享）

```html
<meta property="og:type" content="website">
<meta property="og:url" content="網址">
<meta property="og:title" content="標題">
<meta property="og:description" content="描述">
<meta property="og:image" content="分享圖片">
```

### ✅ Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="標題">
<meta name="twitter:description" content="描述">
<meta name="twitter:image" content="分享圖片">
```

### ✅ 結構化數據（Schema.org）

已加入：
- WebSite Schema（網站資訊）
- Book Schema（兩本小說）

這會讓 Google 更懂你的網站，可能出現豐富搜尋結果。

### ✅ Sitemap.xml

網站地圖，幫助搜尋引擎爬取所有頁面。

### ✅ Robots.txt

告訴搜尋引擎可以爬取什麼。

---

## 主要關鍵字策略

### 首頁關鍵字
- 療癒小說
- 都市奇幻
- 華文小說 / 繁體中文小說
- 心理療癒
- 植物療癒
- 原創小說 / 免費小說

### 療癒宇宙關鍵字
- 心理測驗
- 心靈建築
- AI 聊天
- 自我探索
- 心理健康

### 作品關鍵字
- 逐光的藥師
- 違章靈魂改建事務所
- 療癒系小說

---

## 部署後需要做的事

### 1. 提交到 Google Search Console

1. 訪問 https://search.google.com/search-console
2. 添加你的網站 `space-between.art`
3. 驗證擁有權（Cloudflare 可以用 DNS 驗證）
4. 提交 Sitemap：`https://space-between.art/sitemap.xml`

### 2. 提交到 Bing Webmaster Tools

1. 訪問 https://www.bing.com/webmasters
2. 添加網站
3. 提交 Sitemap

### 3. 製作 OG Images

參考 `docs/OG_Image_製作指南.md` 製作社群分享圖片。

### 4. 測試

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **PageSpeed Insights**: https://pagespeed.web.dev/

---

## 進階 SEO（未來可做）

### 內容行銷
- [ ] 定期在 Substack 發布文章
- [ ] 連結回網站
- [ ] 建立外部連結

### 技術優化
- [ ] 圖片加入 alt 屬性
- [ ] 載入速度優化
- [ ] 手機體驗優化

### 追蹤分析
- [ ] 設定 Google Analytics
- [ ] 設定 Google Search Console
- [ ] 追蹤關鍵字排名

---

## SEO 效果預期

| 時間 | 預期效果 |
|------|----------|
| 1-2 週 | Google 開始索引 |
| 1-3 月 | 開始有搜尋流量 |
| 3-6 月 | 關鍵字排名提升 |
| 6-12 月 | 穩定的自然流量 |

**提醒**：SEO 是長期工作，持續產出好內容最重要！

---

*Space Between Art | SEO 優化文件*
