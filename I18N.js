;(function( global ) {

  global.I18N = function( lang ) {
    return {
      set: function( key, val ) {
        return set( lang, key, val )
      },
      get: function( key ) {
        return get( lang, key )
      }
    }
  }

  var map = {}

  function set( lang, key, val ) {
    if( !map[lang] )
      map[ lang ] = {}

    map[ lang ][ key ] = val
  }

  function get( lang, key ) {
    return map[ lang ][ key ]
  }

})( window );
