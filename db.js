const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

//Setup Mongoose connection
// mongoose.connect(mongoURL);.


//Get the default conection
//Mongoose maintain a default connection object representing the MongoDB connection
const db = mongoose.connection;

//Define the Event listner for database connection
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})
db.on('error',(err)=>{
    console.log('Error in DB connection: ', err);
})
db.on('disconnected',()=>{
    console.log('Disconnected from MongoDB server');
})

//Export the database connection
module.exports = db;