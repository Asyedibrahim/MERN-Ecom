import express from 'express';
import { createCategory, getCategory } from '../controllers/category.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createCategory', verifyToken, createCategory);
router.get('/getCategory', verifyToken, getCategory)

export default router;