const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago");
const { database } = require('../config/helpers');

mercadopago.configure({
  access_token: `APP_USR-1217822907008421-060112-94753537348b7ac196dc1d536a684c86-67146415`,
});

router.post("/create_preference", (req, res) => {
  let preference = {
    // purpose: "wallet_purchase",
    external_reference: "ABC",
    notification_url: "https://webhook.site/9d89035d-3a11-4744-950d-220b3ed3aae9",
    // notification_url: "https://api.anitathomas.com.ar/mp/webhook",
    items: req.body.items,
    back_urls: {
      success: "https://anitathomas.com.ar/#/cart",
    },
    auto_return: "approved",
    payment_methods: {
      excluded_payment_types: [
        {
          id: "ticket",
        },
      ],
      installments: 12,
    },
    statement_descriptor: "ANITA THOMAS",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
		const mp = response.body.init_point
    	res.json(mp)
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post("/webhook", (req, res)=>{
  if(req.method == 'POST'){
    let resource = req.body.resource;
    let topic = req.params.topic;
    let action = req.body.action;
    let api_version = req.body.api_version;
    let data_mp = req.params.data.id;
    let data_created = req.body.data_created;
    let id_mp = req.params.id;
    let live_mode = req.body.live_mode;
    let type = req.body.type;
    let user_id = req.body.user_id;


    console.log(info)
    datanase.table('webhook as w')
      .withFields([
        'w.resource',
        'w.topic',
        'w.action',
        'w.api_version',
        'w.data_mp',
        'w.data_created',
        'w.id_mp',
        'w.live_mode',
        'w.type',
        'w.user_id'
      ])
      .insert({
        resource : resource,
        topic : topic,
        action : action,
        api_version : api_version,
        data_mp : data_mp,
        data_created : data_created,
        id_mp : id_mp,
        live_mode : live_mode,
        type : type,
        user_id : user_id
      })
      .then(webhook=>{
          res.json({message:'Se cargó la noticia', success: true})
      })
      .catch(error=>console.log(error))
      }    
})

router.get("/info", (req, res)=>{
  database.table('webhook as w')
  .getAll()
  .then(data => {
      if (data.length > 0) {
          res.status(200).json({
              data: data
          })
      } else {
          res.json({message: 'No se encontraron información'})
      }
  })

  .catch(err => console.log(err));
});

router.get("/feedback/:id", (req, res) => {
	const orderId = req.params.id;
	console.log('order Id es:', orderId)
	  let email = '';
	  let name = '';
	  mercadopago.payment
		.findById(orderId)
		.then((response)=> {
			status_detail = response.body.status_detail
			items = response.body.description
			email = response.body.payer.email;
			name = response.body.payer.first_name + ' ' +  response.body.payer.last_name;
				console.log({items:items, email: email, name: name, status: status_detail})
				res.status(200).json({items:items, email: email, name: name, status: status_detail});
		})
		.catch(function (error) {
			console.log(error)
		});
});

module.exports = router;