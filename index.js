// Import all the necessary modules
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connection from './config/mongoose.config.js';
import userRouter from './src/router/user.route.js';
import productRouter from './src/router/prroduct.route.js';
//  JWT authentication for admin
import jwtAuth from './src/middlewares/jwtmiddleware.js'

const app = express();
// use express json parser
app.use(express.json());

app.get("/",(req,res)=>{
    res.write("Please copy the url and check the api using postman");
})

//  Route to user for signup or login
app.use('/api/user',  userRouter)

//  Route for admin to manipulate products along with jwt middleware
app.use('/api/products',jwtAuth, productRouter)


//  Creating and listenting for the server
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
    connection();
})