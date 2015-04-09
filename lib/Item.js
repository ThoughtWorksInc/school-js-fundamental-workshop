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

Item.prototype.count = function() {
  if (isNaN(this.number) || isNaN(this.price)) {
    throw new Error('Number or Price does not valid')
    return 0
  }
  return this.number * this.price
}
module.exports = Item
