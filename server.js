import express from 'express';
import {Connection} from './database/db.js';
import dotenv from 'dotenv';
import DefaultData from './default.js';
import router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

dotenv.config();

app.use(cookieParser());
app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/', router);

app.use(express.static(path.join(__dirname, './client/build')))

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})


const PORT = process.env.PORT || 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD 
const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.gvssr8m.mongodb.net/?retryWrites=true&w=majority`


Connection(URL);


app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
})

DefaultData();