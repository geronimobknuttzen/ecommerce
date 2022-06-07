const axios = require('axios')

class PaymentServ{
    async createPayment(){
        const url = "https://api.mercadopago.com/checkout/preferences"
        const body ={
            items: [
                {
                    title: "Preset",
                    description: 'Original Movie Preset',
                    picture_url: '',
                    category_id: '',
                    quantity: 1,
                    unit_price: 3390
                }
            ],
            back_urls:{
                success: '/gracias'
            }
        };

        const payment = await axios.post(url, body,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }); 

        return payment.data
    }
}