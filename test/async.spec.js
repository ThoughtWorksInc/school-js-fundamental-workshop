describe.skip('Async Function', function() {
  it('should have a callback to return its status or values', function(done) {
    this.timeout(3000)
    function delay(callback, arg) {
      setTimeout(function() {
        callback && callback(arg)
      }, 2000)
    }
    function job(arg) {
      arg.should.be.equal('finished')
      done()
    }
    delay(job, 'finished')
  })
})
