let menus = 
`
Hai, Yuika bisa bantu kamu dengan fitur dibawah :
<b>/praytime</b> - Cek waktu sholat
<b>/animeco</b> - Gambar Anime Couple
<b>/waifu</b> - Gambar Waifu
<b>/ly</b> - Cari Lirik Lagu
<b>/animequote</b> - Dapatkan Random Quotes Anime
<b>/earthquake</b> - Info Gempa Terkini
<b>/waifu</b> - Free Waifu Picture
`

const allMenu = (yuikabot) => {
    yuikabot.command('menu', (ctx) => {
        ctx.reply(menus, { parse_mode: "HTML" })
    })
}

module.exports = allMenu