import { findByEmail, signUp } from "../model/user.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const createAdmin = async (req, res) => {
    const {userName,email,password} = req.body;
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

const loginAdmin = async (req,res)=>{
    try{
        const user = await findByEmail(req.body.email);
        if(!user){
            return res.status(400).send('Incorrect Credentials');
          }else{
            // 2. Compare password with hashed password.
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result){
       // 3. Create token.
       const token = jwt.sign(
        {
          userID: user._id,
          email: user.email,
        },
        'XqXQNla2jBCH9kuLz',
        {
          expiresIn: '2h',
        }
      );
      // 4. Send token.
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
    


export { createAdmin, loginAdmin};