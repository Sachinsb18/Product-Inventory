import express from 'express';
import { addProduct, getProducts ,remove,updateProduct } from '../controller/product.controller.js';

const productRouter = express.Router();

productRouter.post('/create',(req,res)=>{
    addProduct(req,res);
});

productRouter.get('/',(req,res)=>{
    getProducts(req,res);
});

productRouter.delete('/:id',(req,res)=>{
    remove(req,res);
});

productRouter.post('/:id/update_quantity',(req,res)=>{
    updateProduct(req,res);
});



export default productRouter;