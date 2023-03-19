const path = require('path');
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const morgan = require('morgan');

const app = express();
app.use(cors());

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))
app.use('/api', apiRoutes);

module.exports = app;
