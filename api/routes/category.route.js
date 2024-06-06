import express from 'express';
import { createCategory, getCategory, deleteCategory, editCategory } from '../controllers/category.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createCategory', verifyToken, createCategory);
router.get('/getCategory', getCategory);
router.delete('/delete/:categoryId', verifyToken, deleteCategory);
router.put('/edit/:categoryId', verifyToken, editCategory)

export default router;