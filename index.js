import express from "express";
import mongoose from "mongoose";
import errorMidware from "./utils/errorMidware.js";
import dontenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
// import homeRouters from './routes/home.js'
import userRoutes from './routes/user.js'
import homeRoutes from './routes/home.js'

dontenv.config()


const app = express();
app.use(bodyParser.json({ limit:'25mb'}));
app.use(bodyParser.urlencoded({ extended:true,limit:"25mb"}))
app.use(errorMidware)
app.use(cors())
// app.use('/api/home',homeRouters)
app.use('/api/user',userRoutes)
app.use("/api/home",homeRoutes)
const start = async (next) => {
  try {
    mongoose.connect(process.env.MONGOOSE_URL);
  } catch (err) {
    console.log(err)
  }
};

mongoose.connection.on('disconnected',() => {
    console.log("mongoDB disconnected")
})
mongoose.connection.on('connected',() => { 
    console.log("mongoDB connected")
})

app.listen(5000, async() =>{
    await start()
})
