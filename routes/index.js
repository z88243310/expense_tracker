const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')
const records = require('./modules/records')

router.use('/users', users)
router.use('/auth', auth)
router.use('/records', authenticator, records)
router.use('/', authenticator, home)

module.exports = router
