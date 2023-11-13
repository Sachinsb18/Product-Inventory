import { ObjectId } from "bson";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    // id: ObjectId,
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});

const Product = mongoose.model('Product',productSchema);
export default Product;