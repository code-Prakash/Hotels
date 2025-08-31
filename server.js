const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
require('dotenv').config();
const PORT = process.env.PORT || 3000;


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