let express=require('express')
let publicPostsRouter=express.Router();
let publicPostsController=require('../controllers/publicPostsController')
let middleware=require('./middleware')

//create new post
publicPostsRouter.post("/",middleware.checkJWTToken,(req,res)=>{
    publicPostsController.saveNewPost(req,res)
})

//get all posts
publicPostsRouter.get("/",middleware.checkJWTToken,(req,res)=>{
    publicPostsController.getAllPosts(req,res)
})

//get spefic post
publicPostsRouter.get("/:id",middleware.checkJWTToken,(req,res)=>{
    publicPostsController.getOnePost(req,res)
})

//update post
publicPostsRouter.patch("/:id",middleware.checkJWTToken,(req,res)=>{
    publicPostsController.updatePost(req,res)
})

// admin func: suspend a post
publicPostsRouter.patch("/suspend/:id",(req,res)=>{
    publicPostsController.updatePost(req,res)
})

//delete a post
publicPostsRouter.delete("/:id",(req,res)=>{
    publicPostsController.deleteOnePost(req,res)
})

module.exports=publicPostsRouter;
