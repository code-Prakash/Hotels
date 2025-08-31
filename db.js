const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

//Setup Mongoose connection
// mongoose.connect(mongoURL , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
mongoose.connect(mongoURL);

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