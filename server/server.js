import './src/config/instrument.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectDB from './src/config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWebHooks } from './src/controller/webHooks.js'
import router from './src/routes/api.js';
import { connectCloudinary } from './src/config/cloudinary.js'
//Initialize Express
const app = express()

await connectDB()
await connectCloudinary()

//Middleware
app.use(cors({
  origin: "https://job-portal-client-towhid.vercel.app/",
  methods: ["GET", "POST", "PUT", "PATCH"],
  credentials: true 
}));
app.use(express.json())
app.use(cookieParser())
//Routes
app.get('/', (req,res)=>res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
// app.post('/webhooks', clerkWebHooks)


app.set('etag', false);
app.use('/api/v1', router);


//Port
const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})