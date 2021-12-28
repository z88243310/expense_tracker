module.exports = {
  ifCond: function (a, b, options) {
    if (String(a) === String(b)) {
      return options.fn()
    }
    return options.inverse()
  },
  times: function (start, end, options) {
    let count = ''
    for (let i = start; i <= end; i++) {
      count += options.fn(i)
    }
    return count
  }
}
