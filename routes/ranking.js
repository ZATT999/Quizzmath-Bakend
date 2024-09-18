import { Router } from 'express'
import { getRanking } from '../controllers/rankingController.js'

const router = Router()

router.get('/', getRanking)

export default router
