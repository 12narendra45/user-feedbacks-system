const express = require('express');
const app = express();
const cors=require('cors')
const dotenv=require('dotenv')
const mongoose=require('mongoose')

dotenv.config()
app.use(cors())
app.use(express.json());
const route=require('./Routes')

mongoose.connect(process.env.uri).then(()=>{
        console.log("database created")
    }
).catch((err)=>console.log(err))

app.use("/add-data",route)

app.listen(5000, () => console.log("Server started on port 5000"));
