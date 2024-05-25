const carts = require('../Model/cartModel')


exports.addToCartController = async(req,res)=>{
    const userId = req.payload
    const {id, title,price,description,category,image,rating,quantity} = req.body
    console.log(id, title,price,description,category,image,rating,quantity);

    try {
        const existingProduct = await carts.findOne({id,userId})

        if(existingProduct){
            existingProduct.quantity+=1
            existingProduct.grandTotal = existingProduct.quantity*existingProduct.price
            await existingProduct.save()
            res.status(200).json('item incremented')
        }
        else{
            const newProduct = new carts({
                id, title,price,description,category,image,rating,quantity,grandTotal:price,userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}

exports.getitemfromCartController = async(req,res)=>{
    const userId = req.payload
    try {
        const allProductUser = await carts.find({userId})
        res.status(200).json(allProductUser)
    } catch (error) {
       res.status(401).json(error) 
    }
}


exports.removeItemController= async(req,res)=>{
    const {id} = req.params
    console.log(id);
    try {
        await carts.deleteOne({_id:id})
        res.status(200).json('removed the item')
    } catch (error) {
        res.status(401).json(error)
    }
}

//function to increment
exports.increamentItem = async(req,res)=>{
    const {id} = req.params

    try {
        const selectedItem = await carts.findOne({_id:id})
        if(selectedItem){
            selectedItem.quantity+=1
            selectedItem.grandTotal=selectedItem.price*selectedItem.quantity
            await selectedItem.save()
            res.status(200).json(selectedItem)
        }else{
            res.status(406).json("no such product")
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}


//decrement 
exports.decrementItem=async(req,res)=>{
    const {id}= req.params
    try {
        const selectedItem = await carts.findOne({_id:id})

        if(selectedItem){
            selectedItem.quantity-=1
            if(selectedItem.quantity==0){
                await carts.deleteOne({_id:id})
                res.status(200).json("item removed from cart")
            }
            else{
                selectedItem.grandTotal = selectedItem.quantity*selectedItem.price
                await selectedItem.save()
                res.status(200).json(selectedItem)
            }
        }
        else{
            res.status(406).json("no item found")
        }
        
    } catch (error) {
        console.log(error);
         res.status(401).json(error)
    }
}

//empty cart
exports.emptyCartController = async(req,res)=>{
    const userId = req.payload
    try {
        await carts.deleteMany({userId})
        res.status(200).json('cart deleted successfully')
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}