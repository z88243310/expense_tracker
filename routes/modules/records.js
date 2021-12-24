const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const Record = require('../../models/record')
const Category = require('../../models/category')

const getFormatDate = require('../../tools/getFormatDate')

// 新增頁面
router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    return res.render('new', { categories })
  } catch (error) {
    return console.log(error)
  }
})

// 新增
router.post('/new', async (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  const errors = []
  if (!name || !date || !amount || !categoryId) {
    errors.push({ message: '所有欄位都是必填' })
  }
  // 符合以上狀態，直接回傳錯誤
  try {
    if (errors.length) {
      const categories = await Category.find().lean()
      return res.render('new', { errors, name, date, amount, categoryId, categories })
    }
    await Record.create({ name, date, amount, userId, categoryId })
    return res.redirect('/')
  } catch (error) {
    return console.log(error)
  }
})

// 編輯頁面
router.get('/edit/:id', async (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  try {
    const categories = await Category.find().lean()
    const record = await Record.findOne({ _id, userId }).lean()
    getFormatDate(record)
    return res.render('edit', { ...record, _id, categories })
  } catch (error) {
    return console.log(error)
  }
})

// 編輯
router.put('/edit/:id', async (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  const errors = []
  if (!name || !date || !amount || !categoryId) {
    errors.push({ message: '所有欄位都是必填' })
  }
  // 符合以上狀態，直接回傳錯誤
  try {
    if (errors.length) {
      const categories = await Category.find().lean()
      return res.render('new', { errors, name, date, amount, categoryId, categories })
    }
    //  找出紀錄 覆寫存檔
    const record = await Record.findOne({ _id, userId })
    await Object.assign(record, req.body).save()
    return res.redirect('/')
  } catch (error) {
    return console.log(error)
  }
})

// 刪除資料
router.delete('/delete/:id', async (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  try {
    await Record.deleteOne({ _id, userId })
    return res.redirect('/')
  } catch (error) {
    return console.log(error)
  }
})

module.exports = router
