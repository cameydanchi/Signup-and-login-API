import express from 'express'
import path from 'path';
import bcrypt from 'bcrypt'
import { configDotenv } from 'dotenv';
import { dbconnection } from './config/db.js';
import { router } from './routes/route.js';




// connecting to database
dbconnection();

const app = express();





//creating a middleware
app.use(express.json())
app.use(router);



// creating port

const PORT = 8070
app.listen(PORT,() => {
    console.log(`listening to Port ${PORT}`)
})