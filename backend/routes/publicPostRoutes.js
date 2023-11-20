let express=require('express')
let publicPostsRouter=express.Router();
let publicPostsController=require('../controllers/publicPostsController')

publicPostsRouter.post("/",(req,res)=>{
    publicPostsController.saveNewPost(req,res)
})

publicPostsRouter.get("/",(req,res)=>{
    publicPostsController.getAllPosts(req,res)
})

publicPostsRouter.get("/:id",(req,res)=>{
    publicPostsController.getOnePost(req,res)
})

publicPostsRouter.patch("/:id",(req,res)=>{
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
