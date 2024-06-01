import express from 'express';
import { test, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.delete('/deleteUser/:userId', verifyToken, deleteUser);

export default router;