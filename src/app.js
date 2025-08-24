import express from 'express'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js'
import { ApiResponse } from './utils/ApiResponse.js';
const app = express();

//middlewares
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true,
}))

//routes
app.use("/api/v1/auth", authRouter)


app.get("/healthcheck", (req, res) => {
  return res.json(new ApiResponse(200, "server running"))
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  return res.json(new ApiResponse(err.statusCode || 500, err.message || "Something went wrong"))
})

export default app

