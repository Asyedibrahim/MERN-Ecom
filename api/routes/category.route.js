import express from 'express';
import { createCategory } from '../controllers/category.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createCategory', verifyToken, createCategory)

export default router;