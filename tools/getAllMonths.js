const moment = require('moment')

// 篩選出 符合當前年份的所有月份
module.exports = (records, yearSelected) => {
  return records
    .reduce((preMonths, record) => {
      const year = moment(record.date).format('YYYY')
      const month = moment(record.date).format('M')
      if (!preMonths.includes(month) && year === yearSelected) preMonths.push(month)
      return preMonths
    }, [])
    .sort()
}
