import express from 'express';
import { authenticateToken, me, login, register } from '../controllers/authController.js';
import { updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/me', authenticateToken, me);
router.post('/update', authenticateToken, updateUser);

export default router;
