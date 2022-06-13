const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const request = require('request');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser")

const cors = require('cors');
const dotenv = require ("dotenv");

dotenv.config()


//ROUTES
const imagesRoute = require('./routes/images');
const newsRoute = require('./routes/news');
const portfoliosRoute = require('./routes/portfolios');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/order');
const productsRoute = require('./routes/products');
const authRoute = require('./routes/auth');
const mpRoute = require('./routes/mercadoPago')

const app = express();

app.use(cors({
    origin:"*",
    method:['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders:'Content-type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

//USE ROUTES
app.use('/api/presets', productsRoute);
app.use('/api/images', imagesRoute);
app.use('/api/portfolios', portfoliosRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/news', newsRoute);
app.use('/api/mercadopago', mpRoute)

module.exports = app;
