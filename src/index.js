import express from 'express'
import { PORT } from './config.js'
import userRoutes from './routes/users.js'

const app = express()

app.use(express.json())
app.use(userRoutes)

app.listen(PORT)
console.log("Servidor en linea", PORT)