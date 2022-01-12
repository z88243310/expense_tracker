const moment = require('moment')

module.exports = records => {
  const months = []
  records.forEach(record => {
    const month = moment(record.date).format('M')
    if (months.includes(month)) return
    months.push(month)
  })
  months.sort()
  return months
}
