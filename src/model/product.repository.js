import mongoose from "mongoose";
import Product from'./product.model.js';



const createProduct = async(data)=>{
    let serialNumber = await Product.estimatedDocumentCount();
    

    const newProduct = {
        id:serialNumber+1,
        name:data.name,
        quantity:data.quantity
    }
    try {
        const product = new Product(newProduct);
        product.save();
        return await Product.find({id:newProduct.id}).select('-_id');
    }catch(err){
        console.log(err);
    }
}

const getAllProducts = async()=>{
    try {
        const products = await Product.find().select('-_id');
        return products;
    }catch(err){
        console.log(err);
    }
}

const removeProduct = async(id)=>{
    try {
        const product = await Product.findOneAndDelete({id:id});
        if(!product){
            return `Product not found`;
        }
        updateSerialNumber(id);        
        return product;
    }catch(err){
        console.log(err);
    }
}

const update = async(id,number)=>{
    try{
        const updatedProduct = await Product.findOneAndUpdate({id:id},
            {
                $inc:{quantity:number}
            },
            {
                new:true
            })
            .select('-_id');
            
        return updatedProduct;
    }catch(err){
        console.log(err);
    }
}

const updateSerialNumber = async function(deletedId){
    const updatedId = await Product.updateMany(
        {id:{$gt:deletedId}},
        {$inc:{id:-1}}
    );   
}



export {createProduct, getAllProducts , removeProduct , update};