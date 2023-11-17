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
        product.save();
        return await Product.find({id:newProduct.id}).select('-_id'); // to hide displaying unique id to the admin
    }catch(err){
        console.log(err);
    }
}

// function to get all the products in the inventory
const getAllProducts = async()=>{
    try {
        const products = await Product.find().select('-_id');
        return products;
    }catch(err){
        console.log(err);
    }
}

// function to delete an product based on the id
const removeProduct = async(id)=>{
    try {
        const product = await Product.findOneAndDelete({id:id});
        if(!product){
            return `Product not found`;
        }

        // function to re-order the products id in sequential form
        updateSerialNumber(id);   

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
            .select('-_id');
            
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