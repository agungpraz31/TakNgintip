const axios = require('axios')

const getData = async (ctx, host) => {
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

        axios.request(options).then(function (response) {
            if(response.data.status == "ok") {
                const user = response.data.users[0].user
                const username = user.username
                const fullName = user.full_name
                isPrivate = user.is_private
                isVerified = user.is_verified
                profilePict = user.profile_pic_url
                ctx.reply(`Username: ${username}\nFull Name: ${fullName}\nIs Private: ${isPrivate}\nIs Verified: ${isVerified}\nProfile Pict: ${profilePict}`)
            }
            ctx.reply('Tidak dapat menemukan pengguna!')
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
            ctx.reply(`Username: ${username}\nFull Name: ${fullName}\nBio: ${bio}\nFollowers: ${follower}\nFollowing: ${following}\nCategory: ${category}\nIs Private: ${isPrivate}\nProfile Pict: ${profilePict}`)
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
        
        axios.request(options).then(function (response) {
            const user = response.data.data.user
            console.log(user);
            const bio = user.biography
            const follower = user.edge_followed_by
            const following = user.edge_follow
            const fullName = user.full_name
            const username = user.username
            const id = user.id
            const category = user.category_name
            const isPrivate = user.is_private
            const isVerified = user.is_verified
            const profilePict = user.profile_pic_url_hd

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
                await ctx.replyWithPhoto(Input.fromURL(profile_pict));
                ctx.reply(`Username: ${username}\nFull name: ${fullName}\nFollower: ${followerCount}\nFollowing: ${followingCount}\nMedia Count: ${mediaCount}\nBiografi: ${biography}`)
            }).catch(function (error) {
                console.error(error);
            });
    }
}

// const story = () => {
//     const axios = require("axios");

//         const options = {
//         method: 'GET',
//         url: 'https://instagram-data12.p.rapidapi.com/search/',
//         params: {query: "agungpraz31"},
//         headers: {
//             'X-RapidAPI-Key': '47cf8cbebdmshb010ee373830a5ep145af2jsnde10344aa49a',
//             'X-RapidAPI-Host': 'instagram-data12.p.rapidapi.com'
//         }
//         };

//         axios.request(options).then(function (response) {
//             const user = response.data.users[0].user
//             const username = user.username
//             const fullName = user.full_name
//             isPrivate = user.is_private
//             isVerified = user.is_verified
//             profilePict = user.profile_pic_url
//             ctx.reply(`Username: ${username}\nFull Name: ${full_name}\nIs Private: ${isPrivate}\nIs Verified: ${isVerified}\nProfile Pict: ${profilePict}`)
//         }).catch(function (error) {
//             console.error(error);
//         });
// }

// story()

module.exports = getData
