const mongoose = require('mongoose')

// TO-DO LIST SCHEMA
const todoSchema = mongoose.Schema({

    email: {type: String},
    title: {type: String},
    descr: {type: String},
    statu: {type: String}

}, {timestamps: true, versionKey: false})

// CONVERT SCHEMA INTO MODEL || create model
const todoModel = mongoose.model('todos', todoSchema)

// EXPORT TODO MODEL
module.exports = todoModel;