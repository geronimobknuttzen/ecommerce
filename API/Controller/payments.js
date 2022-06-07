class PaymentController {
    constructor(subscriptionService){
        this.subscriptionService = subscriptionService
    }

    async getPaymentLink(res, req){
        try {
            const payment = await this.subscriptionService.createPayment();
            return res.json(payment)
        }
        catch(error){
            console.log(error);
            return res
                .status(500)
                .json({error: true, msg: 'Failed to create payment'})
        }
    }
}

module.exports = PaymentController;