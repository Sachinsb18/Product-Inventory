// import user model
import { User } from "./user.model.js";

// function to create an new admin in db
const signUp = async(user)=>{
    try{
        const newUser = new User(user);
        await newUser.save();
        return newUser;
    }catch(err){
        console.log(err);
    }
}

// function to check the user / admin exixst in db
const signIn = async (email,password)=>{
    try{
        return await User.findOne({email, password});
     }
     catch(err){
         console.log(err);
         throw new Error ("Couldn't find the user");
     }
}

// function to find an user by email
const findByEmail = async (email) =>{
    try{
        return await User.findOne({email});
    }catch(err){
        console.log(err);
        throw new Error ("Couldn't find the email");
    }
}


export {signUp,signIn,findByEmail};