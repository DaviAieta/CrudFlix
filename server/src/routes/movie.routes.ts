import { Router } from 'express'
import { MovieController } from '../controller/movie.controller'

const router = Router()

router.get('/movies', MovieController.list)
router.get('/movies/:movieId', MovieController.findOne)
router.post('/movies/create', MovieController.create)

export default router
