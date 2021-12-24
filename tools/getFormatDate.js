const moment = require('moment')

module.exports = records => {
  records.map(record => (record.date = moment(record.date).format('YYYY-MM-DD')))
}
