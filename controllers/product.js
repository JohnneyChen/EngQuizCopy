const mysql = require('mysql')

const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

connection.connect();

const getProducts = (req, res) => {
    const q = 'SELECT * FROM products'
    connection.query(q, (error, result) => {
        if (error) throw error
        res.render('products/index', { result })
    })
}

const getProduct = (req, res) => {
    const { id } = req.params
    const q = 'SELECT * FROM products WHERE id=?'
    connection.query(q, id, (error, result) => {
        if (error) throw error
        res.render('products/show', { result })
    })
}

const getNew = (req, res) => {
    res.render('products/new')
}

const getProductEdit = (req, res) => {
    const { id } = req.params
    const q = 'SELECT * FROM products WHERE id=?'
    connection.query(q, id, (error, result) => {
        if (error) throw error
        res.render('products/edit', { result })
    })
}

const postNew = (req, res) => {
    console.log(req.body)
    const q = 'INSERT INTO products SET ?'
    connection.query(q, req.body, (error, result) => {
        if (error) throw error
        req.flash('success', 'Successfully added a product')
        res.redirect('/products')
    })
}

const patchProduct = (req, res) => {
    const { id } = req.params
    const q = 'UPDATE products SET ? WHERE id=?'
    connection.query(q, [req.body, parseInt(id)], (error, result) => {
        if (error) throw error
        req.flash('success', 'Successfully edited a product')
        res.redirect(`/products/${id}`)
    })
}

const deleteProduct = (req, res) => {
    const { id } = req.params
    const q = 'DELETE FROM products WHERE id=?'
    connection.query(q, id, (error, result) => {
        if (error) throw error
        req.flash('success', 'Successfully deleted a product')
        res.redirect(`/products`)
    })
}

module.exports.getProducts = getProducts
module.exports.getProduct = getProduct
module.exports.getNew = getNew
module.exports.getProductEdit = getProductEdit
module.exports.postNew = postNew
module.exports.patchProduct = patchProduct
module.exports.deleteProduct = deleteProduct