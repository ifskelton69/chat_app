import express from 'express'
import dotenv from "dotenv";
import { connectdb } from "./lib/db.js";
import authroutes from "./routes/auth.routes.js";
import messageroutes from "./routes/message.routes.js";
import cookieparser from "cookie-parser";
import cors from 'cors'
import {app, server} from './lib/socket.js';
dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(cookieparser());
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded
app.use(express.json()); // for JSON payloads
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.get('/api/test', (req, res) => {
    res.send(req.cookies); // Should show jwt
});
app.use('/api/auth', authroutes);
app.use('/api/messages', messageroutes);

server.listen(PORT, () => {
    console.log("server is runnig :" + PORT);
    connectdb();

});