import express from 'express'
import dotenv from "dotenv";
import { connectdb } from "./lib/db.js";
import authrouthes from "./routes/auth.routes.js";
import cookieparser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded
app.use(express.json()); // for JSON payloads
app.use(express.json());
app.use('/api/auth',authrouthes);
app.use(cookieparser());

app.listen(PORT,()=>{
    console.log("server is runnig :"+ PORT);
    connectdb();
    
});