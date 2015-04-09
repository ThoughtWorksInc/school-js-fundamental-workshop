var path = require('path')
var Cart = require('../lib/Cart')

var cart
describe('Cart', function() {

  beforeEach(function() {
    cart = new Cart();
  })

  describe('init', function() {
    it('should be able to load cart item from a txt file', function() {
      cart.loadCartTxt(path.join(__dirname, '../assets/cart.txt'));
      cart.items.length.should.above(0)
    })
  })

  describe('behavior', function() {
    beforeEach(function() {
      cart.loadCartTxt(path.join(__dirname, '../assets/cart.txt'));
    })
    it('should be able to print cart info', function() {
      cart.print().should.be.containEql('购物明细（数量 单价 小计）')
    })
  })
})
