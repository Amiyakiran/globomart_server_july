const express = require('express')
const productsController = require('../Controller/productsController')

const usersController = require('../Controller/usersController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const wishlistController = require('../Controller/wishlistController')

const cartController = require('../Controller/cartController')


const router = new express.Router()

//get all products

router.get('/all-products',productsController.getAllProductsController)

//register
router.post('/register',usersController.registerController)

//login
router.post('/login',usersController.loginController)

//get a product
router.get('/get-product/:id',productsController.getAProductController)

//add to wishlist
router.post('/add-wishlist',jwtMiddleware,wishlistController.addToWishlistController)
//get fromwishlist
router.get('/wishlist/allproduct',jwtMiddleware,wishlistController.getfromWishlistController)
//remove from wishlist

router.delete('/wishlist/removeItem/:id',jwtMiddleware, wishlistController.removeWishListController)

//add to cart
router.post('/add-cart',jwtMiddleware,cartController.addToCartController)

//getcart item
router.get('/cart/all-product',jwtMiddleware,cartController.getitemfromCartController)

//remove item from cart
router.delete('/cart/remove-item/:id',jwtMiddleware,cartController.removeItemController)

//increment cart
router.get('/cart/increment/:id',jwtMiddleware,cartController.increamentItem)

//decrement cart
router.get('/cart/decrement/:id',jwtMiddleware,cartController.decrementItem)


//empty cart
router.delete('/empty-cart',jwtMiddleware,cartController.emptyCartController)
module.exports = router