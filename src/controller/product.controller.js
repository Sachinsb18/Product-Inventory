import { createProduct , getAllProducts, removeProduct, update} from "../model/product.repository.js";



const addProduct = async (req,res)=>{
    const newProduct = {
        name:req.body.name,
        quantity:req.body.quantity
    }
    try{
        const product = await createProduct(newProduct);
        res.status(201).json(product);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const getProducts = async(req,res)=>{
    try{
        const products = await getAllProducts();
        res.status(201).json(products);
    }catch(err){
        res.status(500).json({message:"something went wrong"});
    }
}

const remove = async (req,res)=>{
    try{
        const product = await removeProduct(req.params.id);
        res.status(201).json({message:" product deleted"});
    }catch(err){
        res.status(500).json({message:"something went wrong"});
    }
}

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



export {addProduct, getProducts, remove, updateProduct};