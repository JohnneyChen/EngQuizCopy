const express = require('express')

const { getProducts, getProduct, getNew, getProductEdit, postNew, patchProduct, deleteProduct } = require('../controllers/product')
const { isAdmin } = require('../Utilities')
const { validateProduct } = require('../validationSchemas')

const router = express.Router()

router.route('/')
    .get(getProducts)
    .post(isAdmin, validateProduct, postNew)

router.get('/new', isAdmin, getNew)

router.route('/:id')
    .get(getProduct)
    .patch(isAdmin, validateProduct, patchProduct)
    .delete(isAdmin, deleteProduct)

router.get('/:id/edit', getProductEdit)

module.exports = router