import express from 'express'
import cors from 'cors'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import connectDB from './db/connectdb.js'
import webRoutes from './routes/webRoutes.js'
import multer from 'multer'
import { register } from './controller/authController.js'
import { verification } from './middleware/auth.js'
import userRoute from './routes/userRoute.js'

const port = process.env.PORT 
const DATABASE_URL = process.env.DATABASE_URL

// configuration

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)




// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// file storage

const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req,file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage })

// routes

app.post("/auth/register",upload.single("picture"),verification ,register)
app.use("/auth",webRoutes)
app.use("/users", userRoute)

// db
connectDB(DATABASE_URL)





app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})