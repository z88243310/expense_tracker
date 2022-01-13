const moment = require('moment')

// 篩選出 符合當前年份的所有月份
module.exports = (records, yearSelected) => {
  const months = []
  records.forEach(record => {
    const year = moment(record.date).format('YYYY')
    const month = moment(record.date).format('M')
    if (months.includes(month) || year !== yearSelected) return
    months.push(month)
  })
  months.sort()
  return months
}
