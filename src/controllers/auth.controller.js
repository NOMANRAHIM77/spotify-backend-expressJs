const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const registerUser = async (req,res)=>{
    const{userName,password,email,role='user'} = req.body

const isUserAlreadyExists = await userModel.findOne({
    $or:[
        {userName},
        {email}
    ]
})


if (isUserAlreadyExists){
    return res.status(409).json({
        message:"user already exists"
    })
}
const hash = await bcrypt.hash(password,10)

const user = await userModel.create({
    userName,
    email,
    password : hash,
    role
})

const token = jwt.sign({
    id:user._id,
    role:user.role
},process.env.JWT_SECRET)

res.cookie("token",token)

res.status(200).json({
    user,
    message:"user created successfully"
})


}

const loginUser = async (req,res)=>{
    const {userName,email,password,role}= req.body

    const user = await userModel.findOne({
        $or:[
            {userName},
            {email}
        ]
    })

    if(!user){
        res.status(401).json({
            message:"invalid credentials...."
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        res.status(401).json({
            message:"invalid credentials...."
        })
    }

    const token = await jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"user loggedIn successfully",
        user
    })


}

module.exports = {registerUser,loginUser}