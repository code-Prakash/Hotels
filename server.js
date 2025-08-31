const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body


app.get('/', (req, res) => {
  res.send('Welcome to Our Hotel');
});


//Import the Router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//Import routes
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});