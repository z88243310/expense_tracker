const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const Record = require('../../models/record')
const Category = require('../../models/category')

const getFormatDate = require('../../tools/getFormatDate')
const moment = require('moment')

// 新增頁面
router.get('/new', async (req, res) => {
  const referer = req.headers.referer
  try {
    const categories = await Category.find().lean()
    return res.render('new', { categories, referer })
  } catch (error) {
    return console.log(error)
  }
})

// 新增
router.post('/new', async (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount, referer } = req.body
  const errors = []
  if (!name || !date || !amount || !categoryId) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (moment().format('YYYY-MM-DD') < date) {
    errors.push({ message: '不能輸入未來日期' })
  }
  // 符合以上狀態，直接回傳錯誤
  try {
    if (errors.length) {
      const categories = await Category.find().lean()
      return res.render('new', { errors, name, date, amount, categoryId, categories, referer })
    }
    const record = await Record.create({ name, date, amount, userId, categoryId })
    // 傳遞id
    req.flash('new_msg', `${name} 新增成功`)
    req.flash('new_id', record._id)
    return res.redirect(referer)
  } catch (error) {
    return console.log(error)
  }
})

// 編輯頁面
router.get('/edit/:id', async (req, res) => {
  const referer = req.headers.referer
  const _id = req.params.id
  const userId = req.user._id
  try {
    const categories = await Category.find().lean()
    const record = await Record.findOne({ _id, userId }).lean()
    getFormatDate(record)
    return res.render('edit', { ...record, _id, categories, referer })
  } catch (error) {
    return console.log(error)
  }
})

// 編輯
router.put('/edit/:id', async (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, date, categoryId, amount, referer } = req.body
  const errors = []
  if (!name || !date || !amount || !categoryId) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (moment().format('YYYY-MM-DD') < date) {
    errors.push({ message: '不能輸入未來日期' })
  }
  // 符合以上狀態，直接回傳錯誤
  try {
    if (errors.length) {
      const categories = await Category.find().lean()
      return res.render('edit', { errors, _id, name, date, amount, categoryId, categories, referer })
    }
    //  找出紀錄 覆寫存檔
    const record = await Record.findOne({ _id, userId })
    await Object.assign(record, req.body).save()
    // 傳遞id
    req.flash('edit_msg', `${name} 修改成功`)
    req.flash('edit_id', _id)
    return res.redirect(referer)
  } catch (error) {
    return console.log(error)
  }
})

// 刪除資料
router.delete('/delete/:id', async (req, res) => {
  const { name } = req.body
  const _id = req.params.id
  const userId = req.user._id
  try {
    await Record.deleteOne({ _id, userId })
    // 傳遞id
    req.flash('delete_msg', `${name} 刪除成功`)
    req.flash('delete_id', _id)
    return res.redirect(req.headers.referer)
  } catch (error) {
    return console.log(error)
  }
})

module.exports = router
