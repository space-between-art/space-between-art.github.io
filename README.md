# 療癒金句卡片 - 部署指南

## 📁 檔案清單

```
downloads/
├── index.html              ← 下載頁面（原 downloads.html）
├── 01_pharmacist_memory.png
├── 02_pharmacist_light.png
├── 03_pharmacist_balance.png
├── 04_pharmacist_flame.png
├── 05_renovator_window.png
├── 06_renovator_city.png
├── 07_renovator_kintsugi.png
├── 08_renovator_signal.png
├── 09_renovator_glasshouse.png
├── 10_renovator_rain.png
└── 11_renovator_crack.png
```

## 🚀 部署步驟

### 步驟 1：在 GitHub 倉庫創建資料夾

在你的 `space-between-art` 倉庫根目錄創建 `downloads` 資料夾

### 步驟 2：上傳檔案

將所有檔案上傳到 `downloads` 資料夾

### 步驟 3：修改首頁導覽

在你的 `index.html` 中找到導覽區塊，加入下載頁面連結：

```html
<a href="downloads/">📥 金句卡片</a>
```

---

## 📝 首頁導覽修改範例

找到類似這樣的導覽代碼：

```html
<nav class="nav-links">
    <a href="#works">作品</a>
    <a href="healing-universe.html">療癒宇宙</a>
    <a href="gallery.html">畫廊</a>
    <!-- 加入這行 -->
    <a href="downloads/">📥 金句卡片</a>
</nav>
```

---

## 🔗 最終網址

部署完成後，訪問：
```
https://space-between.art/downloads/
```

---

## ✨ 頁面功能

- ✅ 分類標籤（全部 / 逐光 / 違章）
- ✅ 卡片預覽 Lightbox
- ✅ 一鍵下載按鈕
- ✅ 響應式設計
- ✅ 使用指南
