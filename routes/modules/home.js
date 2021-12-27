const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const getFormatDate = require('../../tools/getFormatDate')
const getTotalAmount = require('../../tools/getTotalAmount')

router.get('/', async (req, res) => {
  const userId = req.user._id
  // search keyword & categoryId selected
  const keyword = req.query.keyword ? req.query.keyword.trim() : ''
  const categoryIdSelected = req.query.categoryIdSelected || ''
  try {
    // 如果 categoryIdSelected 為 有效值，則 列入篩選條件
    const categories = await Category.find().lean()
    const categoryIndex = categories.findIndex(category => JSON.stringify(category._id) === JSON.stringify(categoryIdSelected))
    const records = await Record.find(categoryIndex === -1 ? { userId, name: { $regex: keyword } } : { userId, categoryId: categoryIdSelected, name: { $regex: keyword } })
      .populate('categoryId')
      .sort({ date: 'desc' })
      .lean()

    // 調整時間格式 > 計算總金額 > 渲染畫面
    getFormatDate(records)
    const totalAmount = getTotalAmount(records)
    return res.render('index', { records, categories, totalAmount, categoryIdSelected, keyword })
  } catch (error) {
    return console.log(error)
  }
})

module.exports = router
