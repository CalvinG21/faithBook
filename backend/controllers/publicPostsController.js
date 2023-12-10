let PublicPosts=require('../models/publicPostsModels');
 
//create new post
exports.saveNewPost=async(req,res)=>{
    console.log("publicPostsController : saveNewUser()")
    try {
        console.log("attempting to saving new user")
        console.log('req.body : '+JSON.stringify(req.body))
        let newPost=new PublicPosts({type:req.body.type,title:req.body.title,
            text:req.body.text,authorId:req.body.authorId,anonymous:req.body.anonymous});
        await newPost.save();//save new post to db
        res.status(200).send({"success":"Saved a new public post"})
    } catch (error) {
        console.log(error)
        res.status(400).send({"error":error})   
    }
}

//get all posts
exports.getAllPosts=async(req,res)=>{
    console.log("publicPostsController : getAllPosts()")
    try {
        const lastWeekTimestamp = new Date();
        lastWeekTimestamp.setDate(lastWeekTimestamp.getDate() - 365); // Subtract x days

        // Find documents where updatedAt is greater than last week
        let allPosts=await PublicPosts.find({ updatedAt: { $gt: lastWeekTimestamp } })
        .limit(50) // Limit the result to 50 documents
        .exec();  
        
        console.log(allPosts)
        allPosts==null || allPosts=={} ?
        res.status(400).json({ error: 'no posts found :(' })
        :
        res.status(200).send({"posts":allPosts})
        
    } 
    catch (error) {
        console.log(error)
        res.status(400).send({"error":error})   
    }
}

//update apost
exports.updatePost=async(req,res)=>{
    console.log("publicPostsController : updatePost()")
    try {     
        // Find documents where updatedAt is greater than last week
        let post=await PublicPosts.findByIdAndUpdate(req.params.id,req.body,{ new: true })
        console.log(post)
        post==null || post=={} ?
        res.status(400).json({ error: 'no posts found :(' })
        :
        res.status(200).send({"post":post})
        
    } 
    catch (error) {
        console.log(error)
        res.status(400).send({"error":error})   
    }
}

//get a specific post
exports.getOnePost=async(req,res)=>{
    console.log("publicPostsController : getOnePost()")
    try {      
        // Find documents where updatedAt is greater than last week
        let posts=await PublicPosts.findById(req.params.id)
        
        
        console.log(posts)
        posts==null || posts=={} ?
        res.status(400).json({ error: 'no posts found :(' })
        :
        res.status(200).send({"post":posts})
        
    } 
    catch (error) {
        console.log(error)
        res.status(400).send({"error":error})   
    }
   
}

//delete a specific post
exports.deleteOnePost=async(req,res)=>{
    console.log("publicPostsController : deleteOnePost()")
    try {       
        // Find documents where updatedAt is greater than last week
        let post=await PublicPosts.findByIdAndDelete(req.params.id)
        
        console.log(post)
        post==null || post=={} ?
        res.status(400).json({ error: 'no posts found :(' })
        :
        res.status(200).send({"post":post})
        
    } 
    catch (error) {
        console.log(error)
        res.status(400).send({"error":error})   
    }
   
}



