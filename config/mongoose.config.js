import mongoose from 'mongoose';

const connection = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce-api',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('connected to mongodb');
    }catch(err){
        console.log(err);
    }
};

export default connection;
