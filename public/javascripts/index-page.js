const formSelects = document.querySelectorAll('.form-select')
const searchInput = document.querySelector('#search-input')
const deleteButtons = document.querySelectorAll('.delete-button')
const deleteButtonPhones = document.querySelectorAll('#delete-btn-phone')
const searchIcon = document.querySelector('#search-icon')
const searchBtn = document.querySelector('#search-btn')
const recordLists = document.querySelectorAll('.record-list')
const monthSelect = document.querySelector('#month-select')
const yearSelect = document.querySelector('#year-select')

// editAlert 出現才執行 > 修改後動畫顯示
const editAlert = document.querySelector('#edit-alert')
if (editAlert !== null) {
  const editId = editAlert.dataset.edit_id
  const editBtns = document.querySelectorAll('#edit-btn')
  editBtns.forEach(editBtn => {
    if (editBtn.href.includes(editId)) {
      const recordList = editBtn.closest('.record-list')
      recordList.classList.add('record-list-edit-animation')
    }
  })
}

// createAlert 出現才執行 > 修改後動畫顯示
const createAlert = document.querySelector('#create-alert')
if (createAlert !== null) {
  const createId = createAlert.dataset.create_id
  const editBtns = document.querySelectorAll('#edit-btn')
  editBtns.forEach(editBtn => {
    if (editBtn.href.includes(createId)) {
      const recordList = editBtn.closest('.record-list')
      recordList.classList.add('record-list-create-animation')
    }
  })
}

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

    // 取得項目值
    const recordList = target.closest('.record-list')
    const name = recordList.querySelector('#info-name').innerText
    const date = recordList.querySelector('#info-date').innerText
    const category = recordList.querySelector('.list-icon-block i').dataset.name
    const amount = recordList.querySelector('#list-amount').innerText
    // 提示訊息
    const info = `名稱：${name}\n日期：${date}\n類別：${category}\n金額：${amount}\n\n確定刪除嗎?`
    recordList.classList.remove('record-list-delete-animation')
    if (confirm(info)) {
      // 動畫顯示後送出刪除
      recordList.classList.add('record-list-delete-animation')
      setTimeout(() => {
        target.form.submit()
      }, 200)
    }
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
