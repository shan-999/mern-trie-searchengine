import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/connect'
import router from './routes/searchRouters'

dotenv.config()
const app = express()
const PORT = process.env.PORT
const URL = process.env.URL

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:URL,
    methods:'*',
    allowedHeaders:'*',
}))

connectDB()


app.use('/',router)

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`)
})