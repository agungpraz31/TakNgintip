const { supportBtn } = require('./bottomMenu')
const { accountType, verifiedAccount } = require('./config')

const getData = async (ctx, host) => {
    const axios = require('axios')
    ctx.reply('Loading...\nTunggu 5 detik, bila lebih ganti command lainnya.')
    const query = ctx.message.text
    let splitQuery = query.split(' ')
    console.log(splitQuery)
    if(splitQuery.length > 2 || splitQuery.length < 2) return ctx.reply('Format salah!')
    let selection = splitQuery[0]
    let username = splitQuery[1].toLowerCase()
    console.log(selection)
    if(selection == "/ngintip1") {
        ctx.reply('TakNgintip Simple Result, Loading...')
        const axios = require("axios");

        const options = {
        method: 'GET',
        url: 'https://instagram-data12.p.rapidapi.com/search/',
        params: {query: username},
        headers: {
            'X-RapidAPI-Key': '47cf8cbebdmshb010ee373830a5ep145af2jsnde10344aa49a',
            'X-RapidAPI-Host': host
        }
        };

        axios.request(options).then(async function (response) {
            console.log(response.data.users[0].user)
            console.log(response.data.status)
            if(response.data.status == "ok") {
                const user = response.data.users[0].user
                const username = user.username
                const fullName = user.full_name
                isPrivate = user.is_private
                isVerified = user.is_verified
                profilePict = user.profile_pic_url
                let replies =  `Username: ${username}\nFull Name: ${fullName}\nIs Private: ${isPrivate}\nIs Verified: ${isVerified}`
                // ctx.reply(replies)
                await ctx.replyWithPhoto(profilePict, {
                    caption: replies,
                });    
            }
            // ctx.reply('Tidak dapat menemukan pengguna!')
        }).catch(function (error) {
            console.error(error);
        });
    }
    else if(selection == "/ngintip2") {
        console.log(`select: ${selection}, user: ${username}`)
        const options = {
            method: 'GET',
            url: `https://instagram-profile1.p.rapidapi.com/getprofileinfo/${username}`,
            params: {user_name: username},
            headers: {
                'X-RapidAPI-Key': '47cf8cbebdmshb010ee373830a5ep145af2jsnde10344aa49a',
                'X-RapidAPI-Host': host
            }
        }
        await axios.request(options).then(async function (response) {
            console.log(response.data)
            const user = response.data
            const username = user.username
            const fullName = user.full_name
            const bio = user.bio
            const follower = user.followers
            const following = user.following
            const category = user.category_name
            const isPrivate = user.is_private
            const profilePict = user.profile_pic_url_hd
            let replies = `Username: ${username}\nFull Name: ${fullName}\nFollowers: ${follower}\nFollowing: ${following}\nCategory: ${category}\nIs Private: ${isPrivate}\nBio:\n ${bio}\n`

            // const inlineKeyboard = new InlineKeyboard()
            //     .text("Get random music", "random").row()
            //     .switchInline("Saweria");

            await ctx.replyWithPhoto(profilePict, { 
                caption: replies
            })
            supportBtn(ctx)
            // await ctx.reply("Dukung TakNgintip BOT melalui :", {
            //     reply_markup: inlineKeyboard
            // })
        })
    }
    else if(selection == "/ngintip3") {
        const options = {
            method: 'GET',
            url: `https://instagram-fast.p.rapidapi.com/profile/${username}`,
            headers: {
                'X-RapidAPI-Key': '47cf8cbebdmshb010ee373830a5ep145af2jsnde10344aa49a',
                'X-RapidAPI-Host': host
            }
        };
        
        axios.request(options).then(async function (response) {
            const user = response.data.data.user
            console.log(user);
            const bio = user.biography
            const follower = user.edge_followed_by.count
            const following = user.edge_follow.count
            const fullName = user.full_name
            const username = user.username
            const id = user.id
            const category = user.category_name
            const isPrivate = user.is_private
            if(isPrivate == "false"){ isPrivate =+ "Public" }
            const isVerified = user.is_verified
            const profilePict = user.profile_pic_url_hd
            let replies = 
                `ID: <code>${id}</code>\nUsername: <b>${username}</b>\nFull name: ${fullName}\nBio: ${bio}\nFollowers: <code>${follower}</code>\nFollowing: <code>${following}</code>\nCategory: ${category}\nAccount Type: ${isPrivate}\nIs Verified: ${isVerified}`

            await ctx.replyWithPhoto(profilePict, {
                caption: replies,
                parse_mode: "HTML",
            });

            await supportBtn(ctx)
        }).catch(function (error) {
            console.error(error);
        });
    }
    else if(selection == "/ngintip4") {
        const options = {
            method: 'GET',
            url: 'https://instagram-scraper2.p.rapidapi.com/user_info_by_id',
            params: {user_name: username},
            headers: {
                'X-RapidAPI-Key': '47cf8cbebdmshb010ee373830a5ep145af2jsnde10344aa49a',
                'X-RapidAPI-Host': host
            }
            };
        
            axios.request(options).then(async function (response) {
                console.log(response.status)
                const res = response.data
                const username = res.user.username
                const fullName = res.user.full_name
                const followerCount = res.user.follower_count
                const followingCount = res.user.following_count
                const mediaCount = res.user.media_count
                const profile_pict = res.user.hd_profile_pic_url_info.url
                const biography = res.user.biography
                console.log({ username, fullName, followerCount, followingCount, mediaCount, profile_pict, biography })
                let replies = `Username: ${username}\nFull name: ${fullName}\nFollower: ${followerCount}\nFollowing: ${followingCount}\nMedia Count: ${mediaCount}\nBiografi: ${biography}`
                await ctx.replyWithPhoto(profile_pict, { caption: replies })
            }).catch(function (error) {
                console.error(error);
            });
    }
    else if(selection == "/ngintip5") {
        const options = {
        method: 'GET',
        url: `https://instagram-scraper-20231.p.rapidapi.com/userinfo/${username}`,
        headers: {
            'X-RapidAPI-Key': '47cf8cbebdmshb010ee373830a5ep145af2jsnde10344aa49a',
            'X-RapidAPI-Host': host
        }
        };

        axios.request(options).then(async function (response) {
            if(response.data.status == "success") {
                const user = response.data.data
                const bio = user.biography
                const followers = user.edge_followed_by.count
                const following = user.edge_follow.count
                const fullName = user.full_name
                const id = user.id
                const category = user.category_name
                const isPrivate = user.is_private
                let accountTypeAfter = await accountType(isPrivate)
                const isVerified = user.is_verified
                let accountVerifiedAfter = await verifiedAccount(isVerified)
                const profilePict = user.profile_pic_url_hd
                const username = user.username

                let replies = `🔰 ID: ${id}\n📱 Username: ${username}\n🔎 Full name: ${fullName}\n📍 Followers: ${followers}\n📍 Following: ${following}\n🔖 Category: ${category}\n🔐 Account Type: ${accountTypeAfter}\n✔️ Is Verified: ${accountVerifiedAfter}\nBio: ${bio}`
                await ctx.replyWithPhoto(profilePict, {
                    caption: replies
                })
                supportBtn(ctx)
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
    else if(selection == "/ngintip6") {
        const options = {
        method: 'GET',
        url: `https://instagram243.p.rapidapi.com/userinfo/${username}`,
        headers: {
            'X-RapidAPI-Key': '47cf8cbebdmshb010ee373830a5ep145af2jsnde10344aa49a',
            'X-RapidAPI-Host': host
        }
        };

        axios.request(options).then(async function (response) {
            if(response.data.status == "success") {
                const user = response.data.data
                const bio = user.biography
                const followers = user.edge_followed_by.count
                const following = user.edge_follow.count
                const fullName = user.full_name
                const id = user.id
                const category = user.category_name
                const isPrivate = user.is_private
                let accountTypeAfter = await accountType(isPrivate)
                const isVerified = user.is_verified
                let accountVerifiedAfter = await verifiedAccount(isVerified)
                const profilePict = user.profile_pic_url_hd
                const username = user.username

                let replies = `🔰 ID: ${id}\n📱 Username: ${username}\n🔎 Full name: ${fullName}\n📍 Followers: ${followers}\n📍 Following: ${following}\n🔖 Category: ${category}\n🔐 Account Type: ${accountTypeAfter}\n✔️ Is Verified: ${accountVerifiedAfter}\nBio: ${bio}`
                await ctx.replyWithPhoto(profilePict, {
                    caption: replies
                })
                supportBtn(ctx)
            }
        }).catch(function (error) {
            console.error(error)
        });
    }
}

const story = () => {
    
}
story()

module.exports = getData
