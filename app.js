const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')

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
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
  })
)

// set handlebars
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

// use body-parser
app.use(express.urlencoded({ extended: true }))

// 請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// use passport
usePassport(app)

// entry of router
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
