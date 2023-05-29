const router = require('./routers')

const yuikaBot = (yuikabot) => {
    yuikabot.command('start', (ctx) => {
        ctx.reply('Hai, aku Yuika.')
    })
    // All Menu
    router.menu(yuikabot)
    // prayTime
    router.prayTime(yuikabot)
    // Couple Anime Image
    router.coupleAnime(yuikabot)
    // Waifu Pict
    router.waifuPict(yuikabot)
    // Search Lyric
    router.songLyric(yuikabot)
    // Manga
    router.manga(yuikabot)
    // Earthquake
    router.earthquake(yuikabot)
    // animeQuote
    router.animeQuote(yuikabot)
    // qrCode
    router.qrCode(yuikabot)
    // cekResi
    router.cekResi(yuikabot)

}

module.exports = yuikaBot