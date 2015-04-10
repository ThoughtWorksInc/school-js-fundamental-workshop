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
Cart.prototype.loadDiscountListTxt = function(filename) {
  var txt = fs.readFileSync(filename).toString()
  this.discountList = parseTxtToArray(txt).map(function(item) {
    var itemInfo = item.split(':')
    return {
      id: itemInfo[0],
      value: Number(itemInfo[1])
    }
  })
}
Cart.prototype.isDiscount = function(id) {
  if(!this.discountList) return null

  var i = 0
  var len = this.discountList.length
  for(;i < len; i++) {
    if (this.discountList[i].id === id) {
      return this.discountList[i].value
    }
  }
  return null
}
Cart.prototype.loadSecondHalfListTxt = function(filename) {
  var txt = fs.readFileSync(filename).toString()
  this.secondHalfList = parseTxtToArray(txt).map(function(item) {
    return {
      id: item
    }
  })
}
Cart.prototype.isSecondHalf = function(id) {
  if(!this.secondHalfList) return null

  var i = 0
  var len = this.secondHalfList.length
  for(;i < len; i++) {
    if (this.secondHalfList[i].id === id) {
      return true
    }
  }
  return null
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
    var discountValue = self.isDiscount(item.id)
    var isSecondHalf = self.isSecondHalf(item.id)

    cartItem.setNumber(item.number)
    cartItem.setPrice(self.getPriceById(item.id))
    if (discountValue !== null) {
      cartItem.loadPromotion(function(price) {
        return price * discountValue / 100
      })
    }
    if (isSecondHalf) {
      cartItem.loadPromotion(function(price) {
        var half = Math.floor(this.number / 2)
        return (price * this.number - price * half / 2) / this.number
      })
    }
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
