import express from 'express'
import userRotues from './routes/user.routes'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', userRotues)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
