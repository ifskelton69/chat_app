import express from 'express'
const app = express();
import dotenv from "dotenv";
import authrouthes from "./routes/auth.routes.js";

dotenv.config();
const PORT = process.env.PORT
app.use('/api/auth',authrouthes)


app.listen(PORT,()=>{
    console.log(`server is runnig`);
    
});