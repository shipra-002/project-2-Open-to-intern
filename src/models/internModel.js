const mongoose=require('mongoose')

const ObjectId=mongoose.Schema.Types.ObjectId

const internModel=new mongoose.Schema({
    name:String,
    email: {
        type: String,

        unique: true,
        required: true,
        validate: {
            validator: function (email) {
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z.-]+$/.test(email)
            },
            message: "enter valid email address",

        }

    },
    mobile:{
        type:"Number",
        required:true,
        unique:true
    },
    collegeId:{
        type:ObjectId,
        ref:"college",

    },
    isDeleted:{
        type:Boolean,
        default:false,
    
    }
},
{timestamps:true})

module.exports=new mongoose.model("intern",internModel)