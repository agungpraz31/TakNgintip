const axios = require("axios")
const cheerio = require('cheerio')

const cekResi = (yuikabot) => {
    yuikabot.command('paket', async (ctx) => {
        let query = ctx.message.text.split(' ')
        if(query.length < 2) { return ctx.reply('Perintah kurang tepat. Gunakan /paket nama_ekspedisi no_resi') }
        let deleteCmdQuery = query.slice(1, query.length)
        const ekspedisi = deleteCmdQuery[0]
        const resi = deleteCmdQuery[1]
        if(deleteCmdQuery[0] == 'sicepat') {
            if(deleteCmdQuery[1].length == 12) {
                axios.get(`https://content-main-api-production.sicepat.com/public/check-awb/%20${resi}`)
                .then(async function(response) {
                    let data
                    if(response.status == 200) {
                        const res = response.data.sicepat.result
                        data = {
                            resi: res.waybill_number,
                            service: res.service,
                            weight: res.weight,
                            partner: res.partner,
                            sender: res.sender,
                            senderAddress: res.sender_address,
                            receiverAddress: res.receiver_address,
                            receiverName: res.receiver_name,
                            realPrice: res.realprice,
                            totalPrice: res.totalprice,
                            PODReceiver: res.POD_receiver,
                            PODReceiverTime: res.POD_receiver_time,
                            sendDate: res.send_date,
                            perwakilan: res.perwakilan,
                            trackHistory: res.track_history,
                            lastStatus: res.last_status
                        }

                        const { resi, service, weight, partner, sender, senderAddress, receiverName, receiverAddress, realPrice, totalPrice, PODReceiver, PODReceiverTime, sendDate, perwakilan, trackHistory, lastStatus } = data
                ctx.reply(
`<b>CEK RESI ${ekspedisi.toUpperCase()} :)</b>\n
No Resi: ${resi}
Service: ${service}
Berat: ${weight}
Partner: ${partner}
Pengirim: ${sender}
Alamat Pengirim: ${senderAddress}
Penerima: ${receiverName}
Alamat Penerima: ${receiverAddress}
Total bayar: ${totalPrice}
Diterima pada: ${PODReceiverTime}
Wilayah: ${perwakilan}
`, 
                        {
                            parse_mode: 'HTML'
                        }
                    )
                    for(i = 0; i < trackHistory.length-1; i++) {
                        await ctx.reply(trackHistory[i].city)
                        console.log(trackHistory[i].city)
                    }
                    await ctx.reply(lastStatus.receiver_name)
                    // console.log(lastStatus.receiver_name)
                    }
                    else {
                        return console.log("error")
                    }
                    
                })
            }
            else {
                ctx.reply('Nomor resi salah.')
            }
        }
        else {
            ctx.reply('Ekspedisi tidak ada atau nomor resi salah.')
        }
    })
}

module.exports = cekResi