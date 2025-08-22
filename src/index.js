import express from 'express';
import connectDB from './db/database.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

//env variable setup
dotenv.config()

//Database connection
const DB_URL = process.env.MONGO_URL
connectDB(DB_URL)

// App initialization
const app = express();

//middlewares
app.use(express.json())
app.use(cookieParser());

//routes


//listening
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
