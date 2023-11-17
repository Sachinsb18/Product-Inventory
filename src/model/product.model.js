// Schema creation for product

import mongoose from "mongoose";

// creating schema
const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },       
    
});

// create the moodel for products
const Product = mongoose.model('Product',productSchema);
export default Product;