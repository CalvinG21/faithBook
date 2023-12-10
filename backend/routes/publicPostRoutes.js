let express=require('express')
let publicPostsRouter=express.Router();
let publicPostsController=require('../controllers/publicPostsController')
let middleware=require('./middleware')

publicPostsRouter.post("/",middleware.checkJWTToken,(req,res)=>{
    publicPostsController.saveNewPost(req,res)
})

publicPostsRouter.get("/",middleware.checkJWTToken,(req,res)=>{
    publicPostsController.getAllPosts(req,res)
})

publicPostsRouter.get("/:id",middleware.checkJWTToken,(req,res)=>{
    publicPostsController.getOnePost(req,res)
})

publicPostsRouter.patch("/:id",middleware.checkJWTToken,(req,res)=>{
    publicPostsController.updatePost(req,res)
})

publicPostsRouter.patch("/suspend/:id",(req,res)=>{
    publicPostsController.updatePost(req,res)
})

///public/suspend/

publicPostsRouter.delete("/:id",(req,res)=>{
    publicPostsController.deleteOnePost(req,res)
})

module.exports=publicPostsRouter;
