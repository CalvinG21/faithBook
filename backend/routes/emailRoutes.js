let express=require('express');
let emailRouter=express.Router();
let emailController=require('../controllers/emailController')
let middleware=require('./middleware')


emailRouter.post("/",middleware.checkJWTToken,(req,res)=>{
    console.log("email/")
    emailController.sendEmail(req,res)
})

module.exports=emailRouter;