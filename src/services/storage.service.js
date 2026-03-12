const {ImageKit} = require('@imagekit/nodejs')

const ImageKitClient = new ImageKit({
    privateKey:process.env.IMAGEKIT_SECRET
})


async function uploadFile(file) {
const result = await ImageKitClient.files.upload ( {
    file,
    fileName: "music_" + Date.now(),
    folder:"yt-complete-backend/music"
})
return result
}

module.exports = {uploadFile}