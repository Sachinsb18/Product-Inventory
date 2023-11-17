// import .env to get url for db connection
import dotenv from 'dotenv';
dotenv.config();
// import mongoose
import mongoose from 'mongoose';

// function to create a connection with db
const connection = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('connected to mongodb');
    }catch(err){
        console.log(err);
    }
};

// export the function
export default connection;
