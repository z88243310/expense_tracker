// set env if NODE_ENV isn't production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// const CATEGORY = {
//   家居物業: 'https://fontawesome.com/icons/home?style=solid',
//   交通出行: 'https://fontawesome.com/icons/shuttle-van?style=solid',
//   休閒娛樂: 'https://fontawesome.com/icons/grin-beam?style=solid',
//   餐飲食品: 'https://fontawesome.com/icons/utensils?style=solid',
//   其他: 'https://fontawesome.com/icons/pen?style=solid',
// }

const db = require('../../config/mongoose')
const Category = require('../category')
const categorySeeds = require('./categorySeeds.json')

db.once('open', () => {
  Category.insertMany(categorySeeds).then(() => {
    console.log('categorySeeder done.')
    process.exit()
  })
})
