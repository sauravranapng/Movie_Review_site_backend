import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"
const app =express()

app.use (cors())
app.use (express.json())
app.use("/api/v1",reviews)
app.use("*",(req,res)=>res.status(404).json({error:"not found "}))
// * means any other url 
export default app
