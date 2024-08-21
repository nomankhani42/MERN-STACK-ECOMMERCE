import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Route } from './Routes/user.js';
import { CatRoute } from './Routes/Category.js';
import dotenv from 'dotenv';
import { ProductRouter } from './Routes/Product.js';
import { OrderRouter } from './Routes/Order.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


dotenv.config();

const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors())
app.use(express.static(path.join(__dirname,'./build')))


main().then(()=>console.log('DB connected')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MongoURL);
  
}

app.use('/api/',Route)
app.use('/api/category',CatRoute)
app.use('/api/product',ProductRouter)
app.use('/api/order',OrderRouter)

app.use('*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(8080,()=>{
    console.log('App Running');
})
