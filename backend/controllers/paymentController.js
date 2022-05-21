const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
    try{
        const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "gel",
        metadata: {
        company: "Coffee Berry",
        },
        });
        res.status(200).json({ 
            success: true,
            client_secret: myPayment.client_secret
        });
    } catch (err){
        res.status(500).json({message: err.message})
    }
  
}

const sendStripeApiKey = async (req, res) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
}

module.exports = {
    processPayment,
    sendStripeApiKey
}