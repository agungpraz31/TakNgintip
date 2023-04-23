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

module.exports = { accountType, verifiedAccount }