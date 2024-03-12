const todoModel = require('../model/to-doModel')

// CREATE TODO LIST
exports.create = async (req, res) => {

    try{
        let email = req.headers['email']
        let reqBody = req.body;
        reqBody.email = email
        
        await todoModel.create(reqBody)
        res.status(201).json({status: 'Todo list create success'})
        
    }catch(err){
        res.status(401).json({status: 'Failed to create todo', data:err})
    }
}

// READ TODO LIST
exports.readTodo = async (req, res) => {
    try{

        let email = req.headers['email']
        const data = await todoModel.find({email:email})
        res.status(200).json({status: 'Your todo lists', data:data}) 

    }catch(err){
        res.status(400).json({status: 'Todo list not found'})
    }
}


// TODO LIST UPDATE
exports.updateTodo = async (req, res) => {
    try{


        let email = req.headers['email']
        let {id} = req.params;
        let reqBody = req.body;

        await todoModel.updateOne({_id: id, email:email}, reqBody)
        res.status(200).json({status: 'Todo update success', data: reqBody})

    }catch(err){
        res.status(401).json({status: 'Todo update failed'})
    }
}

// todo list delete
exports.deleteTodo = async (req, res) => {
    try{

        let email = req.headers['email']
        let {id} = req.params
        await todoModel.deleteOne({_id: id, email: email})
        res.status(200).json({status: 'Todo list deleted successfully'})

    }catch(err){
        res.status(401).json({status: 'Failed to delete todo list'})
    }
}

// TODO COMPLETE
exports.statusMark = async (req, res) => {
    try{

        let email = req.headers['email']
        let {id} = req.params;
        let reqBody = req.body;
        
        await todoModel.updateOne({_id: id, email:email}, reqBody)
        res.status(200).json({status: `Status mark as a ${reqBody['statu']}`})

    }catch(err){
        res.status(200).json({status: 'Failed to set mark'})
    }
}