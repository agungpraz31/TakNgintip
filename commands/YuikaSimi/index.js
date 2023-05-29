const axios = require('axios');
const FormData = require('form-data');
const data = new FormData();

const yuikaSimi = (yuikasimi) => {
    // yuikasimi.use((ctx, next) => { 
    //     console.log(ctx.message) 
    //     next() 
    // })
    // yuikasimi.command('start', async (ctx) => { ctx.reply('hi') })
    yuikasimi.on('message', async (ctx) => {
        // let query = ctx.message.text.split(' ')
        // if(query.length < 2) { return ctx.reply('Perintah kurang tepat. Gunakan /yu teks') }
        // let deleteCmdQuery = query.slice(1, query.length)
        // let text = deleteCmdQuery.join(' ')
        // console.log(text)
        data.append('version', 'v2');
        data.append('lc', 'id');        
        data.append('text', ctx.message.text);

        let option = {
            method: 'post',
            maxBodyLength: Infinity,
                url: 'https://api.simsimi.vn/v1/simtalk',
                headers: { 
                ...data.getHeaders()
                },
                data : data
        }
        try {
            await axios(option)
                .then(async function(response) {
                    const res = response.data
                    const message = res.text
                    const answer = res.message
                    await ctx.reply(answer)
                    console.log(res)
                })
        } catch {
            console.error()
        }
    })
}

module.exports = yuikaSimi