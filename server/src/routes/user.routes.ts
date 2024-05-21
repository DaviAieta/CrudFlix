import { Router } from 'express'
import { UserController } from '../controller/user.controller'

const router = Router()

router.get('/users', UserController.list)
router.get('/users/:userId', UserController.findOne)
router.post('/users/create', UserController.create)

export default router
