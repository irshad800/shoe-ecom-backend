const mongoose =require("mongoose")
const product_schema=new mongoose.Schema({
    name:{
        type:String,
        require:true,


    },
    price:{
        type:Number,
        require:true
    },
    item:{
        type:String,
        require:true
    },
    image:{
        type: String,
        required: true,
    },
<<<<<<< HEAD
    size:{
        type: String,
        required: true,
    },
=======
 
>>>>>>> 0781ad9 (second last)

})
const productDB=mongoose.model("product",product_schema)
module.exports=productDB