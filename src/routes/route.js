const express = require('express');
const router = express.Router();

const collegeController=require('../controllers/collegeController')
const internController= require('../controllers/internController')



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createCollege",collegeController.createCollege)
router.post("/createIntern",internController.createIntern)
router.get('/getCollege',internController.getCollege)

module.exports = router;


















