import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

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

export default connection;
