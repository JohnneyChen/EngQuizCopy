const mysql = require('mysql')
const Cart = require('../models/cart')

const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

connection.connect();

const addCart = (req, res) => {
    const productId = req.params.id;
    const qty = parseInt(req.body.qty) || 1;
    const q = 'SELECT * FROM products WHERE id=?'
    connection.query(q, productId, (error, result) => {
        if (error) throw error
        const newCart = new Cart(req.session.cart || {});
        newCart.add(result[0], productId, qty);
        req.session.cart = newCart;
        res.redirect('/products')
    })
}

const getCart = (req, res) => {
    const cart = new Cart(req.session.cart || {});
    const items = cart.array();
    return res.render('carts/show', { cart, items })
}

const deleteCart = (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart || {});
    cart.clear(productId);
    req.session.cart = cart;
    res.redirect('/cart')
}

const patchCart = (req, res) => {
    const productId = req.params.id;
    const qty = parseInt(req.body.qty);
    const cart = new Cart(req.session.cart || {});
    cart.change(productId, qty);
    req.session.cart = cart;
    res.redirect('/cart')
}

module.exports.addCart = addCart
module.exports.getCart = getCart
module.exports.deleteCart = deleteCart
module.exports.patchCart = patchCart