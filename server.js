import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import dotenv from 'dotenv'
import rankingRoutes from './routes/ranking.js'
import userRoutes from './routes/user.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use('/api/auth', authRoutes)
app.use('/api/ranking', rankingRoutes)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
