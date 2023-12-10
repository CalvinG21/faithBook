let jwt = require("jsonwebtoken");
let secretKey="jwt-secret";

//middleware func to confirm if jwt token is paaed in request and if token is vaild
let checkJWTToken=(req, res, next)=> {
    if (req.headers.authorization) {
        const token = req.headers['authorization'].split(' ')[1]
        console.log("Rx jwt token : "+token)
        jwt.verify(token, secretKey, function (error, data) {
        if (error) {
            console.log("Middleware Issue : Invalid Token")
            res.send({ message: "Invalid Token" });
            //next();
            
        }
        else {
            req.username = data.username;
            req.password = data.password;
            console.log("Middleware Sucess")
            next();
        }
        });
    } 
    else {
        console.log("Middleware Issue : No token attached to the request")
        res.send({ message: "No token attached to the request" });
    }
}
module.exports = {
checkJWTToken,
};