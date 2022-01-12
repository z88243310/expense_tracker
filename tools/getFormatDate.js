const moment = require('moment')

module.exports = records => {
  records.forEach(record => {
    record.date = moment(record.date).format('YYYY-MM-DD')
  })
}
