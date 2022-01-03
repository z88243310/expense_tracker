const formSelects = document.querySelectorAll('.form-select')
const searchInput = document.querySelector('#search-input')
const deleteButtons = document.querySelectorAll('#delete-btn')
const deleteButtonPhones = document.querySelectorAll('#delete-btn-phone')
const searchIcon = document.querySelector('#search-icon')
const searchBtn = document.querySelector('#search-btn')
const recordLists = document.querySelectorAll('.record-list')
const formDeletePhone = document.querySelector('#form-delete-phone')
const formDelete = document.querySelector('#form-delete')

// 當 form Select 改變時，提交表單
formSelects.forEach(formSelect => {
  formSelect.addEventListener('change', function onFormSelectChanged(event) {
    const target = event.target
    target.parentElement.parentElement.submit()
  })
})

// 去除 特殊符號
searchInput.addEventListener('keyup', function onSearchInputKeyUP(event) {
  const target = event.target
  target.value = target.value.replace(/[\(\)]|[\[\]]|[\\\?\+\*]/g, '')
})

// 刪除再次確認
deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', function onDeleteButtonClicked(event) {
    event.preventDefault()
    if (confirm('確定刪除嗎?')) formDelete.submit()
  })
})
// 刪除再次確認
deleteButtonPhones.forEach(deleteButtonPhone => {
  deleteButtonPhone.addEventListener('click', function onDeleteButtonClicked(event) {
    event.preventDefault()
    if (confirm('確定刪除嗎?')) formDeletePhone.submit()
  })
})
// 點擊 X，清除輸入文字
searchIcon.addEventListener('click', function onSearchIconClicked(event) {
  searchInput.value = ''
  searchBtn.form.submit()
})

// record-list show edit and delete button
let timer
recordLists.forEach(recordList => {
  recordList.addEventListener('click', function onRecordListClicked(event) {
    // 螢幕 550px 以下
    if (document.body.clientWidth < 550) {
      clearTimeout(timer)
      const editDisplay = this.querySelector('.edit-btn-phone-block')
      const deleteDisplay = this.querySelector('.form-delete-phone-block')

      // 同個項目，直接清除按鈕
      if (editDisplay.style.display === 'block') {
        editDisplay.style.display = 'none'
        deleteDisplay.style.display = 'none'
      }

      // 不同項目，清除全部按鈕，顯示按鈕在項目上，一段時間後自動清除
      else {
        recordLists.forEach(recordList => {
          recordList.querySelector('.edit-btn-phone-block').style.display = 'none'
          recordList.querySelector('.form-delete-phone-block').style.display = 'none'
        })
        this.querySelector('.edit-btn-phone-block').style.display = 'block'
        this.querySelector('.form-delete-phone-block').style.display = 'block'
        timer = setTimeout(() => {
          this.querySelector('.edit-btn-phone-block').style.display = 'none'
          this.querySelector('.form-delete-phone-block').style.display = 'none'
        }, 3000)
      }
    }
  })
})
