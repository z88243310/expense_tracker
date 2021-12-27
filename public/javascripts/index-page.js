const categorySelect = document.querySelector('#category-select')

categorySelect.addEventListener('change', function onCategorySelectChanged(event) {
  const target = event.target
  const categoryIdSelected = target.value
  location.replace(`/?categoryIdSelected=${categoryIdSelected}`)
})
