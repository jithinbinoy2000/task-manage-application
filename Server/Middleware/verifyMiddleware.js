const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET
exports.verifyMiddleware = async(request,response,next)=>{
    
    try{
     const token = request.headers['authorization'].split(" ")[1];
       //console.log(token);
     
     if(token){
       let jwtResponse = jwt.verify(token,jwtSecret)
       request.payload = jwtResponse.userId
       //console.log(jwtResponse);
        next()
     }else{
        response.status(401).json('Empty Token')
     }
   }catch{
        response.status(403).json("please Login")
    }
}