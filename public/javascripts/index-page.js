const formSelects = document.querySelectorAll('.form-select')
const searchInput = document.querySelector('#search-input')
const deleteButtons = document.querySelectorAll('#delete-btn')
const searchIcon = document.querySelector('#search-icon')
const searchBtn = document.querySelector('#search-btn')

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
    const target = event.target
    event.preventDefault()
    if (confirm('確定刪除嗎?')) target.parentElement.submit()
  })
})

// 點擊 X，清除輸入文字
searchIcon.addEventListener('click', function onSearchIconClicked(event) {
  searchInput.value = ''
  searchBtn.form.submit()
})
