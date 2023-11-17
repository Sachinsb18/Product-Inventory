import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connection from './config/mongoose.config.js';
import userRouter from './src/router/user.route.js';
import productRouter from './src/router/prroduct.route.js';
import jwtAuth from './src/middlewares/jwtmiddleware.js'

const app = express();
app.use(express.json());

app.use('/api/user',  userRouter)
app.use('/api/products',jwtAuth, productRouter)








const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
    connection();
})