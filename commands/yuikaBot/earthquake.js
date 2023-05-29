const axios = require('axios')
const xml2js = require('xml2js')
const { devMode, featurIsOffline } =  require('../../templateText.json')
const conf = require('../../config.json')
const onlineFeature = conf.features.isOnline

const earthquake = (yuikabot) => {
    yuikabot.command('earthquake', async (ctx) => {
        if(process.env.NODE_ENV == "development") return await ctx.reply(devMode)
        if(onlineFeature.earthquake == false) return ctx.reply(featurIsOffline)
        axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml')
            .then(response => {
                xml2js.parseString(response.data, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let res = result.Infogempa.gempa;
                    console.log(res[0])
                    ctx.replyWithPhoto(`https://ews.bmkg.go.id/TEWS/data/${res[0].Shakemap}`, {
                        caption: 
`<b>GEMPA TERKINI</b>
Tanggal : ${res[0].Tanggal}
Jam : ${res[0].Jam}
DateTime : ${res[0].DateTime}
Lintang : ${res[0].Lintang}
Bujur : ${res[0].Bujur}
Magnitude : ${res[0].Magnitude} SR
Kedalaman : ${res[0].Kedalaman}
Wilayah : ${res[0].Wilayah}
Potensi : ${res[0].Potensi}
Dirasakan : ${res[0].Dirasakan}`,
                        parse_mode: "HTML"
                    })
                }
                })
            })
    })
}

module.exports = earthquake