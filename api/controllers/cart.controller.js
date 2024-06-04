import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import { errorHandler } from '../utils/error.js';

export const addToCart = async (req, res, next) => {
    const { userId, productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            next(errorHandler(404, 'Product not found!'))
        }

        // Check user already has this product in the cart
        let cart = await Cart.findOne({userId});
        if (!cart) {
            cart = new Cart({ userId, cartItems: [] })
        }

        const itemIndex = cart.cartItems.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.cartItems[itemIndex].quantity += quantity;
        } else {
            // Product does not exist in cart, add new item
            cart.cartItems.push({ productId, quantity });
        }
        
        await cart.save();
        res.status(200).json(cart);

    } catch (error) {
        next(error)
    }
};

export const getCartItems = async (req, res, next) => {
    try {
        const {userId} = req.params;
        
        const cart = await Cart.findOne({ userId }).populate('cartItems.productId');

        if (!cart) {
            next(errorHandler(404, 'Items not found'))
        }

        res.status(200).json(cart)

    } catch (error) {
        next(error)
    }
};