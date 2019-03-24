const express = require('express');
const path = require('path');
const router = require('./routes/routes.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// App use middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', '/dist')));

// heroku mongolab
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/admin', { useNewUrlParser: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));

const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Server started on port:', port));

// router setting
app.use('/', router);

app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '..', 'dist/index.html'));
  });

module.exports = app;