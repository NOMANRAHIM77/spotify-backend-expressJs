const express = require('express')
const router = express.Router()
const {createMusic,createAlbum} = require('../controllers/music.controller')
const {verifyArtist} = require('../middlewares/authArtist')
const multer = require('multer')

const upload = multer({
    storage:multer.memoryStorage()
})

router.post('/upload',verifyArtist,upload.single("music"),createMusic)
router.post('/album',verifyArtist,createAlbum)

module.exports = router