const JWT = require('jsonwebtoken')

// AUTHENTIC USER VERIFY MIDDLEWARE
module.exports = (req, res, next) => {
    
    let token = req.headers['token']
    JWT.verify(token, "secretKey1236", (err, decoded) => {
        if(err){
            res.status(401).json({status: 'Token verifying failed'})
        }else{
            let email = decoded['data']
            req.headers['email'] = email
            next()
        }
    })
}