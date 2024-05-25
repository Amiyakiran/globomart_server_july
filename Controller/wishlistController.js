const wishlists = require('../Model/wishlistModel')



exports.addToWishlistController = async(req,res)=>{
    const {id, title,price,description,category,image,rating} = req.body
    const userId = req.payload
    console.log(userId);
    try {
        const existingProduct = await wishlists.findOne({id,userId})
        if(existingProduct){
            res.status(406).json('Product already in your wishlist')
        }
        else{
            const newProduct = new wishlists({
                id, title,price,description,category,image,rating,userId  
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}


exports.getfromWishlistController = async(req,res)=>{
    const userId = req.payload

    try {
        const allproducts = await wishlists.find({userId})
        res.status(200).json(allproducts)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.removeWishListController = async(req,res)=>{
    const {id} = req.params
    console.log(id);
    try {
        const removeItem = await wishlists.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}