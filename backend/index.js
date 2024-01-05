const express = require('express');
const cors = require('cors');

const app = express();
const port = 4999;

app.use(cors());

app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'))

app.listen(port, ()=>{
    console.log(`My-Projects connected to Port ${port}`);
})