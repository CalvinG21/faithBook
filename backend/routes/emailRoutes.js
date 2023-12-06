let express=require('express');
let emailRouter=express.Router();
let emailController=require('../controllers/emailController')


emailRouter.post("/",(req,res)=>{
    console.log("email/")
    emailController.sendEmail(req,res)
})

module.exports=emailRouter;