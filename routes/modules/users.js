const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

// 登入頁面
router.get('/login', (req, res) => {
  const error = req.flash('error')
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  res.render('login', { error })
})

// 登入
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

// 註冊頁面
router.get('/register', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  res.render('register')
})

// 註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  // 欄位填寫未完整
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== confirmPassword) {
    // 密碼再次確認不一致
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  // 符合以上狀態，直接回傳錯誤
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  // 從資料庫尋找使用者
  User.findOne({ email }).then(user => {
    // 已註冊
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', { errors, name, email, password, confirmPassword })
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
