const axios = require('axios')
const cheerio = require('cheerio')

const ytDownloader = () => {
    axios.get(`https://www.y2mate.com/id/youtube/OfwV7pDW6Dg`)
        .then(async function(response) {
            if(response.status == 200) {
                const html = response.data
                const $ = cheerio.load(html)
                const link = $('div#process-result').find('.btn-success.btn-file').attr('href')
                console.log(link)
            }
        })
}

ytDownloader()