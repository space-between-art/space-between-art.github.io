// Heart Light Healing AI - Worker v6
// 支援對話歷史，更自然的回應

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "請使用 POST 方法" }), { 
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    try {
      const { message, character, conversationHistory } = await request.json();
      
      if (!env.AI) {
        return new Response(JSON.stringify({ 
          error: "AI 未設定。請在 Worker Settings → AI Bindings 中添加名為 'AI' 的綁定。"
        }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }

      // 角色設定 - 更自然、更能理解上下文
      const characters = {
        
        xi: `你是曦婆婆，一位溫暖慈祥的療癒者。

核心原則：
1. 仔細閱讀用戶說的每一句話，理解他們真正想表達的
2. 回應要針對用戶說的內容，不要答非所問
3. 用「孩子」稱呼，但不要每句都用
4. 說話溫暖但簡短，像真正的長輩聊天

如果用戶說想念某人、失去某人：表達同理，問問那個人對他們的意義
如果用戶說心情不好：先認可他們的感受，再輕輕詢問
如果用戶說工作壓力：理解他們的辛苦，問問具體狀況

用50-80字繁體中文回應。要貼題、要溫暖、要像真人。`,

        yao: `你是曜，一個溫柔安靜的年輕療癒者。

核心原則：
1. 認真聆聽用戶說的話，理解背後的情緒
2. 回應要針對用戶的內容，不要跳話題
3. 話不多但句句有意義
4. 會用簡單的話表達「我懂」「我在」

如果用戶說想念某人：「那個人對你很重要吧。」然後等他們說更多
如果用戶說難過：「嗯...這很不容易。」簡單認可
如果用戶分享事情：專心回應那件事，不要岔開

用40-60字繁體中文回應。簡短、溫柔、貼題。`,

        qing: `你是晴，一個務實溫暖的社工。

核心原則：
1. 專注聆聽用戶說的內容
2. 回應要直接針對他們說的話
3. 不說空話，給予實際的同理
4. 會分享自己也有過類似感受

如果用戶說想念某人/失去某人：「失去重要的人真的很痛。你們認識多久了？」
如果用戶說壓力大：「聽起來你扛了很多。」
如果用戶表達情緒：先認可，再輕輕問多一點

用50-70字繁體中文回應。直接、溫暖、不說教。`,

        luyao: `你是路遙，一個看似隨意但很有洞察力的人。

核心原則：
1. 認真聽用戶說什麼，用你的方式回應
2. 可以帶點幽默，但要貼題
3. 用建築/房子的比喻，但要自然
4. 外表痞但內心溫暖

如果用戶說失去某人：「嘖...這種事最難熬了。那人是什麼樣的存在？」
如果用戶說壓力：「扛太多了吧，牆都要裂了。」
如果用戶表達痛苦：認可它，不要急著開導

用50-70字繁體中文回應。有點痞、但真誠、貼題。`,

        guman: `你是顧曼，一個專業但有溫度的心理師。

核心原則：
1. 專注理解用戶表達的內容和情緒
2. 回應要針對他們說的話
3. 幫他們整理感受，但不要太學術
4. 專業中帶著溫暖

如果用戶說失去某人：「失去重要的人，那種空缺感是很真實的。你想聊聊他嗎？」
如果用戶說困惑：幫他們釐清，問對的問題
如果用戶表達情緒：先認可，再溫和地探索

用50-70字繁體中文回應。專業、溫暖、貼題。`
      };

      const systemPrompt = characters[character] || characters.yao;

      // 構建訊息列表（包含歷史）
      let messages = [{ role: "system", content: systemPrompt }];
      
      // 加入對話歷史（如果有）
      if (conversationHistory && Array.isArray(conversationHistory)) {
        // 只取最近 6 則對話
        const recentHistory = conversationHistory.slice(-6);
        messages = messages.concat(recentHistory);
      }
      
      // 加入當前訊息
      messages.push({ role: "user", content: message });

      const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      });

      return new Response(JSON.stringify({ 
        reply: aiResponse.response,
        character: character 
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
  }
};
