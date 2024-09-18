import { updateUser } from '../controllers/userController.js'
import { authenticateToken } from '../controllers/authController.js'
import { Router } from 'express'

const router = Router()


router.post('/update', authenticateToken, updateUser);


export default router