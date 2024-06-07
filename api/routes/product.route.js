import express from 'express';
import { createProduct, getAllProducts, deleteProduct, editProduct, getProduct, getProductsByCategory, displayProducts } from '../controllers/product.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createProduct);
router.get('/getProducts', getAllProducts);
router.delete('/deleteProduct/:userId/:productId', verifyToken, deleteProduct);
router.put('/editProduct/:userId/:productId', verifyToken, editProduct )
router.get('/:productId', getProduct);
router.get('/productByCategory/:categoryId', getProductsByCategory);
// router.get('/search', displayProducts)

export default router;
