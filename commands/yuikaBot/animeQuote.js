const axios = require('axios')
const cheerio = require('cheerio')

const animeQuote = (yuikabot) => {
    yuikabot.command('animequote', async (ctx) => {
        const page = Math.round(Math.random() * 189)
        const listNumber = Math.round(Math.random() * 10)
        await axios.get(`https://otakotaku.com/quote/feed/${page}`)
            .then(async function(response) {
                const html = response.data
                const $ = cheerio.load(html)
                let data = []
                $('.kotodama-list').each(function(i, elem) {
                    data[i] = {
                        thumb: $(this).find('.char-img > img').attr('data-src'),
                        charName: $(this).find('.char-name').text().trim(),
                        animeTitle: $(this).find('.anime-title').text().trim(),
                        episode: $(this).find('div.meta').text().trim(),
                        date: $(this).find('small.meta').text().trim(),
                        quote: $(this).find('.kotodama-content').text().trim()
                    }
                })
                const result = data[listNumber]
                await ctx.replyWithPhoto(result.thumb, {
                    caption:
`
"<i>${result.quote}</i>" - <b>${result.charName}</b> (${result.animeTitle})\n\n<i>${result.date}</i>
`,
                    parse_mode: "HTML"
                })
            })
    })
}


module.exports = animeQuote