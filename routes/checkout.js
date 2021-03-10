const express = require('express');
const { createCheckoutSession } = require('../controllers/checkout');

const router = express.Router();

router.get('/checkout/success', (req, res) => {
    delete req.session.cart;
    req.flash('success', 'Thank you for shopping with us!')
    res.redirect('/products');
})
router.get('/checkout/cancel', (req, res) => {
    req.flash('error', 'Canceled checkout')
    res.redirect('/cart');
})

router.post('/create-checkout-session', createCheckoutSession)

module.exports = router;