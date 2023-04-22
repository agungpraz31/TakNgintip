
const { Bot, webhookCallback } = require('grammy')
const getData = require('./getData')
const menu = require('./menu')
require('dotenv').config()

const bot = new Bot(process.env.BOT_TOKEN);

bot.use((ctx, next) => {
    console.log(ctx.message.text)
    next()
})
bot.command('menu', (ctx) => {
    menu(ctx)
})
bot.command('ngintip1', async (ctx) => {
    await getData(ctx, 'instagram-data12.p.rapidapi.com')
})
bot.command('ngintip2', async (ctx) => {
    await getData(ctx,'instagram-profile1.p.rapidapi.com')
})
bot.command('ngintip3', async (ctx) => {
    await getData(ctx,'instagram-fast.p.rapidapi.com')
})
bot.command('ngintip4', async (ctx) => {
    await getData(ctx, 'instagram-scraper2.p.rapidapi.com')
})

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

bot.launch(console.log('Bot Started..'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));