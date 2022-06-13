const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago')

mercadopago.configure({
    access_token: `${process.env.ACCESS_TOKEN}`
})

router.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
                title: "Mi producto",
                unit_price: 100,
                quantity: 1,
				// title: req.body.description,
				// unit_price: Number(req.body.price),
				// quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:4200/gracias",
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

router.get('/feedback', function(req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

module.exports = router;
