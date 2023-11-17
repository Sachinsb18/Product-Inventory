// controller to handle all the user signup and signin request
import dotenv from 'dotenv';
dotenv.config();
// import user repository
import { findByEmail, signUp } from "../model/user.repository.js";

// import bcrypt to hash the user password 
import bcrypt from 'bcrypt';

// import jwt to create a token
import jwt from 'jsonwebtoken'

// controller function to create an admin
const createAdmin = async (req, res) => {
    const {userName,email,password} = req.body;
    // hash the user password for security purpose
    const hashedPassword = await bcrypt.hash(password,12);
    const user = {
        userName: userName,
        email: email,
        password: hashedPassword
    };
    try{
        const newUser = await signUp(user);
        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

// controller function for admin to login
const loginAdmin = async (req,res)=>{
    try{
        const user = await findByEmail(req.body.email);
        if(!user){
            return res.status(400).send('Incorrect Credentials');
          }else{
            //  Compare password with hashed password.
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result){
       //  Create token.
       const token = jwt.sign(
        {
          userID: user._id,
          email: user.email,
        },
        process.env.SECRET,   // secret key
        {
          expiresIn: '2h',
        }
      );
      //  Send token.
      return res.status(200).send(token);
            }else{
              return res
              .status(400)
              .send('Incorrect Credentials');
            }
    }
          }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
}
    

// export the controller functions
export { createAdmin, loginAdmin};