import express from 'express';
import { authenticateToken, me, login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/me', authenticateToken, me);

export default router;
