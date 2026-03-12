const jwt = require('jsonwebtoken')
const musicModel = require('../model/music.model')
const albumModel = require('../model/album.model')
const {uploadFile} = require('../services/storage.service')

const createMusic = async (req,res)=>{
   
    try{

    const {title} = req.body
    const file = req.file

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri : result.url,
        title,
        artist : decoded.id
    })

res.status(200).json({
    message : "music created successfully",
    music,
})
}catch(err){
    console.log("error in create music",err)
             return res.status(404).json({
                message:"error in craete music"
             })
    }
}

const createAlbum = async (req,res)=>{

try{
    const {title,musicIds} = req.body

    const album = await albumModel.create({
        title,
        artist : decoded.id,
        musics : musicIds
    })

    res.status(201).json({
        message:"album created success fully",
        album
    })

}catch(err){
    res.status(403).json({
        message:"error in create album",
       
    })
}

}


module.exports = {createMusic,createAlbum}