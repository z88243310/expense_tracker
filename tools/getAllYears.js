const moment = require('moment')

module.exports = records => {
  const years = []
  records.forEach(record => {
    const year = moment(record.date).format('YYYY')
    if (years.includes(year)) return
    years.push(year)
  })
  years.sort()
  return years
}
