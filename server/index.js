// Main starting point of the application
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');
mongoose.Promise = global.Promise;

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json());

// Initialise routes
app.use('/', require('./routes/authentication'));

// Server Setup
const port = process.env.PORT || 3090;
app.listen(port, function() {
  console.log('Server listening on: ', port);
});