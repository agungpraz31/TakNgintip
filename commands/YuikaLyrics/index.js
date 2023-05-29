const axios = require('axios')
const { sosmedBtn } = require('../../bottomMenu')

const yuikaLyrics = (yuikaly) => {
  yuikaly.command('ly', async (ctx) => {
    let query = ctx.message.text.split(' ')
    if(query.length < 2) { return ctx.reply('Perintah kurang tepat. Gunakan /ly nama_lagu') }
    let deleteCmdQuery = query.slice(1, query.length)
    await ctx.reply(`Loading...`)
    let songTitle = deleteCmdQuery.join(' ')
    await ctx.reply(`Lirik untuk lagu ${songTitle} sedang dicari..`)
    await axios.get(`http://localhost:7000/lyric?title=${songTitle}`)
        .then(async function(response) {
          if(response.status != 200){ ctx.reply('Lirik lagu tidak ditemukan!') }
          const res = response.data.data
          const thumb = res.thumb
          const lyric = res.lirik
          await ctx.replyWithPhoto(thumb, { caption: `Title: ${songTitle}` })
          await ctx.reply(lyric)
          await ctx.reply(`Thanks for used me. Sorry if data isn't match.\nSupport me on :`, { reply_markup: sosmedBtn })
        })
  })
}

module.exports = yuikaLyrics