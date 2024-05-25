const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

const users = mongoose.model("users",userScheme)

module.exports = users