class AppError extends Error {
    constructor(message, statusCode) {
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

const wrapAsync = fn => {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnURL = req.originalUrl
        req.flash('error', 'You need to log in to perform this action')
        return res.redirect('/login')
    }
    next()
}

const isAdmin = (req, res, next) => {
    if (!res.locals.admin) {
        req.session.returnURL = req.originalUrl
        req.flash('error', 'You need to be an admin to perform this action')
        return res.redirect('/login')
    }
    next()
}

module.exports.wrapAsync = wrapAsync
module.exports.isLoggedIn = isLoggedIn
module.exports.AppError = AppError
module.exports.isAdmin = isAdmin