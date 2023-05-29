const { default: axios } = require("axios")

const yuikaTokpedAssist = (yuikatokpedassist) => {
    yuikatokpedassist.command('start', (ctx) => {
        ctx.reply('Use <b>/tk</b> [no_halaman] [nama_produk]\nExample: /tk 1 lego', {
            parse_mode: "HTML"
        })
    })
    yuikatokpedassist.command('tk', async (ctx) => {
        let query = ctx.message.text.split(' ')
        console.log(query)
        if(query.length < 2) { return ctx.reply('Perintah kurang tepat. Gunakan /tk nama_produk') }
        let deleteCmdQuery = await query.slice(1, query.length)
        let page = await deleteCmdQuery[0]
        let deleteCmdQuery2 = await deleteCmdQuery.slice(1, deleteCmdQuery.length)
        let productName = await deleteCmdQuery2.join(' ')
        await ctx.reply(`Loading...\nMeminta data untuk produk ${productName} halaman ${page}.`)
        await axios.get(`http://localhost:7000/tokped?page=${page}&keyword=${productName}`)
            .then(async function(response) {
                const res = response.data.payload
                const thumb = res.thumb
                const title = res.title
                for(i = 0; i < res.length; i++) {
                    await ctx.replyWithPhoto(res[i].thumb, {
                        caption: `Nama: <b>${res[i].title}</b>\nHarga: <b>${res[i].price}</b>\nKondisi: <b>${res[i].condition}</b>\nRating: <b>${res[i].prod_rating}</b>\nTerjual: <b>${res[i].prod_sold}</b>\nLokasi: <b>${res[i].shop_loc}</b>\nNama Toko: <b>${res[i].shop_name}</b>`,
                        parse_mode: "HTML"
                    })
                }
            })
    })
}

module.exports = yuikaTokpedAssist