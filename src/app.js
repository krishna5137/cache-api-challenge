import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cacheRouter from './api/v1/routes/cache.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.CACHE_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Mongo Connection Successful!'))

app.use("/api/v1/cache", cacheRouter)
app.use("*", (req, res) => res.status(404).json({ error: "Requested Page Cannot be found!"}))

export default app