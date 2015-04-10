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
    it('should be able to load item list from a txt file', function() {
      cart.loadItemListTxt(path.join(__dirname, '../assets/itemlist.txt'));
      cart.itemlist.length.should.above(0)
    })
    it('should be able to load discount list from a txt file', function() {
      cart.loadDiscountListTxt(path.join(__dirname, '../assets/discount_promotion.txt'));
      cart.discountList.length.should.above(0)
    })
    it('should be able to load second half list from a txt file', function() {
      cart.loadSecondHalfListTxt(path.join(__dirname, '../assets/second_half_price_promotion.txt'));
      cart.secondHalfList.length.should.above(0)
    })
  })

  describe('behavior', function() {
    beforeEach(function() {
      cart.loadCartTxt(path.join(__dirname, '../assets/cart.txt'));
      cart.loadItemListTxt(path.join(__dirname, '../assets/itemlist.txt'));
    })
    it('should be able to init cart item with number and price', function() {
      cart.initCart()
      cart.cartItems.length.should.above(0)
      cart.cartItems[0].number.should.be.ok
      cart.cartItems[0].price.should.be.ok
    })
    it('should be able to init cart item with second half promotions', function() {
      cart.loadSecondHalfListTxt(path.join(__dirname, '../assets/second_half_price_promotion.txt'));
      cart.loadDiscountListTxt(path.join(__dirname, '../assets/discount_promotion.txt'));
      cart.initCart()
      cart.cartItems[0].promotions.length.should.equal(2)
      cart.cartItems[0].count().should.equal(120)
      cart.cartItems[2].promotions.length.should.equal(1)
      cart.cartItems[2].count().should.equal(75)
    })
    it('should be able to print cart info', function() {
      cart.loadSecondHalfListTxt(path.join(__dirname, '../assets/second_half_price_promotion.txt'));
      cart.loadDiscountListTxt(path.join(__dirname, '../assets/discount_promotion.txt'));
      cart.initCart()
      cart.print().should.be.containEql('购物明细（数量 单价 小计）')
      cart.print().should.be.containEql('ITEM000001  5  40  120')
      cart.print().should.be.containEql('ITEM000003  2  50  75')
      cart.print().should.be.containEql('ITEM000005  4  60  216')
      cart.print().should.be.containEql('总计金额（优惠前  优惠后  优惠差价）')
      //cart.print().should.be.containEql('411  540  411 129')
    })
  })
})
