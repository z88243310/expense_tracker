const categorySelect = document.querySelector('#category-select')
const searchInput = document.querySelector('#search-input')

// 當 categorySelect 改變時，發送 request categoryIdSelected & keyword
categorySelect.addEventListener('change', function onCategorySelectChanged(event) {
  const target = event.target
  const categoryIdSelected = target.value
  const keyword = searchInput.value
  location.replace(`/?categoryIdSelected=${categoryIdSelected}&keyword=${keyword}`)
})

// 去除 特殊符號
searchInput.addEventListener('keyup', function onSearchInputKeyUP(event) {
  const target = event.target
  target.value = target.value.replace(/[\(\)]|[\[\]]|[\\\?\+\*]/g, '')
})
