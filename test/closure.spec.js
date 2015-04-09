describe('closure test cases', function() {
  it('a closure should remember its scope', function() {
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
  it('closure should remember its scope in a circulate', function() {
    var doms = [{name:'div'}, {name:'p'}, {name:'span'}, {name:'img'}];
    var i, len = doms.length;
    for(i = 0; i < len; i++) {
      //closure can craet a temp scope saving changing variables
      doms[i].onchange = (function(index) {
        return function() {
          return index
        }
      })(i)
    }

    for(j = 0; j < len; j++) {
      doms[j].onchange().should.be.equal(j)
    }
  })
})
