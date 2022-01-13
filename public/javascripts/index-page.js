const formSelects = document.querySelectorAll('.form-select')
const searchInput = document.querySelector('#search-input')
const deleteButtons = document.querySelectorAll('.delete-button')
const deleteButtonPhones = document.querySelectorAll('#delete-btn-phone')
const searchIcon = document.querySelector('#search-icon')
const searchBtn = document.querySelector('#search-btn')
const recordLists = document.querySelectorAll('.record-list')
const monthSelect = document.querySelector('#month-select')
const yearSelect = document.querySelector('#year-select')

// 當 form Select 改變時，提交表單
formSelects.forEach(formSelect => {
  formSelect.addEventListener('change', function onFormSelectChanged(event) {
    const target = event.target
    if (target.matches('#year-select')) {
      const children = Array.from(monthSelect.children)
      children.forEach((option, index) => {
        if (index === 0) return
        option.remove()
      })
    }
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
    const target = event.target
    if (confirm('確定刪除嗎?')) target.form.submit()
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
