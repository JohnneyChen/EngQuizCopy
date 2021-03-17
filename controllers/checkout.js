const Cart = require('../models/cart')
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51ICS0mHRIHw8xwrCbg4xIa7b4rRzp9A0N3JFa7fgPvPiHKs8VapoBQXGYiXJFSRS0oINY5wNdLmIdKdaLkpiOZ8T00FLzDySMm');

const createCheckoutSession = async (req, res) => {
    const cart = new Cart(req.session.cart)
    console.log(cart)
    const items = cart.array()
    const lineItems = []
    for (let item of items) {
        lineItems.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.item.name,
                },
                unit_amount: item.item.cost * 100,
            },
            quantity: item.qty,
        })
    }
    const price = Math.round(req.session.cart.totalCost * 100);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.SITE_URL}/checkout/success`,
        cancel_url: `${process.env.SITE_URL}/checkout/cancel`,
    });

    res.json({ id: session.id });
}

module.exports.createCheckoutSession = createCheckoutSession