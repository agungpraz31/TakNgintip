const axios = require('axios')

async function prayTime() {
    const city = 'banjarnegara'
    const options = {
        method: "GET",
        url: `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=8`
    }
    axios.request(options).then((res) => {
        const datas = res.data.data
        const Hijridate = datas.date.hijri
        const time = datas.timings
        console.log(`╔══ Waktu Sholat ${city.toUpperCase()} & sekitarnya
        ║ Date : *${Hijridate.day} ${Hijridate.month.en} ${Hijridate.year}*
        ║ Shubuh : ${time.Fajr}
        ║ Zhuhur : ${time.Dhuhr}
        ║ 'Asr : ${time.Asr}
        ║ Maghrib : ${time.Maghrib}
        ║ 'Isha : ${time.Isha}
        ╚═════════════════════════`)
    })
}

module.exports = prayTime