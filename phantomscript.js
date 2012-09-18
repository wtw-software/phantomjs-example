
var page = new WebPage();

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
  console.log(msg);
};

// async waitFor
// each 100ms it runs the test function, if it returns true it calls the then callback
// we use this to check for the finished variable in the test script
function waitFor( test, then ) {
  var intervall
  intervall = setInterval(function() {
    var data
    data = test()
    if( data ) {
      clearInterval( intervall )
      then( data )
    }
  }, 100)
}

var urlOrPath = phantom.args[0]

// open the page based on the first parameter(urOrPath) given to script
page.open(urlOrPath, function(status){

  if (status !== "success") {

    console.log("Unable to access network");
    phantom.exit();

  } else {
    
    // wait for TESTSTATS.finished to be true
    waitFor(function() {
      return page.evaluate(function(){
        var stats = window.TESTSTATS
        if( stats && stats.error )
          return { error: stats.error }
        if( stats && stats.finnished )
          return stats.data
        else
          return null
      });
    }, function( data ) {

      if( data.error ) {
        phantom.exit( 1 )
      }

      // log stats
      console.log('\n');
      console.log('passes: ', data.passes.length);
      console.log('failures: ', data.failures.length);
      console.log('\n');

      if(data.failures.length) {
        // if the where errors lets exit with 1 so we can tell the executor that it failed
        phantom.exit( 1 )
      } else {
        phantom.exit( 0 )
      }

    })

  }
});