const Joi = require('joi')
const { AppError } = require('./Utilities')

const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    admin_key: Joi.string().allow('', null)
})

const productSchema = Joi.object({
    name: Joi.string().required(),
    cost: Joi.number().required(),
    image_url: Joi.string().allow('', null),
    type: Joi.string().allow('', null),
    description: Joi.string().allow('', null)
})

const cartSchema = Joi.object({
    qty: Joi.number().required()
})

const validateCart = (req, res, next) => {
    const { error } = cartSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    }
    return next()
}

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    }
    return next()
}

const validateProduct = (req, res, next) => {
    console.log(req.body.product)
    const { error } = productSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    }
    return next()
}

module.exports.validateUser = validateUser
module.exports.validateCart = validateCart
module.exports.validateProduct = validateProduct