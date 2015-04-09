var fs = require('fs')
var Item = require('./Item')

function Cart() {
}

Cart.prototype.loadCartTxt = function(filename) {
  var txt = fs.readFileSync(filename).toString()
  this.items = parseTxtToArray(txt).map(function(item) {
    var itemInfo = item.split('-')
    return {
      id: itemInfo[0],
      number: Number(itemInfo[1]) || 1
    }
  }).reduce(function(result, item) {
    var i = 0
    var len = result.length
    for(; i < len; i++) {
      if (item.id === result[i].id) {
        result[i].number += item.number
        return result
      }
    }
    result.push(item)
    return result
  }, [])
}
Cart.prototype.loadItemListTxt = function(filename) {
  var txt = fs.readFileSync(filename).toString()
  this.itemlist = parseTxtToArray(txt).map(function(item) {
    var itemInfo = item.split(':')
    return {
      id: itemInfo[0],
      price: itemInfo[1]
    }
  })
}
Cart.prototype.initCart = function() {
  if (!this.items || !this.items.length) {
    throw new Error('items not loaded')
    return
  }
  if (!this.itemlist || !this.itemlist.length) {
    throw new Error('itemlist not loaded')
    return
  }
  var self = this
  this.cartItems = self.items.map(function(item) {
    var cartItem = new Item({
      id: item.id
    })
    cartItem.setNumber(item.number)
    cartItem.setPrice(self.getPriceById(item.id))
    return cartItem
  })
}
Cart.prototype.getPriceById = function(id) {
  var i = 0
  var len = this.itemlist.length
  for(; i < len; i++) {
    if (this.itemlist[i].id === id) {
      return this.itemlist[i].price
    }
  }
}
Cart.prototype.print = function() {
  var printInfo = ['购物明细（数量 单价 小计）']
  this.cartItems.forEach(function(item) {
    printInfo.push([
      item.id, item.number, item.price, item.count()
    ].join('  '));
  })

  printInfo.push('总计金额（优惠前  优惠后  优惠差价）')
  //TODO insert cart summary

  return printInfo.join('\n')
}
function parseTxtToArray(txt) {
  return txt.split('\n').filter(function(item) {
    return !!item
  })
}
module.exports = Cart
