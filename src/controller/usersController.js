// IMPORT REQUIREMENTS
const usersModel = require('../model/usersModel')
const JWT = require('jsonwebtoken')

// REGISTRATION
exports.registration = async (req, res) => {

    try{
        let reqBody = req.body;
        const user = await usersModel.create(reqBody)
        res.status(201).json({status: 'User registration success', data: user})
    }catch(err){
        res.status(404).json({status: 'User registration Failed', data: err})
    }

}

// USER LOGIN
exports.login = async (req, res) => {
    

    try{
        let reqBody = req.body;
        const user = await usersModel.find(reqBody)

        if(user.length>0){
            let payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: reqBody['email']
            }
            const token = JWT.sign(payload, "secretKey1236")
            res.status(200).json({status: 'Login success', token: token})

        }else{
            res.status(401).json({status: 'User not found'})
        }
    
        
    }catch(err){
        res.status(401).json({status: 'Login failed',data:err})
    }

}

// PROFILE READ
exports.readProfile = async (req, res) => {

    try{

        let email = req.headers['email']
        const result = await usersModel.find({email:email})
        res.status(200).json({status: 'Authorized', data: result})
        
    }catch(err){
        res.status(401).json({status: 'Unauthorized'})
    }
}

// USERS PROFILE UPDATE
exports.updateProfile = async (req, res) => {

    try{
        let email = req.headers['email']
        let reqBody = req.body;
        await usersModel.updateOne({email:email}, reqBody)
        res.json({status: 'Profile update Success'})

    }catch(err){
        res.status(401).json({status: 'Profile update failed', data: err})
    }

}