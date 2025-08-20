const express=require("express");
const app=express();
const cors=require('cors');
const router=express.Router();

const mainRouter=require('./routes/index')
app.use(cors());
app.use(express.json())
app.use('/api/auth',mainRouter);


app.listen(3000)