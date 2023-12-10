let middleware=require('./middleware')
let express=require('express');

let userController=require('../controllers/userController')

let secretKey="jwt-secret";
let userRouter=express.Router();

//sign up route
userRouter.post('/signUp',(req,res)=>{
    console.log("route: "+"/signUp")
    userController.saveNewUser(req,res);
})

//login route
userRouter.post("/login",(req,res)=>{ 
    console.log("route: "+"/login")
    userController.login(req,res);
})

module.exports=userRouter;