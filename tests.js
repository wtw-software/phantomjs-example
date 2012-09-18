
describe("I18N", function() {

  it("is a function returning an object with two function get and set mapping to that language pack", function() {

    I18N( "EN" ).set( 'hi', 'hi' )
    I18N( "NO" ).set( 'hi', 'hei' )

    expect( I18N( "EN" ).get( 'hi' ) ).to.equal( 'hi' )
    expect( I18N( "NO" ).get( 'hi' ) ).to.equal( 'hei' )

  })

  it("should return null if the key is not set for that language pack", function() {

    //will fail as that language pack is not defined.
    expect( I18N( "FIN" ).get( 'lol' ) ).to.equal( 'Laughing out loud' )    

  })

});