const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago");
const { database } = require('../config/helpers');

mercadopago.configure({
  access_token: `${process.env.ACCESS_TOKEN}`,
});

router.post("/create_preference", (req, res) => {
  let preference = {
    // purpose: "wallet_purchase",
    external_reference: "ABC",
    // notification_url: "https://webhook.site/9d89035d-3a11-4744-950d-220b3ed3aae9",
    notification_url: "https://api.anitathomas.com.ar/mp/webhook",
    items: req.body.items,
    back_urls: {
      success: "localhost:4200/cart",
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
	  let email = '';
	  let name = '';
	  mercadopago.payment
		.search(orderId)
		.then((response)=> {
			const result = [] = response.body.results;
			const getLastResult = (arr)=>{
				let lastResult = arr.pop()
				return lastResult
			}
			const orderResult = getLastResult(result)
			status_details =  orderResult.status_detail
			items = [] = orderResult.additional_info.items
			// email = orderResult.payer.email;
			email = 'geronimo.bknuttzen@gmail.com';
			name = orderResult.payer.first_name + ' ' +  orderResult.payer.last_name;
				console.log({items:items, email: email, name: name, status: status_details})
				res.status(200).json({items:items, email: email, name: name, status: status_details});
		})
		.catch(function (error) {
			console.log(error)
		});
});

module.exports = router;
