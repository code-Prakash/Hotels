const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const passport = require('./auth');
app.use(bodyParser.json()); //req.body
require('dotenv').config();
const PORT = process.env.PORT || 3000;


//Middleware function
const logRequest = (req,res,next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
  next(); //Move to the next phase
}

app.use(logRequest);

//Initialize passport middleware
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', (req, res) => {
  res.send('Welcome to Our Hotel');
});


//Import the Router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//Import routes
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});