const axios = require('axios')
const cheerio = require('cheerio')
const {devMode} =  require('../../templateText.json')

const songLyric = (yuikabot) => {
    yuikabot.command('ly', async (ctx) => {
      if(process.env.NODE_ENV == "development") return await ctx.reply(devMode)
      let query = ctx.message.text.split(' ')
      if(query.length < 2) { return ctx.reply('Perintah kurang tepat. Gunakan /ly nama_lagu') }
      let deleteCmdQuery = query.slice(1, query.length)
      await ctx.reply(`Loading...`)
      let songTitle = deleteCmdQuery.join(' ')
      await ctx.reply(`Lirik untuk lagu ${songTitle} sedang dicari..`)

      await axios.get('https://www.musixmatch.com/search/' + songTitle)
            .then(async({ data }) => {
            const $ = cheerio.load(data)
            const hasil = {};
            let limk = 'https://www.musixmatch.com'
            const link = limk + $('div.media-card-body > div > h2').find('a').attr('href')
                await axios.get(link)
                .then(({ data }) => {
                    const $$ = cheerio.load(data)
                    hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
                    $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function(a,b) {
            hasil.lirik = $$(b).find('span > p > span').text() +'\n' + $$(b).find('span > div > p > span').text()
            })
        })
          await ctx.replyWithPhoto(hasil.thumb)
          await ctx.reply(hasil.lirik)
        })
        .catch(err => {
          console.log(err)
        })

      // await axios.get(`http://localhost:7000/lyric?title=${songTitle}`)
      //     .then(async function(response) {
      //       if(response.status != 200){ ctx.reply('Lirik lagu tidak ditemukan!') }
      //       const res = response.data.data
      //       const thumb = res.thumb
      //       const lyric = res.lirik
      //       await ctx.replyWithPhoto(thumb, { caption: `Title: ${songTitle}` })
      //       await ctx.reply(lyric)
      //       await ctx.reply(`Thanks for used me. Sorry if data isn't match.\nSupport me on :`, { reply_markup: sosmedBtn })
      //     })
    })
  }

  module.exports = songLyric