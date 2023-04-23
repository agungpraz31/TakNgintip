const { ownerSocialMedia } = require('./bottomMenu')

const owner = (ctx) => {
    ownerSocialMedia(ctx)
}

module.exports = { owner }