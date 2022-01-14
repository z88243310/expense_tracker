const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const getFormatDate = require('../../tools/getFormatDate')
const getTotalAmount = require('../../tools/getTotalAmount')
const getAllYears = require('../../tools/getAllYears')
const getAllMonths = require('../../tools/getAllMonths')

router.get('/', async (req, res) => {
  // 設定 edit_msg , delete_msg訊息
  res.locals.edit_msg = req.flash('edit_msg')
  res.locals.edit_id = req.flash('edit_id')
  res.locals.delete_msg = req.flash('delete_msg')
  res.locals.delete_id = req.flash('delete_id')

  const userId = req.user._id
  // search keyword & categoryId selected
  const keyword = req.query.keyword ? req.query.keyword.trim() : ''
  const categoryIdSelected = req.query.categoryIdSelected || ''
  const monthSelected = req.query.monthSelected || ''
  const yearSelected = req.query.yearSelected || ''
  const year = { start: 1900, end: 3000 }

  try {
    const categories = await Category.find().lean()
    // 列入篩選條件
    const searchKey = { userId }
    if (keyword) searchKey.name = { $regex: keyword }
    if (categoryIdSelected) searchKey.categoryId = categoryIdSelected
    if (yearSelected) {
      year.start = yearSelected
      year.end = yearSelected
      searchKey.date = {
        $gte: new Date(year.start, 0),
        $lte: new Date(year.end, 12)
      }
    }
    if (monthSelected)
      searchKey.date = {
        $gte: new Date(year.start, monthSelected - 1),
        $lte: new Date(year.end, monthSelected)
      }
    const records = await Record.find(searchKey).populate('categoryId').sort({ date: 'desc' }).lean()
    const allRecords = await Record.find({ userId }).lean()

    // 調整時間格式 > 計算總金額 > 渲染畫面
    getFormatDate(records)
    const totalAmount = getTotalAmount(records)
    const allYears = getAllYears(allRecords)
    const allMonths = getAllMonths(allRecords, yearSelected)
    return res.render('index', { records, categories, totalAmount, categoryIdSelected, keyword, monthSelected, yearSelected, allYears, allMonths })
  } catch (error) {
    return console.log(error)
  }
})

module.exports = router
