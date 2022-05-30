const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const request = require('request')

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

// Paypal
const CLIENT = 'ARlz4s6tFW0y5ehq0LsbXqow2auml0nHpx68x1MEQHXKWpZq_5hLtegq4NARVxDNNJbnjoUSBlwwj6H4';
const SECRET = 'EInTeVLadwL4KYmpE3UoeDb6uZrXRvO3Sc1EBv101hRu_4uh3n5s28AVohDc-sOkETNqYKP4v7qYJ6cb'; 
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; //LIVE 'https://api-m.paypal.com
const auth = {user: CLIENT, pass: SECRET}

const createPayment = (req, res)=>{
    const body ={
        intent: 'CAPTURE',
        purchase_units:[{
            amount:{
                currency_code: 'USD',
                value: '150'
            }
        }],
        application_context:{
            brand_name: 'Anita Thomas',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: ``,
        }
    }
}


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
