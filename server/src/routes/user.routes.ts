import { Router } from 'express'
import { UserController } from '../controller/user.controller'

const router = Router()

router.get('/users', UserController.list)
router.post('/users/create', UserController.create)
router.post('/users/update', UserController.update)
router.get('/users/getusername', UserController.getUserName)

export default router
