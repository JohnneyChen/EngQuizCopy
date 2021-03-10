const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const { urlencoded } = require('express')
const { connect } = require('http2')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const logger = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const MongoStore = require('connect-mongo')(session);
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51ICS0mHRIHw8xwrCbg4xIa7b4rRzp9A0N3JFa7fgPvPiHKs8VapoBQXGYiXJFSRS0oINY5wNdLmIdKdaLkpiOZ8T00FLzDySMm');

const { AppError } = require('./Utilities')
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const cartRouter = require('./routes/cart')
const checkoutRouter = require('./routes/checkout')

const app = express()

const dburl = process.env.MONGODB_URL || 'mongodb://localhost:27017/bakery_app'

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const db = mongoose.connection
db.on('error', () => {
    console.log('Connection error:')
})
db.once('open', () => {
    console.log('successfully connection to mongoDB')
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate)
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        url: dburl,
        secret: process.env.SECRET,
        touchAfter: 24 * 60 * 60
    }),
    cookie: { maxAge: 1 * 60 * 60 * 1000 }
}))
app.use(flash())
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

const Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//res.locals for flash
app.use(async (req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.login = req.isAuthenticated()
    res.locals.currentUser = req.isAuthenticated()
    res.locals.admin = false
    if (req.user) {
        res.locals.admin = req.user.admin
    }
    res.locals.cart = req.session.cart || { totalQty: 0 }
    next()
})


app.get('/', (req, res) => {
    res.render('home')
})

app.use('/', checkoutRouter)

//cart routes
app.use('/cart', cartRouter)

//user routes
app.use('/', userRouter)

//product routes
app.use('/products', productRouter)

app.all('*', (req, res) => {
    throw new AppError('This page is still baking in the oven...404 page not found', 404)
})

app.use((err, req, res, next) => {
    const message = err.message || 'We ran into an unknown error'
    const stack = err.stack
    res.status(err.statusCode || 500).render('error', { message, stack })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})