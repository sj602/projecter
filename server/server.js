const express = require('express');
const router = require('./routes/routes.js');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', '/dist')));

// DB config
// Local
// mongoose.connect('mongodb://localhost:27017/admin', { dbName: 'projecter' })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));
// heroku mongolab
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/admin')
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));


const port = process.env.PORT || 8081;

app.listen(port, () => console.log('Server started on port:', port));

app.use('/', router);

app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '..', 'dist/index.html'));
  });

module.exports = app;