// backend/index.js

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userRouter } from './routes/user.js';

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const database = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            serverSelectionTimeoutMS: 5000,
        });
        console.log("MongoDB Database Connected!");
    } catch (error) {
        console.log("Database Connection Error : ",error);
    }
}
database();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'dist')));

app.use("/user",userRouter);
app.get("/",(req, res) => {
    res.json({
        msg: "Backend Server Connected Successfully!"
    })
});

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Backend Server Connected In The Port http://localhost:${process.env.PORT}/ `);
});