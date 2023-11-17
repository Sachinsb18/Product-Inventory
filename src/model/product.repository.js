// product repository to handle the request in db
// import product model
import Product from'./product.model.js';

// function to create a nnew product
const createProduct = async(data)=>{
    // to have the id in sequential format rather than mongodb default unique id
    let serialNumber = await Product.estimatedDocumentCount();  // returns number of document in an collection
    const newProduct = {
        id:serialNumber+1,
        name:data.name,
        quantity:data.quantity
    }
    try {
        const product = new Product(newProduct);
         await product.save();
    
        const createdProduct = await Product.findOne({id:product.id}).select({_id:0, __v:0}); // to hide displaying unique id to the admin
        
        return createdProduct;
    }catch(err){
        console.log(err);
    }
}

// function to get all the products in the inventory
const getAllProducts = async()=>{
    try {
        const products = await Product.find().select({_id:0, __v:0});
        return products;
    }catch(err){
        console.log(err);
    }
}

// function to delete an product based on the id
const removeProduct = async(id)=>{
    try {
        const product = await Product.deleteOne({id:id});
        
        // function to re-order the products id in sequential form
        updateSerialNumber(id);   
        // console.log(product);
        return product;
    }catch(err){
        console.log(err);
    }
}

// function to update product quantity [increment / decrement]
const update = async(id,number)=>{
    try{
        const updatedProduct = await Product.findOneAndUpdate({id:id},
            {
                $inc:{quantity:number}
            },
            {
                new:true
            })
            .select({_id:0, __v:0});
            
        return updatedProduct;
    }catch(err){
        console.log(err);
    }
}

// function to re-order the products id in sequential form
const updateSerialNumber = async function(deletedId){
    await Product.updateMany(
        {id:{$gt:deletedId}},
        {$inc:{id:-1}}
    );   
}


// exportinf the reository functions 
export {createProduct, getAllProducts , removeProduct , update};