const qrcode = require('qrcode-generator')

const qrCode = (yuikabot) => {
    yuikabot.command('qr', async (ctx) => {
        var typeNumber = 4;
        var errorCorrectionLevel = 'L';
        var qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData('https://www.github.com/prazzdev');
        qr.make()
        let res = qr.createImgTag()
        let res2 = res.replace('<img src="', "")
        let res3 = res2.replace('" width="82" height="82"/>', "")
        console.log(res3)
        ctx.replyWithPhoto(res3)
    })
}

module.exports = qrCode