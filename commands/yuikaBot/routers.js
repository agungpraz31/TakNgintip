let routers = {}
const menu = require('./menu')
const prayTime = require('./prayTime')
const coupleAnime = require('./coupleAnime')
const waifuPict = require('./waifuPict')
const songLyric = require('./songLyric')
const manga = require('./manga')
const earthquake = require('./earthquake')
const animeQuote = require('./animeQuote')
const qrCode = require('./qrcode')
const cekResi = require('./cekResi')

routers.menu = menu
routers.prayTime = prayTime
routers.coupleAnime = coupleAnime
routers.waifuPict = waifuPict
routers.songLyric = songLyric
routers.manga = manga
routers.earthquake = earthquake
routers.animeQuote = animeQuote
routers.qrCode = qrCode
routers.cekResi = cekResi

module.exports = routers