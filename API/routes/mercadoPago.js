const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: `${process.env.ACCESS_TOKEN}`,
});

router.post("/create_preference", (req, res) => {
  let preference = {
    // purpose: "wallet_purchase",
    external_reference: "ABC",
    notification_url: "https://hookb.in/1g0MJm3ywKUdW2ndyX8q",
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
			email = orderResult.payer.email;
			name = orderResult.payer.first_name + ' ' +  orderResult.payer.last_name;
				console.log({items:items, email: email, name: name, status: status_details})
				res.status(200).json({items:items, email: email, name: name, status: status_details});
		})
		.catch(function (error) {
			console.log(error)
		});
});

module.exports = router;
