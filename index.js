import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import mongoose from 'mongoose'
/* import mongoose from './config/db.js' */

dotenv.config()

const app = express()
app.use(express.json())

app.use('/auth',authRoute)


const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(()=>console.log("Mondodb connected"))
.catch((err)=>console.log(err))

app.listen(process.env.PORT,()=>{
    console.log(`Server running in port:${process.env.PORT}`)
})