// controller for the product to handle the request 

// import proiduct repository
import { createProduct , getAllProducts, removeProduct, update} from "../model/product.repository.js";


// controller  function for creating new product
const addProduct = async (req,res)=>{
   
    try{
        const product = await createProduct(req.body);
        res.status(201).json(product);
        
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

// controller function to fetch all the products
const getProducts = async(req,res)=>{
    try{
        const products = await getAllProducts();
        res.status(201).json(products);
    }catch(err){
        res.status(500).json({message:"something went wrong"});
    }
}


// controller function to delete an product
const remove = async (req,res)=>{
    try{
        const product = await removeProduct(req.params.id);
        res.status(201).json({message:" product deleted"});
    }catch(err){
        res.status(500).json({message:"something went wrong"});
    }
}


// controller function to update product quantity
const updateProduct = async (req,res) =>{
    const id = req.params.id;
    const {number} = req.query;

    try{
        const updatedProduct = await update(id,number);
        res.status(201).json(updatedProduct);
    }catch(err){
        res.status(500).json({message:"something went wrong"});
    }
}


// export the controller functions

export {addProduct, getProducts, remove, updateProduct};