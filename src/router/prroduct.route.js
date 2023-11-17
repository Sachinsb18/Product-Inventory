// product routes to handle all the product related requests

import express from 'express';
import { addProduct, getProducts ,remove,updateProduct } from '../controller/product.controller.js';

// create an express route
const productRouter = express.Router();

// API to add products to the database
productRouter.post('/create',(req,res)=>{
    addProduct(req,res);
});

// API to list products
productRouter.get('/',(req,res)=>{
    getProducts(req,res);
});

// API to delete products
productRouter.delete('/:id',(req,res)=>{
    remove(req,res);
});

// API to update quantity of a product (can be incremented or decremented)
productRouter.post('/:id/update_quantity',(req,res)=>{
    updateProduct(req,res);
});

export default productRouter;