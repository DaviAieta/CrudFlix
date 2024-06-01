import { Router } from 'express'
import { AuthController } from '../controller/auth.controller'

const router = Router()

router.post('/auth/sendMagicLink', AuthController.sendMagicLink)

export default router
