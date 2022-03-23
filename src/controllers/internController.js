const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const res = require("express/lib/response");

const isValid = function (value) {
  if (typeof value == "undefined" || typeof value == "null") {
    return false;
  }
  if (typeof value == 0) {
    return false;
  }
  if (typeof value == "String" || ("Array" && value.length > 0)) {
    return true;
  }
};
const isValidRequestBody = function (value) {
  if (Object.keys(value).length > 0) return true;
};

const createIntern = async function (req, res) {
  try {
    let input = req.body;
    let email = input.email;
    let mobile= input.mobile;


    if (!Object.keys(input).length > 0)
      return res.status(400).send({ error: "Please enter some data" });

    if (!input.name)
      return res.status(400).send({ error: "please enter name" });

    if (!input.email)
      return res.status(400).send({ error: "please enter email" });

    if (!input.mobile)
      return res
        .status(400)
        .send({ error: "please enter valid mobile number" });
        

    if (!input.collegeId)
      return res.status(400).send({ error: "please enter College Id" });

    let college = req.body.collegeId;
    let collegeId = await collegeModel.findById(college);


    if (!collegeId)
      return res.status(400).send("please provide valid collegeId");

      let collegeAvailable= await collegeModel.findOne({_id:collegeId,isDeleted:false})
      if(!collegeAvailable){res.status(404).send({error:"college not found"})
    }
    

    const emailAlreadyUsed = await internModel.findOne({ email });

    if (emailAlreadyUsed)
      return res
        .status(400)
        .send({ status: false, msg: "email already registered" });

        const mobileAlreadyUsed = await internModel.findOne({ mobile });

        if (mobileAlreadyUsed)
          return res
            .status(400)
            .send({ status: false, msg: "mobile already registered" });
            const Email = input.email
    const validateEmail = function(Email){
        return /^[a-zA-Z0-9+_.-]+@[a-zA-Z.-]+$/.test(Email)
    }
    if(!validateEmail(Email)){
        return res.status(400).send({error:"Please enter valid email"})
    }

    const Mobile = input.mobile
    const validateMobile = function(Mobile){
        return /^([+]\d{2})?\d{10}$/.test(mobile)
    }
    if(!validateMobile(Mobile)){
        return res.status(400).send({error:"Please enter valid mobile"})
    }


    let data = await internModel.create(input);
    return res.status(201).send({ status: true, msg: data });
  } catch (error) {
   
    return res.status(500).send({status:false, error:error.message }); 
  }
};

const getCollege = async function (req, res) {
  try {
    let collegeName = req.query.collegeName;
    if (!collegeName) {
      return res.status(400).send("college name is required");
    }
    const collegeDetails = await collegeModel
      .find({ name: collegeName ,isDeleted:false});
      
      if(!(collegeDetails).length>0){
          return res.status(400).send("college is not present");
      }
    let interns = await internModel
      .find({ collegeId: collegeId })
      .select({ name: 1, email: 1, mobile: 1, _id: 1 });
      if(!interns){return res.status(400).send("inetrn not found")}
    let result = await collegeModel
      .find({ name: collegeName })
      .select({ name: 1, fullName: 1, logolink: 1, _id: 0 });

    const object = {
      name: result[0].name,
      fullName: result[0].fullName,
      logolink: result[0].logolink,
      intrests: interns,
    };
    return res.status(200).send({ status: true, data: object });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: error.message });
  }
};

module.exports.createIntern = createIntern;
module.exports.getCollege = getCollege;
