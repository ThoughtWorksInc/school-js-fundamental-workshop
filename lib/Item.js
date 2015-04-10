function Item(options) {
  if (!options.id) throw new TypeError('No id in the options')
  this.id = options.id
}

Item.prototype.setNumber = function(number) {
  this.number = Number(number, 10)
}

Item.prototype.setPrice = function(price) {
  this.price = Number(price, 10)
}

Item.prototype.loadPromotion = function(promote) {
  this.promotions = this.promotions || []
  this.promotions.push(promote.bind(this))
}

Item.prototype.count = function() {
  if (isNaN(this.number) || isNaN(this.price)) {
    throw new Error('Number or Price does not valid')
    return 0
  }
  var price = this.price
  if (this.promotions && this.promotions.length) {
    price = this.promotions.reduce(function(result, promote) {
      return promote(result)
    }, price)
  }
  return this.number * price
}
module.exports = Item
