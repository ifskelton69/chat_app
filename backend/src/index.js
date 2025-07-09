import express from 'express'
import dotenv from "dotenv";
import { connectdb } from "./lib/db.js";
import authrouthes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001   ;
app.use('/api/auth',authrouthes)


app.listen(PORT,()=>{
    console.log("server is runnig :"+ PORT);
    connectdb();
    
});