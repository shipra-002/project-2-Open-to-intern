const mongoose=require("mongoose")
const validator = require('email-validator')

const collegeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:"name is required",
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:"fullname is required"

    },
    logolink:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    
},
{timestamps:true})



module.exports=mongoose.model('college',collegeSchema)

