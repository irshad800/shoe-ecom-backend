const mongoose = require('mongoose')
const wishSchema = new mongoose.Schema({
    userid: {
        type : mongoose.Types.ObjectId,
        required:true,
    },
    productid:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'product'
    },
  
    
})

const wishDB = mongoose.model('wish',wishSchema)
module.exports = wishDB