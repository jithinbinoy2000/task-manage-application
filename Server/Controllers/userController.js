const users = require('../Schemas/userSchema')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET
//Register new User
exports.registerUser = async (request, response) => {
    const { username, password } = request.body;
  
    try {
      const existingUser = await users.findOne({ username }); 
  
      if (!existingUser) { 
        let newUser = new users({ username, password });
        await newUser.save();
        response.status(200).send({ status: 200, message: 'New User Added Successfully' });
      } else { 
        response.status(400).send({ status: 400, message: 'Existing Username, Please log in' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send('Server error');
    }
  };

//logIn new User
exports.logInUser = async (request,response)=>{
    const {username,password} = request.body;
   try{ const existingUser = await users.findOne({username})
    if(existingUser){
        const validUser = await users.findOne({username,password})
        if(validUser){
            //success
            let userId = validUser._id
            const token = jwt.sign({userId},jwtSecret,{expiresIn:'6h'});
            request.session.token = token;
            response.status(200).json({status:200,message:'loggedIn',token:token,username:validUser.username})
        }
        else{
            //incorrect Password
            response.status(400).json({status:400,message:'Incorrect PassWord'})
        }
    }else{
        //No UserName Found
        response.status(400).json({status:400,message:'UserName Not Found Please SignUp'})
    }}catch(error){
        response.status(500).send(`error ${error}`,)
    }
}