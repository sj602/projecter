const express = require('express');
const router = require('./routes/routes.js');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DB config
mongoose.connect('mongodb://localhost:27017/admin', { dbName: 'projecter' })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 8081;

app.listen(port, () => console.log('Server started on port:', port));

app.use('/', router);

module.exports = app;