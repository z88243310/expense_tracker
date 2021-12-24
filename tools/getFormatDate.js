const moment = require('moment')

module.exports = records => {
  if (!records.date) {
    records.map(record => {
      record.date = moment(record.date).format('YYYY-MM-DD')
    })
  } else {
    records.date = moment(records.date).format('YYYY-MM-DD')
  }
}
