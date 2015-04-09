describe('Closure', function() {
  it('should remember its scope', function() {
    var bread = 'bread';
    var fetchBread = function() {
      return bread
    }
    var runingShop = function() {
      var freshBread = 'freshBread';
      return {
        fetch: function() {
          return freshBread
        }
      }
    }
    var shop = runingShop();
    fetchBread().should.be.equal(bread);
    shop.fetch().should.be.equal('freshBread')
  })
})
