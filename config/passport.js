const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(
    new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
      User.findOne({ email }).then(user => {
        // 使用者不存在
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        // 密碼比對
        return bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            // 密碼不正確
            if (!isMatch) {
              return done(null, false, { message: 'Email of Password incorrect.' })
            }
            // 密碼正確，登入成功
            return done(null, user)
          })
          .catch(error => console.log(error))
      })
    })
  )

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => console.log(error))
  })
}
