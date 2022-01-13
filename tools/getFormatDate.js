const moment = require('moment')

module.exports = records => {
  // 陣列處理
  if (Array.isArray(records)) {
    records.forEach(record => {
      record.date = moment(record.date).format('YYYY-MM-DD')
    })
  }
  // 單數處理
  else {
    records.date = moment(records.date).format('YYYY-MM-DD')
  }
}
