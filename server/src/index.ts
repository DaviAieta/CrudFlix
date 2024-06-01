import express from 'express'
import userRotues from './routes/user.routes'
import movieRoutes from './routes/movie.routes'
import authRoutes from './routes/auth.routes'
import cors from 'cors'

const app = express()
const PORT = 3333

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', userRotues)
app.use('/', movieRoutes)
app.use('/', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
