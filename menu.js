const { InlineKeyboard } = require('grammy')

let menus = [
    "/start --- Mulai bot",
    "/menu --- Tampilkan menu",
    "/ngintip1 <code>[username]</code>",
    "/ngintip2 <code>[username]</code>",
    "/ngintip3 <code>[username]</code>",
    "/ngintip4 <code>[username]</code>",
    "/ngintip5 <code>[username]</code>",
    "/ngintip6 <code>[username]</code>",
]
const menuList = menus.join('\n')
const menu = (ctx) => {
    ctx.reply(`<b>TAK_NGINTIP | IG STALKER BOT COMMANDS</b>\n${menuList}`, {
        parse_mode: "HTML",
    })
}

module.exports = menu