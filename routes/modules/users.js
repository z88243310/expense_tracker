const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // 密碼再次確認不一致
  if (password !== confirmPassword) {
    return res.render('register', { name, email, password, confirmPassword })
  }
  // 從資料庫尋找使用者
  User.findOne({ email }).then(user => {
    // 已註冊
    if (user) {
      console.log('User already exists.')
      return res.render('register', { name, email, password, confirmPassword })
    }
    // 未註冊
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({ name, email, password: hash }))
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })
})

module.exports = router
