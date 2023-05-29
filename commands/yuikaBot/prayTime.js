const axios = require('axios')
// const { devMode, featurIsOffline } =  require('../../templateText.json')
// const conf = require('../../config.json')
// const onlineFeature = conf.features.isOnline

const prayTime = (yuikabot) => {
    yuikabot.command('praytime', async (ctx) => {
        // if(process.env.NODE_ENV == "development") return ctx.reply(devMode)
        // if(onlineFeature.prayTime == false) return ctx.reply(featurIsOffline)
        let query = ctx.message.text.split(' ')
        if(query.length < 2) { return ctx.reply('Perintah kurang tepat. Gunakan /praytime nama_kota') }
        let deleteCmdQuery = query.slice(1, query.length)
        await ctx.reply(`Loading...`)
        const city = deleteCmdQuery.join(' ')
        const options = {
            method: "GET",
            url: `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=8`
        }
        await axios.request(options)
            .then((res) => {
            const datas = res.data.data
            const Hijridate = datas.date.hijri
            const time = datas.timings
            ctx.reply(`Waktu sholat ${city.toUpperCase()} & sekitarnya\nDate : <b><code>${Hijridate.day} ${Hijridate.month.en} ${Hijridate.year}</code></b>\nShubuh : <code>${time.Fajr}</code>\nZhuhur : <code>${time.Dhuhr}</code>\n'Asr : <code>${time.Asr}</code>\nMaghrib : <code>${time.Maghrib}</code>\n'Isha : <code>${time.Isha}</code>\n`, { 
            parse_mode: "HTML"
            })
        })
    })
}

module.exports= prayTime