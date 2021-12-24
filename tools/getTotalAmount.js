module.exports = records => {
  let totalAmount = 0
  if (!records.amount) {
    records.forEach(record => {
      totalAmount += record.amount
    })
    return totalAmount
  } else {
    return (totalAmount = records.amount)
  }
}
