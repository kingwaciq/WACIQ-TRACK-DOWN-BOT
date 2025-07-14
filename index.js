require('dotenv').config();
const Telegram = require('node-telegram-bot-api');
const request = require("request");

const token = process.env.BOT_TOKEN;
const bot = new Telegram(token, { polling: true });

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// Start command
bot.onText(/\/(start|help)/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId,
    "✨ 𝗛𝗲𝘆 𝗧𝗶𝗸𝗧𝗼𝗸 𝗟𝗼𝘃𝗲𝗿𝘀 👨‍💻\n\n" +
    "𝗪𝗔𝗖𝗜𝗤 𝗧𝗥𝗔𝗖𝗞 𝗗𝗢𝗪𝗡 𝗕𝗢𝗧 🤖\n\n" +
    "ستا شخصي ویډیو هنټر 🎯\n\n" +
    "🎥 𝗛𝗗 ویډیو؟\n" +
    "🧼 𝗡𝗼 𝗪𝗮𝘁𝗲𝗿𝗺𝗮𝗿𝗸؟\n" +
    "⚡ 𝗙𝗮𝘀𝘁 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱؟\n\n" +
    "✔️ زه دا ټول یوځای درکوم!\n\n" +
    "یوازې ویډیو لینک راولیږه 🎊\n" +
    "ربات به ویډیو درته اپلوډ کړي ⌛\n\n" +
    "🔐 د نورو اپډیټونو لپاره زموږ چینلونو کې جواین شئ:",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "📡 𝙐𝙋𝘿𝘼𝙏𝙀", url: "https://t.me/WK_ALPHA_03" }],
          [{ text: "🏅 𝙎𝙐𝙋𝙋𝙊𝙍𝙏", url: "https://t.me/WK_TECH_03" }]
        ]
      }
    }
  );

  await delay(800);
  bot.sendMessage(chatId, "🎬 لینک راولیږه چې پیل وکړو!");
});

// Handle TikTok links
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith('/')) return;

  if (text.includes('tiktok.com')) {
    const loadingMessages = [
      "🚀 WACIQ Engine Initialized...",
      "⚙️ WACIQ fetching TikTok magic...",
      "🔍 Extracting watermark-free secrets 🧠",
      "📡 Connecting to high-speed servers...",
      "🧩 Smart AI filtering video layers...",
      "🔄 Almost done... Hold tight!",
      "✨ WACIQ is polishing your video... 💎"
    ];

    let i = 0;
    const loadingMsg = await bot.sendMessage(chatId, loadingMessages[0]);

    const interval = setInterval(() => {
      i++;
      bot.editMessageText(loadingMessages[i % loadingMessages.length], {
        chat_id: chatId,
        message_id: loadingMsg.message_id
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
        bot.sendMessage(chatId,
          "𝗪𝗔𝗖𝗜𝗤 𝗧𝗥𝗔𝗖𝗞 𝗗𝗢𝗪𝗡\n\n" +
          "ربات په مرسته بریالیتوب سره د TikTok نه ویډیو ډانلوډ شوه!\n" +
          "💎 بی واټرمارک\n" +
          "🎥 باکیفیته\n" +
          "⚡ چټکتیا سره\n\n" +
          "👇 دلته یې ډانلوډ کړه:",
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "📥 360p", url: videoUrl }],
                [{ text: "📥 480p", url: videoUrl }],
                [{ text: "📥 720p HD", url: videoUrl }],
                [{ text: "🎧 Audio Only", url: videoUrl }]
              ]
            }
          }
        );

        await delay(300);
        bot.sendMessage(chatId,
          "✅ ستا ویډیو چمتو شوه!\n" +
          `⏱️ په ${duration} ثانیو کې ډانلوډ شوه.\n\n` +
          "𝗪𝗔𝗖𝗜𝗤 𝗧𝗥𝗔𝗖𝗞 𝗗𝗢𝗪𝗡 🤖\n\n" +
          "🎊 د نورو تازه معلوماتو او سپورټ لپاره لاندې چینلونو ته جوین شئ:",
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "📡 𝙐𝙋𝘿𝘼𝙏𝙀", url: "https://t.me/WK_ALPHA_03" }],
                [{ text: "🏅 𝙎𝙐𝙋𝙋𝙊𝙍𝙏", url: "https://t.me/WK_TECH_03" }]
              ]
            }
          }
        );

      } catch (e) {
        bot.sendMessage(chatId, "🚫 ستونزه رامنځته شوه، بیا هڅه وکړه.");
      }
    });

  } else {
    bot.sendMessage(chatId,
      "🧐 مهرباني وکړه یو درست TikTok لینک راولیږه.\n\n" +
      "🤖 زه یم 𝗪𝗔𝗖𝗜𝗤 𝗧𝗥𝗔𝗖𝗞 𝗗𝗢𝗪𝗡 — زه یوازې TikTok ویډیوګانې پېژنم!");
  }
}); 
