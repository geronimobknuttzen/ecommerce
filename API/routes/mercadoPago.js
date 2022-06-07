const express = require('express');
const router = express.Router();

const PaymentController = require('../Controller/payments');
const PaymentService = require('../Services/PaymentServ');

const PaymentInstance = new PaymentController(new PaymentService());

router.get('/', function(req, res, next){
    return res.json({
        "/payment": "generate a payment link"
    })
})

router.get('/payment', function (req, res){
    PaymentInstance.getPaymentLink (req, res);
})


module.exports = router;










// import mercadopago from 'mercadopago';

// export const crearOrden = async(req, res)=>{
 
// mercadopago.configure({
//     access_token: 'TEST-4417539877503823-060616-f5c62e87e54042367e8244988ed43b12-1137832719'
// });

// var preference = {
//   items: [
//     {
//       title: 'Preset',
//       quantity: 1,
//       currency_id: 'ARS',
//       unit_price: 3390.0
//     }
//   ],
//   Notification_url
// };

// mercadopago.preferences.create(preference)
// }

// export const notificationOrder = async(req, res)=>{
//     const datos = res.query;
//     console.log(datos)
// }