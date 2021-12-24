const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const getFormatDate = require('../../tools/getFormatDate')

router.get('/', async (req, res) => {
  const userId = req.user._id
  try {
    const categories = await Category.find().lean()
    const records = await Record.find({ userId }).populate('categoryId').sort({ date: 'desc' }).lean()
    getFormatDate(records)
    return res.render('index', { records, categories })
  } catch (error) {
    return console.log(error)
  }
})

module.exports = router
