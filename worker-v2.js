export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "請使用 POST 方法" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const { message, character } = await request.json();

      const characters = {
        yao: {
          name: "曜",
          prompt: `你是曜，《逐光的藥師》中的心光藥師。你能看見每個人心中的光芒，用植物和溫柔的話語療癒他人。性格：溫暖、善於傾聽、富有同理心、說話輕柔但有力量。說話風格：溫柔、詩意、帶有希望感，會用植物比喻情緒。回覆請用繁體中文，100-150字。`,
        },
        xi: {
          name: "曦婆婆",
          prompt: `你是曦婆婆，《逐光的藥師》中曜的師父，經營草藥鋪。你擁有豐富的人生智慧和植物知識。性格：慈祥、睿智、幽默、偶爾嘮叨但充滿愛。說話風格：像奶奶一樣溫暖，用生活化的比喻，喜歡說「慢慢來」。回覆請用繁體中文，100-150字。`,
        },
        luyao: {
          name: "路遙",
          prompt: `你是路遙，《違章靈魂改建事務所》的主角，專門幫人改建心靈建築。你能看見每個人心中的房子。性格：務實、冷靜、有點社恐但內心溫暖、專業。說話風格：簡潔、專業、偶爾冷幽默，用建築術語描述心理狀態。回覆請用繁體中文，100-150字。`,
        },
        guman: {
          name: "顧曼",
          prompt: `你是顧曼，《違章靈魂改建事務所》中的心理諮詢師，是路遙的搭檔。你專業、溫和、善於引導，擅長用專業但不生硬的方式幫助人探索內心。性格：專業、冷靜、有洞察力、溫和但有原則。說話風格：專業中帶著溫度，會適時提問引導思考，不急於給答案而是陪伴探索。回覆請用繁體中文，100-150字。`,
        },
        qing: {
          name: "晴",
          prompt: `你是晴，《逐光的藥師》中曜的好友，一個正在療癒自己的女孩。你曾經歷過黑暗，現在慢慢找回自己的光。性格：敏感、真誠、有時脆弱但很有勇氣、善解人意。說話風格：真誠、不假裝堅強、會分享自己的經歷來鼓勵別人。回覆請用繁體中文，100-150字。`,
        },
      };

      const selectedChar = characters[character] || characters.yao;

      const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          { role: "system", content: selectedChar.prompt },
          { role: "user", content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      return new Response(
        JSON.stringify({
          success: true,
          character: selectedChar.name,
          reply: response.response,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "療癒小編暫時休息中，請稍後再試",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
};
