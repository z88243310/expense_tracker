const moment = require('moment')

module.exports = records => {
  return records
    .reduce((preYears, record) => {
      const year = moment(record.date).format('YYYY')
      if (!preYears.includes(year)) preYears.push(year)
      return preYears
    }, [])
    .sort()
}
