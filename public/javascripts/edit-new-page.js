const dateInput = document.querySelector('#date')
const form = document.querySelector('.form-horizontal')

// 取得當前日期，並調整格式為 "YYYY-MM-DD"
const dateNow = new Date()
const year = dateNow.getFullYear()
const month = (dateNow.getMonth() + 1).toString().padStart(2, '0')
const date = dateNow.getDate().toString().padStart(2, '0')
const dateFormatted = year + '-' + month + '-' + date

// 將 日期輸入框 預設最大值 設定為 當前日期
dateInput.max = dateFormatted

// 新增項目時，將 預設值 設定為 當前日期
if (form.action.includes('new')) dateInput.value = dateFormatted
