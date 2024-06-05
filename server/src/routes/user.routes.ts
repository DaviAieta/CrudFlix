import { Router } from 'express'
import { UserController } from '../controller/user.controller'

const router = Router()

router.get('/', UserController.list)
router.post('/create', UserController.create)
router.post('update', UserController.update)
router.get('/getusername', UserController.getUserName)

export default router
