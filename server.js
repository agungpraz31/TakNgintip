
const { Bot, webhookCallback } = require('grammy')
const getData = require('./getData')
const menu = require('./menu')
const express = require('express')
require('dotenv').config()
const { autoQuote } = require("@roziscoding/grammy-autoquote");
const { owner } = require('./owner')
const tmp = require('./templateText.json')
const { commandBtn } = require('./bottomMenu')

const bot = new Bot(process.env.BOT_TOKEN);

bot.use((ctx, next) => {
    console.log(ctx.message.text)
    next()
})
bot.use(autoQuote)

bot.command('start', (ctx) => {
  ctx.reply(tmp.botDescription, {
    parse_mode: "HTML",
    reply_markup: commandBtn()
  })
})
bot.callbackQuery("menu", async (ctx) => {
  await ctx.answerCallbackQuery({
      text: "You were curious, indeed!",
  })
})

bot.command('menu', (ctx) => { menu(ctx) })

bot.command('owner', (ctx) => { owner(ctx) })

bot.command('ngintip1', (ctx) => {
    getData(ctx, 'instagram-data12.p.rapidapi.com')
})
bot.command('ngintip2', (ctx) => {
    getData(ctx, 'instagram-profile1.p.rapidapi.com')
})
bot.command('ngintip3', (ctx) => {
    getData(ctx, 'instagram-fast.p.rapidapi.com')
})
bot.command('ngintip4', (ctx) => {
    getData(ctx, 'instagram-scraper2.p.rapidapi.com')
})
bot.command('ngintip5', (ctx) => {
    getData(ctx, 'instagram-scraper-20231.p.rapidapi.com')
})
bot.command('ngintip6', (ctx) => {
    getData(ctx, 'instagram243.p.rapidapi.com')
})

bot.inlineQuery(/best bot (framework|library)/, async (ctx) => {
    await ctx.answerInlineQuery(
      [
        {
          type: "article",
          id: "grammy-website",
          title: "grammY",
          input_message_content: {
            message_text:
  "<b>grammY</b> is the best way to create your own Telegram bots. \
  They even have a pretty website! 👇",
            parse_mode: "HTML",
          },
          reply_markup: new InlineKeyboard().url(
            "grammY website",
            "https://grammy.dev/",
          ),
          url: "https://grammy.dev/",
          description: "The Telegram Bot Framework.",
        },
      ],
      { cache_time: 30 * 24 * 3600 }, // one month in seconds
    );
  });
  
  // Return empty result list for other queries.
  bot.on("inline_query", (ctx) => ctx.answerInlineQuery([]));

if(process.env.NODE_ENV === "production") {
    const app = express()
    app.use(express.json())
    app.use(webhookCallback(bot, "express"))

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Bot listening on port ${PORT}`)
    })
} else {
    bot.start();
}

// bot.launch(console.log('Bot Started..'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));