const mongoose =require("mongoose")
const staff_schema=new mongoose.Schema({
    name:{
        type:String,
        require:true,


    },
    age:{
        type:Number,
        require:true
    },
    role:{
        type:String,
        require:true
    },

})
const staffDB=mongoose.model("staff",staff_schema)
module.exports=staffDB