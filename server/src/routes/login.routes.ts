import { Router } from 'express'
import { AuthController } from '../controller/auth.controller'

const router = Router()

router.post('/', AuthController.login)

export default router
