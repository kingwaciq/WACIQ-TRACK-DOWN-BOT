require('dotenv').config();
const Telegram = require('node-telegram-bot-api');
const request = require("request");

const token = process.env.BOT_TOKEN;
const bot = new Telegram(token, { polling: true });

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

bot.onText(/\/(start|help)/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId,
    "👋 سلام!\n\n" +
    "زه یم 🤖 *WACIQ Track Down* — یو هوښیار روبوټ چې ستا لپاره د TikTok ویډیوګانې په لوړ کیفیت او بې واټرمارکه ښکته کوي.\n\n" +
    "🎯 یوازې لینک راولیږه، پاتې کار پرېږده په ما. 😎",
    { parse_mode: 'Markdown' });

  await delay(800);
  bot.sendMessage(chatId, "🎬 *لینک راولیږه چې پیل وکړو!*", { parse_mode: 'Markdown' });
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith('/')) return;

  if (text.includes('tiktok.com')) {
    const loadingMessages = [
      "🚀 *WACIQ Engine Initialized...*",
      "⚙️ *WACIQ* fetching TikTok magic...",
      "🔍 Extracting watermark-free secrets 🧠",
      "📡 Connecting to high-speed servers...",
      "🧩 Smart AI filtering video layers...",
      "🔄 Almost done... Hold tight!",
      "✨ *WACIQ* is polishing your video... 💎"
    ];
    let i = 0;
    const loadingMsg = await bot.sendMessage(chatId, loadingMessages[0], { parse_mode: "Markdown" });

    const interval = setInterval(() => {
      i++;
      bot.editMessageText(loadingMessages[i % loadingMessages.length], {
        chat_id: chatId,
        message_id: loadingMsg.message_id,
        parse_mode: "Markdown"
      });
    }, 1000);

    const startTime = Date.now();
    const reqUrl = `https://www.tikwm.com/api/?url=${text}&hd=1`;

    request(reqUrl, async (err, response, body) => {
      clearInterval(interval);

      try {
        const json = JSON.parse(body);
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        if (!json.data || !json.data.hdplay) {
          return bot.sendMessage(chatId, "❌ بښنه غواړم، ویډیو نشم ښکته کولی. مهرباني وکړه وروسته بیا هڅه وکړه.");
        }

        const videoUrl = json.data.hdplay;

        await delay(500);
        bot.sendMessage(chatId, "🎬 ویډیو چمتو ده! لطفاً کیفیت غوره کړه 👇", {
          reply_markup: {
            inline_keyboard: [
              [{ text: "📥 360p", url: videoUrl }],
              [{ text: "📥 480p", url: videoUrl }],
              [{ text: "📥 720p HD", url: videoUrl }],
              [{ text: "🎧 Audio Only", url: videoUrl }]
            ]
          }
        });

        await delay(300);
        bot.sendMessage(chatId,
          `✅ ستا ویډیو چمتو شوه!\n` +
          `⏱️ په ${duration} ثانیو کې ډاونلوډ شوه.\n` +
          `🤖 *WACIQ Track Down*\n` +
          `📤 TikTok ویډیو پرته له واټرمارک اپلوډ شوه.\n\n👇 د نورو امکاناتو لپاره:`,
          {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [{ text: "🔄 Update", url: "https://t.me/WK_ALPHA_03" }],
                [{ text: "🏅 Sport", url: "https://t.me/WK_TECH_03" }]
              ]
            }
          });
      } catch (e) {
        bot.sendMessage(chatId, "🚫 ستونزه رامنځته شوه، بیا هڅه وکړه.");
      }
    });
  } else {
    bot.sendMessage(chatId,
      "🧐 مهرباني وکړه یو *درست TikTok لینک* راولیږه.\n\n" +
      "🤖 زه یم *WACIQ Track Down* – زه یوازې TikTok ویډیوګانې پېژنم!",
      { parse_mode: 'Markdown' });
  }
}); 
