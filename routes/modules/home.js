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
  const monthSelected = req.query.monthSelected || ''

  try {
    // 如果 categoryIdSelected 為 有效值，則 列入篩選條件
    const categories = await Category.find().lean()
    const searchKey = { userId }
    if (keyword !== '') searchKey.name = { $regex: keyword }
    if (categoryIdSelected !== '') searchKey.categoryId = categoryIdSelected
    if (monthSelected !== '')
      searchKey.date = {
        $gte: new Date(1900, monthSelected - 1),
        $lte: new Date(2021, monthSelected)
      }
    console.log(searchKey)
    const records = await Record.find(searchKey).populate('categoryId').sort({ date: 'desc' }).lean()

    // 調整時間格式 > 計算總金額 > 渲染畫面
    getFormatDate(records)
    const totalAmount = getTotalAmount(records)
    return res.render('index', { records, categories, totalAmount, categoryIdSelected, keyword, monthSelected })
  } catch (error) {
    return console.log(error)
  }
})

module.exports = router
