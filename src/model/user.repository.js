import { User } from "./user.model.js";

const signUp = async(user)=>{
    try{
        const newUser = new User(user);
        await newUser.save();
        return newUser;
    }catch(err){
        console.log(err);
    }
}

const signIn = async (email,password)=>{
    try{
        return await User.findOne({email, password});
     }
     catch(err){
         console.log(err);
         throw new Error ("Couldn't find the user");
     }
}

const findByEmail = async (email) =>{
    try{
        return await User.findOne({email});
    }catch(err){
        console.log(err);
        throw new Error ("Couldn't find the email");
    }
}





export {signUp,signIn,findByEmail};