const express = require('express')
const passport = require('passport')
const { getLogin, getRegister, postLogin, postRegister, logout } = require('../controllers/user')
const { validateUser } = require('../validationSchemas')

const router = express.Router()

router.route('/login')
    .get(getLogin)
    .post(validateUser, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), postLogin)

router.route('/register')
    .get(getRegister)
    .post(validateUser, postRegister)

router.get('/logout', logout)
module.exports = router