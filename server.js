import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import dotenv from 'dotenv'
import rankingRoutes from './routes/ranking.js'

dotenv.config()

const app = express()
app.use(cors(
    {
        origin: '*',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
        exposedHeaders: 'Content-Type, Authorization'
    }
))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use('/api/user', authRoutes)
app.use('/api/ranking', rankingRoutes)

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
