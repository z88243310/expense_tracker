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

db.once('open', async () => {
  const timeInMs = Date.now()
  // 取得 categories
  const categories = await Category.find().lean()

  // 雜湊 > 存入&取得 user > 取得 userId,categoryId
  await Promise.all(
    SEED_USER.map(async seedUser => {
      const { name, email, password } = seedUser
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      const user = await User.create({ name, email, password: hash })

      // 取得 userId,categoryId ， 寫入 seedRecord object
      SEED_RECORD.forEach(seedRecord => {
        if (!seedUser.recordId.includes(Number(seedRecord.id))) return
        const category = categories.find(category => category.name === seedRecord.category)
        seedRecord.categoryId = category._id
        seedRecord.userId = user._id
      })
    })
  )
  // 存入 record
  await Record.insertMany(SEED_RECORD)

  console.log('recordSeeder done.')
  SEED_USER.forEach(seedUser => {
    delete seedUser.recordId
    return console.log(seedUser)
  })
  console.log(Date.now() - timeInMs, 'ms')
  process.exit()
})

// db.once('open', () => {
//   // 取得 categories > 雜湊 > 存入&取得 user > 取得 userId,categoryId > 存入 record
//   let timeInMs = Date.now()
//   Category.find()
//     .lean()
//     .then(categories =>
//       Promise.all(
//         SEED_USER.map(seedUser => {
//           const { name, email, password } = seedUser
//           return bcrypt
//             .genSalt(10)
//             .then(salt => bcrypt.hash(password, salt))
//             .then(hash => User.create({ name, email, password: hash }))
//             .then(user =>
//               // 取得 userId,categoryId ， 寫入 seedRecord object
//               SEED_RECORD.forEach(seedRecord => {
//                 if (!seedUser.recordId.includes(Number(seedRecord.id))) return
//                 const category = categories.find(category => category.name === seedRecord.category)
//                 seedRecord.categoryId = category._id
//                 seedRecord.userId = user._id
//               })
//             )
//         })
//       )
//     )
//     .then(() => Record.insertMany(SEED_RECORD))
//     .then(() => {
//       console.log('recordSeeder done.')
//       SEED_USER.forEach(seedUser => {
//         delete seedUser.recordId
//         return console.log(seedUser)
//       })
//       console.log(Date.now() - timeInMs)
//       process.exit()
//     })
// })
