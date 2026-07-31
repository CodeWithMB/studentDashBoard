import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT
app.use("/", (req, res) => {
    res.send({msg : "Testing my app if it works fine"});
})
app.listen(PORT, () => {
    console.log(`App started running on port ${PORT}`)
   
})