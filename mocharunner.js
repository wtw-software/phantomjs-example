
mocha.setup( 'bdd' )

$(function(){

  window.TESTSTATS = {
    data: {
      passes: [],
      failures: []
    }
  }

  // run all the tests
  // declare TESTSTATS as global so mocha dont complain about it
  var runner = mocha.run().globals([ 'I18N' ])


  // when a test pass, push it to the stats passes array
  // and log that the test succeded
  runner.on('pass', function(test){
    TESTSTATS.data.passes.push({
      title: test.fullTitle()
    })
    console.log('PASSED: ', test.fullTitle());
  });

  // when a test fails, push it to the stats failiures array
  // and log that the test failed
  runner.on('fail', function(test, err){
    TESTSTATS.data.failures.push({
      title: test.fullTitle(),
      err: err.message
    })
    console.log('FAILED: ', test.fullTitle());
  });

  // when all tests have ben run declare in stats that we are finished
  runner.on('end', function(){
    TESTSTATS.finnished = true
  })

})