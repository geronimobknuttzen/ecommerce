const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
//ROUTES
const imagesRoute = require('./routes/images');
const portfoliosRoute = require('./routes/portfolios');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/order');
const productsRoute = require('./routes/products');

const app = express();

app.use(cors({
    origin:"*",
    method:['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders:'Content-type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//USE ROUTES
app.use('/api/presets', productsRoute);
app.use('/api/images', imagesRoute);
app.use('/api/portfolios', portfoliosRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/users', usersRoute);


module.exports = app;
