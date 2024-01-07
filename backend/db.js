const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/My-Projects";

const connectToMongo = ()=>{
    mongoose.connect(mongoURL);
    console.log("Database connected To MongoDB");
}

module.exports = connectToMongo;