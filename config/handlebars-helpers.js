module.exports = {
  ifCond: function (a, b, options) {
    if (JSON.stringify(a) === JSON.stringify(b)) {
      return options.fn(this)
    }
    return options.inverse(this)
  }
}
