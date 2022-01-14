const alerts = document.querySelectorAll('.alert')

// 設定 所有 alert 兩秒後消失
alerts.forEach(alert => {
  setTimeout(() => {
    alert.classList.add('d-none')
  }, 2000)
})
