import express from 'express';
import { createAdmin ,loginAdmin} from '../controller/user.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', (req,res)=>{
    createAdmin(req,res)
});

userRouter.post('/login',(req,res)=>{
    loginAdmin(req,res)
});

export default userRouter;