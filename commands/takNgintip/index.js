const getData = require('../../getData')

const takNgintip = (takngintip) => {
    takngintip.command('start', (ctx) => {
        ctx.reply(tmp.botDescription, {
        parse_mode: "HTML",
        reply_markup: commandBtn()
        })
    })
    takngintip.command('menu', (ctx) => { menu(ctx) })

    takngintip.command('owner', (ctx) => { owner(ctx) })

    takngintip.command('ngintip1', (ctx) => {
        getData(ctx, 'instagram-data12.p.rapidapi.com')
    })
    takngintip.command('ngintip2', (ctx) => {
        getData(ctx, 'instagram-profile1.p.rapidapi.com')
    })
    takngintip.command('ngintip3', (ctx) => {
        getData(ctx, 'instagram-fast.p.rapidapi.com')
    })
    takngintip.command('ngintip4', (ctx) => {
        getData(ctx, 'instagram-scraper2.p.rapidapi.com')
    })
    takngintip.command('ngintip5', (ctx) => {
        getData(ctx, 'instagram-scraper-20231.p.rapidapi.com')
    })
    takngintip.command('ngintip6', (ctx) => {
        getData(ctx, 'instagram243.p.rapidapi.com')
    })
}

module.exports = takNgintip