import { Router } from 'express'
import { MovieController } from '../controller/movie.controller'

const router = Router()

router.get('/', MovieController.list)
router.get('/:movieId', MovieController.findOne)
router.post('/create', MovieController.create)

export default router
