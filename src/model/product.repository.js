import mongoose from "mongoose";
import Product from'./product.model.js';

const createProduct = (product)=>{
    try {
        const newProduct = new Product(product);
        return newProduct.save();
    }catch(err){
        console.log(err);
    }
}

const getAllProducts = async()=>{
    try {
        const products = await Product.find();
        return products;
    }catch(err){
        console.log(err);
    }
}

const removeProduct = async(id)=>{
    try {
        const product = await Product.findByIdAndDelete(id);
        return product;
    }catch(err){
        console.log(err);
    }
}

const update = async(id,number)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate({_id:id},
            {
                $inc:{quantity:number}
            });
        return updatedProduct;
    }catch(err){
        console.log(err);
    }
}



export {createProduct, getAllProducts , removeProduct , update};