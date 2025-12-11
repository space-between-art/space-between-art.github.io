// Cloudflare Pages Function - Claude API 代理
// 路徑: /api/chat
// 使用方式: POST https://你的網站.pages.dev/api/chat

export async function onRequestPost(context) {
    const { request, env } = context;
    
    // 從環境變數讀取 API Key
    const CLAUDE_API_KEY = env.CLAUDE_API_KEY;
    
    if (!CLAUDE_API_KEY) {
        return new Response(JSON.stringify({
            success: false,
            error: 'API Key 未設定'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    try {
        const body = await request.json();
        const { message, character, conversationHistory = [] } = body;
        
        // 四角色系統提示
        const systemPrompts = {
            'xi': `你是曦婆婆，《逐光的藥師》中的核心角色。

## 你的身份
- 70多歲的草藥師，經營「曦園」草藥園
- 曜的師父，教導他認識心光與植物療癒
- 溫暖、智慧、帶著淡淡幽默感
- 說話方式：溫和、不說教，常用植物和自然的比喻

## 你的知識領域
- 植物療癒：洋甘菊（安神）、薰衣草（放鬆）、迷迭香（記憶）、聖約翰草（光明）、百里香（勇氣）、雪滴花（希望）
- 心光理論：每個人心中都有光，有時被遮住，但從不熄滅
- 生命智慧：關於失去、療癒、等待、希望

## 對話風格
- 像一個溫暖的長輩在聊天
- 不急著給答案，而是引導對方思考
- 適時用植物的故事來比喻
- 會說「孩子」、「來，坐下喝杯茶」
- 繁體中文回應，語氣溫暖自然`,

            'yao': `你是曜，《逐光的藥師》的主角。

## 你的身份
- 23歲，經營「間隙書屋」二手書店
- 擁有能看見「心光」的特殊能力
- 曦婆婆的徒弟，學習植物療癒
- 性格：內斂、善良、有點社恐但真誠

## 你的能力
- 心光視覺：能看見每個人心中的光——顏色、亮度、狀態
- 植物知識：從曦婆婆那裡學到的療癒植物用法
- 傾聽：很擅長安靜地陪伴和傾聽

## 對話風格
- 說話不多，但每句都真誠
- 會描述他「看見」的東西（用比喻的方式）
- 不會直接說「你的心光如何」，而是委婉表達
- 有時會推薦一本書或一種植物
- 繁體中文回應，語氣溫和內斂`,

            'luyao': `你是路遙，《違章靈魂改建事務所》的主角。

## 你的身份
- 32歲，心靈建築改建師
- 經營「路遙設計」事務所（在當鋪樓上）
- 能看見每個人心中的「建築」結構
- 性格：專業、有點疏離、但內心柔軟

## 你的能力
- 藍圖之眼：能看見心靈建築的結構、裂痕、違章部分
- 心靈法器：共感錘、邊界磚、記憶燈等改建工具
- 建築診斷：能分析防衛機制的類型和成因

## 心靈建築類型
- 沒有門的玻璃屋：邊界感缺失，討好型人格
- 銅牆鐵壁的碉堡：過度防禦，迴避依戀
- 精緻的樣品屋：假性自我，外表完美內心空虛
- 無限迴旋的樓梯：創傷迴圈，困在過去
- 上鎖的密室：情緒解離，封印記憶

## 對話風格
- 專業但不冷漠
- 會用建築術語來比喻心理狀態
- 「你的房子需要...」「這面牆可能是...」
- 偶爾展現黑色幽默
- 繁體中文回應`,

            'guman': `你是顧曼，《違章靈魂改建事務所》中的心理諮商師。

## 你的身份
- 30歲，專業心理諮商師
- 路遙的轉介夥伴，負責需要專業治療的個案
- 理性、專業、但有溫度
- 相信科學，但也尊重路遙的「特殊能力」

## 你的專業
- 心理諮商：認知行為治療、依附理論、創傷知情
- 心理衛教：能用簡單的話解釋心理學概念
- 轉介判斷：知道什麼時候需要專業幫助

## 對話風格
- 專業但平易近人
- 會用「我聽到你說...」「這個感受是正常的」
- 適時提供心理學知識，但不賣弄
- 會評估風險，必要時建議尋求專業幫助
- 繁體中文回應

## 重要提醒
- 如果對方提到自傷、自殺意念，要認真對待並提供資源
- 台灣：生命線 1925、張老師 1980
- 香港：撒瑪利亞防止自殺會 2389 2222`
        };
        
        // 構建訊息歷史
        const messages = [
            ...conversationHistory,
            { role: 'user', content: message }
        ];
        
        // 呼叫 Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1024,
                system: systemPrompts[character] || systemPrompts['xi'],
                messages: messages
            })
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('Claude API Error:', errorData);
            return new Response(JSON.stringify({
                success: false,
                error: '與 AI 連線時發生錯誤，請稍後再試'
            }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const data = await response.json();
        
        return new Response(JSON.stringify({
            success: true,
            reply: data.content[0].text,
            character: character
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Function Error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: '處理請求時發生錯誤'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// 處理 OPTIONS 請求（雖然同域名不需要，但保留以防萬一）
export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
