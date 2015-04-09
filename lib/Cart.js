var fs = require('fs')

function Cart() {
}

Cart.prototype.loadCartTxt = function(filename) {
  var txt = fs.readFileSync(filename).toString()
  this.items = txt.split('\n')
}
Cart.prototype.print = function() {
  var printInfo = ['购物明细（数量 单价 小计）']
  //TODO insert cart info

  printInfo.push('总计金额（优惠前  优惠后  优惠差价）')
  //TODO insert cart summary

  return printInfo.join('\n')
}
module.exports = Cart
