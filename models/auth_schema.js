const mongoose = require('mongoose')
const authSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    role:{
        type:Number,
    },

})

const authDB = mongoose.model('auth',authSchema)
module.exports = authDB