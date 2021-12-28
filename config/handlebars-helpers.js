module.exports = {
  ifCond: function (a, b, options) {
    if (String(a) === String(b)) {
      return options.fn()
    }
    return options.inverse()
  },
  times: function (n, options) {
    let count = ''
    for (let i = 1; i <= n; i++) {
      count += options.fn(i)
    }
    return count
  }
}
