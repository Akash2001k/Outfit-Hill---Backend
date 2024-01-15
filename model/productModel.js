const mongoose = require('mongoose');

const prdouctSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    disc:{
        type:String,
        required:true
    },
    maxPrice:{
        type:Number,
        required:true
    },
    for:{
        type:String,
        enum:["men","women","kids","Home and Living"],
        require:true
    },
    size:{
        type:String,
        required:true
    },
    discountPer:{
        type:Number,
        required:true
    },
    image:{
        type:String,
    }
})

module.exports = mongoose.model("products",prdouctSchema)