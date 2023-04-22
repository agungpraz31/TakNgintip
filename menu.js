let menus = 
`
<b>PERINTAH BOT</b>
/ngintip1 [username]
/ngintip2 [username]

opsi lain coming soon!
`

const menu = (ctx) => {
ctx.reply(menus, { parse_mode: "HTML" })
}

module.exports = menu