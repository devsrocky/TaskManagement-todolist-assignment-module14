const mongoose = require('mongoose')

// CREATE USER DATA SCHEMA
const usersData = mongoose.Schema({

    email: {type: String, unique: true, require: true},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: Number},
    password: {type: String}

}, {versionKey: false})

// CONVERT SCHEMA INTO MODEL || create users model
const usersModel = mongoose.model('users', usersData)

// EXPORT USERS MODEL
module.exports = usersModel;