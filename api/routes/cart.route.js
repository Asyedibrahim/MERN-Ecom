import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addToCart, getCartItems } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/addToCart', verifyToken, addToCart);
router.get('/:userId', verifyToken, getCartItems);


export default router;