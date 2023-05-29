const { Bot, webhookCallback } = require('grammy')
const express = require('express')
require('dotenv').config()
const { autoQuote } = require("@roziscoding/grammy-autoquote");
const yuikaLyrics = require('./commands/YuikaLyrics')
const takNgintip = require('./commands/takNgintip');
const yuikaTokpedAssist = require('./commands/yuikaTokpedAssist');
const yuikaBot = require('./commands/yuikaBot');

const yuikabot = new Bot(process.env.YUIKASIMI_TOKEN)
const takngintip = new Bot(process.env.TAKNGINTIP_TOKEN)
const yuikaly = new Bot(process.env.YUIKALY_TOKEN)
const yuikatokpedassist = new Bot(process.env.YUIKATOKPEDASSIST_TOKEN)

yuikabot.use((ctx, next) => {
    console.log(ctx.message)
    next()
})
yuikabot&yuikaly.use(autoQuote)

// Yuika Bot
yuikaBot(yuikabot)
// TakNgintip - Bot Stalker Instagram Profil
takNgintip(yuikabot)
// YuikaLyrics - Searching Lirik Lagu
yuikaLyrics(yuikaly)
// Yuika Tokopedia Assistant
yuikaTokpedAssist(yuikatokpedassist)

// Activation Configuration
if(process.env.NODE_ENV === "production") {
  const app = express()
  app.use(express.json())
  app.use(webhookCallback(yuikabot, "express"))
  app.use(webhookCallback(takngintip, "express"))
  app.use(webhookCallback(yuikaly, "express"))
  app.use(webhookCallback(yuikatokpedassist, "express"))

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
      console.log(`Bot listening on port ${PORT}`)
  })
} else {
  // yuikabot.start()
  // takngintip.start()
  // yuikaly.start()
  // yuikatokpedassist.start()
}
// Enable graceful stop
process.once('SIGINT', () => takngintip&yuikaly.stop('SIGINT'));
process.once('SIGTERM', () => takngintip&yuikaly.stop('SIGTERM'));