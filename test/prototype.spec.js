describe('Prototype', function() {
  it('should effect all the instances', function() {
    function Human() {}
    Human.prototype.say = function() {
      return 'Hello'
    }
    var Tom = new Human();
    
    Human.prototype.sing = function() {
      return 'Ha'
    }

    Tom.say().should.be.equal('Hello')
    Tom.sing().should.be.equal('Ha')
  })

  it('should pass to the child class', function() {
    function Human() {}
    Human.prototype.say = function() {
      return 'Hello'
    }

    function Child() {
      Human.call(this)
    }
    Child.prototype = Human.prototype
    Child.prototype.sing = function() {
      return 'Wa'
    }

    var Sam = new Child()
    Sam.say().should.be.equal('Hello')
    Sam.sing().should.be.equal('Wa')
  })
})
