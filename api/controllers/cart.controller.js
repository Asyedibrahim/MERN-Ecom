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
            cart = new Cart({ userId, cartItems: [] });
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

        if (req.user.id !== req.params.userId) {
            return next(errorHandler(403, 'You are not allowed to see cart!'))
        }
        
        const cart = await Cart.findOne({ userId }).populate('cartItems.productId');

        if (!cart) {
            return res.status(200).json([]);
        }

        res.status(200).json(cart.cartItems)

    } catch (error) {
        next(error)
    }
};

export const deleteCartItem = async (req, res, next) => {
    try {

        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return next(errorHandler(404, 'Cart not found!'));
        }

        const itemIndex = cart.cartItems.findIndex(item => item._id.toString() === req.params.cartItemId);
        if (itemIndex === -1) {
            return next(errorHandler(404, 'Item not found in cart!'));
        }

        // syntax: splice(startIndex, deleteCount);  This is used in array to remove, replacing, adding element
        cart.cartItems.splice(itemIndex, 1);  

        await cart.save();
        res.status(200).json('Item Deleted from cart!');

    } catch (error) {
        next(error)
    }
};

export const updateQuantity = async (req, res, next) => {
    try {

        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return next(errorHandler(404, 'Cart not found!'));
        }

        const cartItem = cart.cartItems.find(item => item._id.toString() === req.params.cartItemId);
        if (!cartItem) {
            return next(errorHandler(404, 'Cart item not found!'));
        }

        cartItem.quantity = req.body.quantity;
        await cart.save();

        res.status(200).json('Quantity updated successfully');

      } catch (error) {
        next(error);
      }
}