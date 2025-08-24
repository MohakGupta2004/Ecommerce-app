import connectDB from './db/database.js';
import dotenv from 'dotenv'
import app from './app.js';

//env variable setup
dotenv.config()

//Database connection
const DB_URL = process.env.MONGO_URL

connectDB(DB_URL).then(()=>{
  console.log('MONGO IS RUNNING')
  app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`)
  })
}).catch((error)=>{
  console.error("MONGO NOT CONNECTED", error)
})

