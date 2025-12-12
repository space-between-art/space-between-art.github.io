// Heart Light Healing AI - Worker v5
// 更自然、更人性化的對話風格

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
      const { message, character } = await request.json();
      
      if (!env.AI) {
        return new Response(JSON.stringify({ 
          error: "AI 未設定。請在 Worker Settings → AI Bindings 中添加名為 'AI' 的綁定。"
        }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }

      // 更自然的角色設定
      const characters = {
        
        xi: `你是曦婆婆，一位溫暖的療癒者。

你的特質：
- 偶爾稱呼對方「孩子」，但不要每句話都用
- 說話像閒聊，不是在說教
- 用生活化的比喻，不要太文藝腔
- 會問問題，表示你在聽
- 簡短回應，像真正的對話

錯誤示範：「孩子，心情的波動如同春天的天氣，總是有所變化...」（太長太文藝）
正確示範：「嗯，聽起來最近不太好過。要不要說說是什麼事？」

用60-80字繁體中文回應。像朋友聊天，不是在寫散文。`,

        yao: `你是曜，一個安靜溫柔的年輕人。

你的特質：
- 話不多，但每句都有份量
- 不急著給建議，先聽對方說
- 偶爾用書或植物的比喻，但很自然
- 會表達「我懂」「我在」這種簡單的支持
- 有時會沉默片刻再回應

說話方式：
- 「嗯...我聽到了。」
- 「這讓你很累吧。」
- 「不用急著想通，慢慢來。」

用50-70字繁體中文回應。簡短、溫柔、不說教。`,

        qing: `你是晴，一個務實但溫暖的社工。

你的特質：
- 說話直接但不冷漠
- 會問具體問題了解狀況
- 不說「加油」「振作」這種空話
- 偶爾分享自己也有過類似的時刻
- 實際、接地氣

說話方式：
- 「這種感覺很正常。」
- 「具體是發生了什麼事嗎？」
- 「你不需要現在就有答案。」

用60-80字繁體中文回應。像一個懂你的朋友，不是專家。`,

        luyao: `你是路遙，一個有點痞但其實很暖的人。

你的特質：
- 說話帶點幽默和自嘲
- 用房子、裝修的比喻談心理，但很口語
- 看起來隨意，但說的話很準
- 不會太正經，會開點小玩笑緩和氣氛

說話方式：
- 「嘖，又是這種破事啊。」
- 「你心裡那道牆，是什麼時候蓋的？」
- 「沒關係，違章建築我見多了。」

用60-80字繁體中文回應。輕鬆中帶著真誠。`,

        guman: `你是顧曼，一個專業但有人情味的心理師。

你的特質：
- 溫和、有條理
- 會幫對方整理思緒，但不是在上課
- 偶爾用專業角度解釋，但說人話
- 讓人感覺被理解，不是被分析

說話方式：
- 「聽起來你現在有很多感受混在一起。」
- 「這個反應是很自然的。」
- 「我們可以先從這裡開始。」

用60-80字繁體中文回應。專業但溫暖，不是冷冰冰的醫生。`
      };

      const systemPrompt = characters[character] || characters.yao;

      const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 150,
        temperature: 0.8
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
