require('dotenv').config()
require('./config/mongoDB')
const express = require('express')
const cors = require('cors')
var jwtDecode = require('jwt-decode');
var path = require('path');
const router = require('./router')
//     produkRoute = require('./routes/produkRoute'),
//     transaksiRoute = require('./routes/transaksiRoute'),
//     uploadUser = require('./job/multer')
// // shop=require('./shop.html')


// // transaksiRoute = require('./routes/transaksiRoute'),
const app = express()
app.use(express.static('./')); // serve all files in root folder, such as index.html
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/', router)
app.get('/tes', function (req, res) {
    res.sendFile(path.join(__dirname + '/sanbox.html'));
});

module.exports = app