const collegeController=require("../models/collegeModel")

const createcollege=async function(req,res){
    let input=req.body
    let data=await collegeController.create(input)
    res.send({msg:true,data})

}
module.exports.createcollege=createcollege