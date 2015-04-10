var Item = require('../lib/Item')

describe('Item', function() {
  var item
  describe('init', function() {
    it('should be able to init with a id', function() {
      item = new Item({id: '123'})     
      item.id.should.be.equal('123')
    })
  })
  describe('behavior', function() {
    beforeEach(function() {
      item = new Item({id: 'ITEM000001'})
    })

    it('should be able to set number', function() {
      item.setNumber(1)
      item.number.should.be.equal(1)
    })

    it('should be able to set price', function() {
      item.setPrice(100)
      item.price.should.be.equal(100)
    })

    it('should be able to get count price', function() {
      item.setNumber(100)
      item.setPrice(100)
      item.count().should.be.equal(100 * 100)
    })
    it('should be able to load a promotion method and bind this', function() {
      item.setNumber(100)
      item.setPrice(100)
      item.loadPromotion(function(price) {
        item.should.be.equal(this)
        return price/2
      })
      item.count().should.be.equal(100 * 100 / 2)
    })
    it('should be able to load multiple promotions method', function() {
      item.setNumber(100)
      item.setPrice(100)
      item.loadPromotion(function(price) {
        price.should.be.equal(100)
        item.should.be.equal(this)
        return price/2
      })
      item.loadPromotion(function(price) {
        price.should.be.equal(50)
        item.should.be.equal(this)
        return price/2
      })

      item.count().should.be.equal(100 * 100 / 4)
    })
  })
})
