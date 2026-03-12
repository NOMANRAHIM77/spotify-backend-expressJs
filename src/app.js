const cookieParser = require("cookie-parser")
const express = require('express')
const app = express()
const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')


app.use(cookieParser())
app.use(express.json())


app.use('/api/auth',authRoutes)
app.use('/api/music',musicRoutes)



module.exports = app