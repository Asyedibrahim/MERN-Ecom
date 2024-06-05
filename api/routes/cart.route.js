import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addToCart, getCartItems, deleteCartItem, updateQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/addToCart', verifyToken, addToCart);
router.get('/:userId', verifyToken, getCartItems);
router.delete('/:cartItemId', verifyToken, deleteCartItem);
router.put('/:cartItemId', verifyToken, updateQuantity);


export default router;