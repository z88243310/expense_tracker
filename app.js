const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

// set env if NODE_ENV isn't production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 載入 mongodb & passport
require('./config/mongoose')
const usePassport = require('./config/passport')

const app = express()
const PORT = process.env.PORT
const routes = require('./routes')

// session setting
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

// set handlebars
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs', helpers: require('./config/handlebars-helpers') }))
app.set('view engine', 'hbs')
app.set('views', './views')

// set public dir
app.use(express.static('public'))

// use body-parser
app.use(express.urlencoded({ extended: true }))

// 請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// use passport
usePassport(app)

// use flash message
app.use(flash())

// check isAuthenticated to set locals variable
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})

// entry of router
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
