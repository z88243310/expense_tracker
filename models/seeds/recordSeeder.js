// set env if NODE_ENV isn't production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const User = require('../user')
const Record = require('../record')
const Category = require('../category')

const SEED_USER = require('./userSeeds.json')
const SEED_RECORD = require('./recordSeeds.json')
const SEED_CATEGORY = require('./categorySeeds.json')

db.once('open', async () => {
  const timeInMs = Date.now()
  // 取得 categories
  const categories = await Category.find().lean()

  SEED_RECORD.forEach(seedRecord => {})

  try {
    // 雜湊 > 存入&取得 user > 取得 userId,categoryId
    await Promise.all(
      SEED_USER.map(async seedUser => {
        const { name, email, password } = seedUser
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await User.create({ name, email, password: hash })

        SEED_RECORD.forEach(seedRecord => {
          // seedRecord 不屬於 當前使用者 ，直接跳過
          if (!seedUser.recordId.includes(Number(seedRecord.id))) return

          // 將 SEED_RECORD category "編號" 轉換為 "名稱"。
          seedRecord.category = SEED_CATEGORY.find(seedCategory => seedCategory.id === seedRecord.category).name

          // 取得資料庫 userId,categoryId ，寫入 seedRecord object
          const category = categories.find(category => category.name === seedRecord.category)
          seedRecord.categoryId = category._id
          seedRecord.userId = user._id
        })
      })
    )
    // 存入 record
    await Record.insertMany(SEED_RECORD)
  } catch (error) {
    return console.log(error)
  }

  // show user information
  console.log('recordSeeder done.')
  SEED_USER.forEach(seedUser => {
    delete seedUser.recordId
    return console.log(seedUser)
  })
  console.log(Date.now() - timeInMs, 'ms')
  process.exit()
})
