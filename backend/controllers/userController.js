let Users=require('../models/userModels');
let secretKey="jwt-secret";
let jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

//login
exports.login=async (req,res)=>{
    let user= await Users.findOne({username:req.body.username})
    console.log(user)
    user==null || user=={} ?
    res.status(400).json({ error: 'username not found :(' })
    :
    bcrypt.compare(req.body.password, user.password, function(err, result) {
        console.log(err)
        console.log(result)
        result==true?
        (()=>{
             payload = {
                'name': req.body.username,
                'email':user.email,
                'role':user.role,
                '_id':user._id
            }

            const token = jwt.sign(JSON.stringify(payload), secretKey,
            {algorithm: 'HS256'})
            console.log("jwt token : "+token)
            
            res.status(200).json({pass:"Username and Password are correct",'token': token})
        })()
        :
        (()=>{
            res.status(403).json({error:"Password is not correct"})
        })()

        err==true?
        (()=>{
             res.status(403).json({error:"Password is not correct"})
        })()
        :
        console.log("No Issue : bcrypt.compare(passwordInPlainText,HashedPassword)")
    });
}

//sign up
exports.saveNewUser=async(req,res)=>{
    console.log("userController : saveNewUser()")
    //let{username,password,email}=req.body;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        console.log(err)
        console.log(hash)
        // Store hash in your password DB.
        hash?
        (async()=>{
            try {
                console.log("attempting to saving new user")
                let newUser=new Users({username:req.body.username,password:hash,email:req.body.email});
                await newUser.save();
                await exports.login(req,res)
            } catch (error) {
                console.log(error)
                res.status(400).send({"error1":error})
            }
            
        })():
        err?
        (()=>{
            res.status(400).send({"error2":err})
        })():
        (()=>{
            console.log("error3")
        })()

    });
}