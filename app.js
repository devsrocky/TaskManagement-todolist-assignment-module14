const express = require('express')
const router = require('./src/router/api')
const app = express()
// const bodyParser = require('body-parser')

// EXPORT ALL PACKAGES
const cors = require('cors')
const helmet = require('helmet')
const hpp = require('hpp')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')

// SECURITY MIDDLEWARE IMPLEMENTATION
app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({extended: true}))



// APPLICATION BROWSING LIMIT DEFINE
const limit = rateLimit({windowMs: 15 * 60 * 1000, max: 100})
app.use(limit)

// DATABASE CONNECTION || mongoose
mongoose.connect("mongodb+srv://prodhanr:prodhanr72@cluster0.cy3xqek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then((res) => {
    console.log('MongoDB Connected')
}).catch((err) => {
    console.log('MongoDB did\'t Connected')
})



// ROUTER IMPLEMENTATION
app.use('/api', router)


// 404 NOT FOUND PAGE IMPLEMATION
app.get('*', (req, res) => {
    res.status(404).json({status: 'Page not found', data: 'Bad requiest'})
})


// EXPORT APP
module.exports = app;