# 《心宅：禁室》網站整合指南

## 📂 檔案結構

```
space-between-art/
├── index.html              ← 需更新：加入心宅系列
├── gallery.html            ← 需更新：加入心宅金句卡片區
├── downloads.html          ← 需更新：加入心宅金句卡片
│
├── hearthouse/             ← 新資料夾
│   ├── index.html          ✅ 作品詳情頁
│   ├── quotes.html         ✅ 金句卡片頁
│   └── 心宅禁室_封面.png    ← 待製作
│
└── downloads/              ← 金句卡片圖檔
    ├── 01-22_...           （現有卡片）
    └── 23-34_hearthouse_... ← 待製作
```

---

## 🏠 首頁 index.html 更新

在作品展示區 `#works` 加入心宅系列卡片：

```html
<!-- 在現有的作品卡片後面加入 -->

<!-- 心宅：禁室 -->
<article class="work-card hearthouse">
    <div class="work-image">
        <img src="hearthouse/心宅禁室_封面.png" alt="心宅：禁室">
        <div class="work-overlay">
            <span class="work-tag">心理驚悚療癒</span>
        </div>
    </div>
    <div class="work-content">
        <span class="work-series">心宅系列・第一冊</span>
        <h3 class="work-title">心宅：禁室</h3>
        <p class="work-subtitle">THE FORBIDDEN ROOM</p>
        <p class="work-desc">
            梧桐街47號，一棟維多利亞式老宅，二十年的沉默。
            六位心理學專家聯手解開禁室之謎——
            創傷是裂縫，記憶是房間，療癒是重建。
        </p>
        <div class="work-meta">
            <span>🚪 心理建築</span>
            <span>🔮 六派交鋒</span>
            <span>💜 創傷療癒</span>
        </div>
        <a href="hearthouse/index.html" class="work-btn hearthouse">探索禁室 →</a>
    </div>
</article>
```

### CSS 變數新增

```css
/* 心宅系列配色 */
--violet-deep: #2D1B3D;
--violet-dark: #1A0F24;
--violet-muted: #4A3658;
--lavender: #9B8AA8;
--lavender-light: #C4B8D0;
--gold-crack: #D4A84B;

/* 作品卡片樣式 */
.work-card.hearthouse {
    --card-accent: var(--violet-muted);
    --card-glow: rgba(155, 138, 168, 0.3);
}

.work-btn.hearthouse {
    background: linear-gradient(135deg, var(--violet-muted) 0%, var(--violet-deep) 100%);
    border: 1px solid var(--lavender);
}

.work-btn.hearthouse:hover {
    background: linear-gradient(135deg, var(--lavender) 0%, var(--violet-muted) 100%);
}
```

---

## 🖼️ 畫廊 gallery.html 更新

### 1. 導航欄加入新分類

```html
<div class="section-nav">
    <a href="#characters" class="active">📷 角色寫真</a>
    <a href="#concepts">🎨 概念藝術</a>
    <a href="#botanicals">🌿 植物圖鑑</a>
    <a href="#quote-cards">💝 金句卡片</a>
</div>
```

### 2. 金句卡片區加入心宅系列

```html
<!-- 在 quote-cards-grid 內的現有分類後加入 -->

<!-- 心宅：禁室 -->
<div class="quote-card-category">
    <h3 class="category-title hearthouse">🚪 心宅：禁室</h3>
    <div class="cards-row">
        <div class="quote-card-item">
            <img src="downloads/23_hearthouse_mansion.png" alt="心靈宅邸" class="quote-card-image">
            <a href="downloads/23_hearthouse_mansion.png" download class="download-btn hearthouse">📥 下載</a>
        </div>
        <div class="quote-card-item">
            <img src="downloads/24_hearthouse_inside.png" alt="房子住在我裡面" class="quote-card-image">
            <a href="downloads/24_hearthouse_inside.png" download class="download-btn hearthouse">📥 下載</a>
        </div>
        <!-- 更多卡片... -->
    </div>
</div>
```

### 3. CSS 新增

```css
/* 心宅系列分類標題 */
.category-title.hearthouse {
    color: #4A3658;
    border-color: #9B8AA8;
}

/* 心宅系列下載按鈕 */
.download-btn.hearthouse {
    background: #4A3658;
}

.download-btn.hearthouse:hover {
    background: #2D1B3D;
}
```

---

## 📥 downloads.html 更新

### Tab 導航新增

```html
<nav class="tabs">
    <button class="tab-btn active" data-tab="all">全部</button>
    <button class="tab-btn pharmacist" data-tab="pharmacist">🌿 逐光的藥師</button>
    <button class="tab-btn renovator" data-tab="renovator">🔧 違章靈魂改建事務所</button>
    <button class="tab-btn bistro" data-tab="bistro">🍜 拾味小館</button>
    <button class="tab-btn hearthouse" data-tab="hearthouse">🚪 心宅：禁室</button>
</nav>
```

### CSS 新增

```css
.tab-btn.hearthouse.active {
    background: rgba(74, 54, 88, 0.1);
}

.section-header.hearthouse h2 {
    color: #4A3658;
}

.download-btn.hearthouse {
    background: #4A3658;
    color: white;
}

.download-btn.hearthouse:hover {
    background: #2D1B3D;
}
```

---

## 🎴 金句卡片檔名對照

| 編號 | 檔名 | 金句 |
|------|------|------|
| 23 | `23_hearthouse_mansion.png` | 每個人的心靈都是一座宅邸 |
| 24 | `24_hearthouse_inside.png` | 房子住在我裡面 |
| 25 | `25_hearthouse_crack.png` | 裂縫是光進來的地方 |
| 26 | `26_hearthouse_scalpel.png` | 六把手術刀 |
| 27 | `27_hearthouse_path.png` | 在找路 |
| 28 | `28_hearthouse_iceberg.png` | 潛意識是冰山 |
| 29 | `29_hearthouse_isolation.png` | 隔離 |
| 30 | `30_hearthouse_flower.png` | 黑暗中開花 |
| 31 | `31_hearthouse_betrayal.png` | 背叛承諾 |
| 32 | `32_hearthouse_silence.png` | 協議性沉默 |
| 33 | `33_hearthouse_free.png` | 妳可以自由了 |
| 34 | `34_hearthouse_seen.png` | 重新被看見 |

---

## 🔗 連載平台連結

完成封面製作後，更新作品頁中的連結：

```html
<div class="hero-cta">
    <a href="https://www.mirrorfiction.com/zh-Hant/book/XXXXX" class="btn btn-primary" target="_blank">📖 鏡文學閱讀</a>
    <a href="https://www.penana.com/story/XXXXX" class="btn btn-secondary" target="_blank">📚 Penana 連載</a>
</div>
```

---

## ✅ 部署清單

1. [ ] 使用 Midjourney 製作封面（2:3 直幅）
2. [ ] 製作 12 張金句卡片（4:5）
3. [ ] 上傳 `hearthouse/` 資料夾到 GitHub
4. [ ] 更新 `index.html` 加入心宅系列卡片
5. [ ] 更新 `gallery.html` 加入金句卡片區
6. [ ] 更新 `downloads.html` 加入心宅標籤頁
7. [ ] 在鏡文學建立作品頁，取得連結
8. [ ] 在 Penana 建立作品頁，取得連結
9. [ ] 更新作品頁連結

---

*心宅系列，開啟你的心靈建築之旅* 🚪✨
