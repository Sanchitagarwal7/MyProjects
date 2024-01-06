const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

connectToMongo();
const app = express();
const port = 4999;

app.use(cors());

app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects.js'));

app.listen(port, ()=>{
    console.log(`My-Projects connected to Port ${port}`);
})
