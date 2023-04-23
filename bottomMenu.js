const { InlineKeyboard } = require('grammy')
const tmp = require('./templateText.json')

const supportBtn = async (ctx) => {
    const inlineKeyboard = new InlineKeyboard()
        .url(
            "SAWERIA",
            "https://saweria.co/agungpraz31"
        )
        .url(
            "TRAKTEER ID",
            "https://trakteer.id/agungpraz31"
        )
    await ctx.reply(`${tmp.arigatou}\n\n${tmp.support}`, { reply_markup: inlineKeyboard })
}

const ownerSocialMedia = async (ctx) => {
    const inlineKeyboard = new InlineKeyboard()
        .url(
            "GITHUB",
            "https://github.com/prazzdev"
        ).row()
        .url(
            "LINKEDIN",
            "https://linkedin.com/agungpraz31"
        ).row()
        .url(
            "INSTAGRAM",
            "https://instagram.com/agungpraz31"
        )
        .url(
            "TELEGRAM",
            "https://t.me/agungpraz31"
        )
        await ctx.reply(`${tmp.arigatou}\n\n${tmp.support}`, { reply_markup: inlineKeyboard })
}

const commandBtn = () => {
    const inlineKeyboard = new InlineKeyboard()
        .text('TAMPILKAN SEMUA PERINTAH', 'menu')

    return inlineKeyboard
}

module.exports = { supportBtn, ownerSocialMedia, commandBtn }