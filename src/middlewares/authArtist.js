const jwt = require('jsonwebtoken')

const verifyArtist = async (req,res,next) => {

    const token  = req.cookies.token

    if(!token){
        return res.status(403).json({
            message : "token unavilable , unauthorized "
        })
    }

    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        const role = decoded.role
        if(role!=="artist"){
            return res.status(403).json({
            message : "token invalid , only artist can access"
        })
        }
        next()
    }
    catch(err){
           res.status(404).json({
            message : `error ocured in authArtist middleware : ${err}`
           })
    }




}

module.exports = {verifyArtist}