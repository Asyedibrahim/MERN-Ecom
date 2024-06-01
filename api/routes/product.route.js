import express from 'express';
import { createProduct } from '../controllers/product.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createProduct);

export default router;