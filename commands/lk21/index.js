const axios = require('axios')
const cheerio = require('cheerio')

const lk21 = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://157.245.149.249/?s=${query}`)
            .then((data) => {
                const $ = cheerio.load(data.data)
                const judul = [];
                const genre = [];
                const thumb = [];
                const link = [];
                const format = [];
                $('div > div.item-article > header > h2 > a').each(function(a, b) {
                    deta = $(b).text();
                    judul.push(deta)
                })
                $('div > div.item-article > header > div.gmr-movie-on').each(function(a, b) {
                    deta = $(b).text();
                    genre.push(deta)
                })
                $('div > div.content-thumbnail.text-center > a > img').each(function(a, b) {
                    thumb.push($(b).attr('src'))
                })
                $('div > div.item-article > header > div.gmr-watch-movie > a').each(function(a, b) {
                    link.push($(b).attr('href'))
                })
                for (let i = 0; i < judul.length; i++) {
                    format.push({
                        judul: judul[i],
                        genre: genre[i],
                        thumb: thumb[i],
                        link_nonton: link[i]
                    })
                }
                if (format == '') {
                    resolve({
                        status: 'error'
                    })
                } else {
                    resolve(format)
                    let dataz = format[0];
                    console.log(dataz)
                }
            })
            .catch(reject)
    })
}

lk21()