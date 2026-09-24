# CLAUDE.md — Space Between Studio 網站

## 項目簡介
Space Between Studio（隙光）的官方網站。品牌核心：金繼（kintsugi）——「裂縫是金線進來的地方」。
網站要令人感到**安靜但有生命力**：溫暖、通透、有呼吸空間，而唔係沉重或暗黑。

- 頁面架構：index、/writing、/studio、/diary、/about
- 後端：Cloudflare Workers + KV + n8n（本 repo 只處理前端，除非任務明確要求）
- 已有 Schema.org JSON-LD 及 llms.txt，修改時必須保留並保持有效

## 品牌規範（Logo System Guidelines v1.1）— 最高優先

### 顏色（全站只可用以下 token）
```css
:root {
  --color-rainforest: #004030;   /* 主色，Logo 專用；亦可用於深色標題／按鈕 */
  --color-river-stone: #648C7D;  /* 輔助色：連結 hover、分隔線、圖形 */
  --color-ivory: #F5EFE6;        /* 主背景 */
  --color-text: #1F2A26;         /* 內文（深色，對比度須 ≥ 4.5:1） */
  --color-white: #FFFFFF;
}
```
- 舊色 #2D3B35、#C9A84C（金）、#C67D4A（銅）一律替換，不得再出現。
- 如需要金繼「金線」點綴，先列出位置問我，唔好自行加色。

### 字體
- 英文標題／品牌字：Montserrat（Light 300 為主，可用 400/500 作層次）
- 中文：Noto Sans TC（內文）；如某頁明確需要文學感，可保留 Noto Serif TC
- 移除 Cormorant Garamond
- 用 Google Fonts，`font-display: swap`

### Logo
- 用 repo 內 SBS_Logo_v1.1 的 SVG 檔，不可重畫、變形、改色、加陰影或旋轉
- BΞTWEEN 的 E 是三條橫線，**絕對不可改回普通 E**
- Logo 只可用 Rainforest Green、黑或白
- 最小尺寸：橫版 120px 闊；符號 32×32px
- favicon 用門・隙符號

## 工作規則
1. 每次只做任務指定範圍，**不要改文案內容**（錯字除外，須列出）。
2. 改動前先讀相關檔案；大改前先寫計劃到 PR 描述。
3. 保持純 HTML/CSS/JS，不引入新框架或 build 工具，除非我同意。
4. 所有顏色、字體、間距用 CSS 變數，不寫死數值。
5. 完成後在 PR 描述列出：改了甚麼、沒改甚麼、需要我決定的事項。
6. 不確定時停下來列問題，不要自行假設品牌方向。

## 驗收標準
- 手機 360px、平板 768px、桌面 1280px 都正常，無橫向捲動
- Lighthouse：Accessibility ≥ 95、SEO ≥ 95
- 所有圖片有 alt；文字對比度符合 WCAG AA
- JSON-LD 及 llms.txt 仍然有效
