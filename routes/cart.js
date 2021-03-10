const express = require('express')
const { addCart, getCart, deleteCart, patchCart } = require('../controllers/cart')

const router = express.Router()

router.get('/', getCart)

router.route('/:id')
    .post(addCart)
    .delete(deleteCart)
    .patch(patchCart)

router.get('/clear', (req, res) => {
    delete req.session.cart;
    res.redirect('/cart')
})

module.exports = router