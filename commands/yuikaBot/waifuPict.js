const axios = require('axios')
const {devMode} =  require('../../templateText.json')

const waifuPict = (yuikabot) => {
    yuikabot.command('waifu', async (ctx) => {
        if(process.env.NODE_ENV == "development") return await ctx.reply(devMode)
        const title = 
`<b>Waifu Wallpaper</b>
<b>/waifu</b> [type] [category]
Example: <b>/waifu</b> sfw waifu`
        const waifuType = 
`<b>Type (sfw):</b> waifu, neko, shinobu, megumin, bully, cuddle, cry, hug, awoo, kiss, lick, pat, smug, bonk, yeet, blush, smile, wave, highfive, handhold, nom, bite, glomp, slap, kill, kick, happy, wink, poke, dance, cringe
<b>Type (nsfw):</b> waifu, neko, trap, blowjob`

        let query = ctx.message.text.split(' ')
        if(query.length < 2) { 
            return ctx.reply(`${title}\n\n${waifuType}`, { parse_mode: "HTML" })
        }
        if(query.length < 3) { 
            return ctx.reply(`Perintah kurang tepat. Gunakan /waifu [type] [category]\n\n${waifuType}`, { parse_mode: "HTML" })
        }
        let deleteCmdQuery = query.slice(1, query.length)
        await ctx.reply(`Loading...`)
        if(query.length = 3){
            await ctx.reply('Bentar ya!\nGambar lagi dikirim..')
        }
        const type = deleteCmdQuery[0];
        const category = deleteCmdQuery[1];
        await axios.get(`https://api.waifu.pics/${type}/${category}`).then(function(response){
            const resImage = response.data.url
            ctx.replyWithPhoto(resImage, {
                caption: 
`${title}

${waifuType}`,
                parse_mode: "HTML"
            })
            }).catch(err => {
                console.log(err)
            });
    })
}

module.exports = waifuPict