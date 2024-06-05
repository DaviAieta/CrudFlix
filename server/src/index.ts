import express from 'express'
import userRotues from './routes/user.routes'
import movieRoutes from './routes/movie.routes'
import loginRoutes from './routes/login.routes'
import authRoutes from './routes/auth.routes'

import cors from 'cors'
import { authMiddelware } from './middleware/auth.middleware'

const app = express()
const PORT = 3333

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/login', loginRoutes)
app.use(authMiddelware)

app.use('/auth', authRoutes)
app.use('/users', userRotues)
app.use('/movies', movieRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
