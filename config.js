const {devMode} =  require('./templateText.json')

const accountType = async (isPrivate) => {
    if(isPrivate === false) {
        return "Public"
    } else {
        return "Private"
    }
}
const verifiedAccount = async (isVerified) => {
    if(isVerified === false) {
        return "❌"
    } else {
        return "✅"
    }
}

const devModeAlert = async (ctx) => {
    if(process.env.NODE_ENV == "development") return await ctx.reply(devMode)
}

module.exports = { accountType, verifiedAccount, devModeAlert }