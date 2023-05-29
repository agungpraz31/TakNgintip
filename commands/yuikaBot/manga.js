const axios = require('axios')
const cheerio = require('cheerio')

const manga = async (yuikabot) => {
    yuikabot.command('manga', async (ctx) => {
        let query = ctx.message.text.split(' ')
        if(query.length < 2) { return ctx.reply('Perintah kurang tepat. Gunakan /manga link_manga') }
        let deleteCmdQuery = query.slice(1, query.length)
        await ctx.reply(`Loading...`)
        const baseUrl = `https://mangatoon.mobi`
        const mangaUrl = deleteCmdQuery.join(' ')
        // const url = `https://mangatoon.mobi/id/watch/2729433/111992`
        axios.get(mangaUrl)
            .then(async function(response) {
                if(response.status == 200) {
                    const html = response.data
                    const $ = cheerio.load(html)
                    let data = []
                    $('div.pictures > img').each(async function(i, elem) {
                        data[i] = {
                            image: $(this).attr('data-src')
                        }
                    })
                    const eps = $('div.episode-block-phone > div.episode').text().trim()
                    const title = $('div.title-phone').text().trim()
                    const prevEps = baseUrl + $('div.page-bar > a:nth-child(1)').attr('href')
                    const nextEps = baseUrl + $('div.page-bar > a:nth-child(2)').attr('href')
                    for(i = 1; i < data.length; i++) {
                        await ctx.replyWithPhoto(data[i].image)
                    }
                    await ctx.reply(`Episode: ${eps}\nTitle: ${title}\nEpisode Sebelumnya: ${prevEps}\nEpisode Berikutnya: ${nextEps}`)
                }
            })
    })
}

module.exports = manga