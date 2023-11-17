// user router to handle all the user related requests

import express from 'express';
import { createAdmin ,loginAdmin} from '../controller/user.controller.js';

// creat an express router
const userRouter = express.Router();

// API to create an admin 
userRouter.post('/signup', (req,res)=>{
    createAdmin(req,res)
});

// API to login as admin
userRouter.post('/login',(req,res)=>{
    loginAdmin(req,res)
});

export default userRouter;