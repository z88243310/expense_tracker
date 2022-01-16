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
      target.form.submit()
    }
  })
})

// 點擊 X，清除輸入文字
searchIcon.addEventListener('click', function onSearchIconClicked(event) {
  searchInput.value = ''
  searchBtn.form.submit()
})

// record-list refocus to show edit and delete button animation
let activeElementId
recordLists.forEach(recordList => {
  recordList.addEventListener('click', function onRecordListClicked(event) {
    const target = event.target
    const recordListClicked = target.closest('.record-list')
    const nowElementId = recordListClicked.dataset.id

    // 跟上次同一個元素，則重新聚焦
    if (activeElementId === nowElementId) {
      recordListClicked.blur()
      recordListClicked.focus()
    }
    // 紀錄當次 id，下次確認是否為同一元素
    activeElementId = document.activeElement.dataset.id
  })
})
