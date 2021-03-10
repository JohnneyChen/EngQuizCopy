const Account = require('../models/account')
const passport = require('passport')
const { wrapAsync } = require('../Utilities')

const getRegister = (req, res) => {
    res.render('users/register')
}

const postRegister = wrapAsync(async (req, res, next) => {
    try {
        if (req.body.admin_key === 'admin') {
            const { username, password } = req.body
            const newUser = new Account({ username: username, admin: true })
            const registeredUser = await Account.register(newUser, password)
            passport.authenticate('local')(req, res, function () {
                req.flash('success', 'Successfully registered')
                res.redirect('/');
            });
        } else {
            const { username, password } = req.body
            const newUser = new Account({ username: username, admin: false })
            const registeredUser = await Account.register(newUser, password)
            passport.authenticate('local')(req, res, function () {
                req.flash('success', 'Successfully registered')
                res.redirect('/');
            });
        }
    }
    catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }

})

const getLogin = (req, res) => {
    res.render('users/login')
}

const postLogin = (req, res) => {
    req.flash('success', 'Successfully logged in')
    const returnURL = req.session.returnURL || '/'
    res.redirect(returnURL)
}

const logout = (req, res) => {
    req.logout()
    req.flash('success', 'Successfully logged out')
    res.redirect('/')
}

module.exports.getRegister = getRegister
module.exports.getLogin = getLogin
module.exports.postRegister = postRegister
module.exports.postLogin = postLogin
module.exports.logout = logout
