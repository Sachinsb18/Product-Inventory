// Schema creation for User
import mongoose from "mongoose";

// creating the schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

export const User = mongoose.model('User',userSchema);