const axios = require('axios')
const {devMode} =  require('../../templateText.json')

const coupleAnime = (yuikabot) => {
    yuikabot.command('animeco', async (ctx) => {
        if(process.env.NODE_ENV == "development") return await ctx.reply(devMode)
        ctx.reply('Loading...')
        const url = `https://api.akuari.my.id/randomimage/ppcouple`
        await axios.get(url)
            .then(async (res) => {
                const datas = res.data.hasil
                await ctx.replyWithPhoto(datas.cowok, { caption: "Male" })
                setTimeout(async () => {
                    await ctx.replyWithPhoto(datas.cewek, { caption: "Female" })
                }, 1000)
            })
    })
}

module.exports = coupleAnime