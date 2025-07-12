import express from 'express'
import dotenv from "dotenv";
import { connectdb } from "./lib/db.js";
import authroutes from "./routes/auth.routes.js";
import messageroutes from "./routes/message.routes.js";
import cookieparser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cookieparser());
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded
app.use(express.json()); // for JSON payloads
app.use(express.json());
app.use('/api/auth',authroutes);
app.use('/api/message',messageroutes);

app.listen(PORT,()=>{
    console.log("server is runnig :"+ PORT);
    connectdb();
    
});