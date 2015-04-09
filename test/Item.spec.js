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
  })
})
