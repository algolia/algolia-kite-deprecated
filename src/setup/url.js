var qs = require( "querystring" );

var assign = require( "lodash/object/assign" );
var pick = require( "lodash/object/pick" );
var keys = require( "lodash/object/keys" );
var isEqual = require( "lodash/lang/isEqual" );

var SearchParameters = require( "algoliasearch-helper/src/SearchParameters" );

// FIXME make an object, to cache infos, keep some etc
//
// FIXME fast change >> update url state 
//       slow change >> add new url state
//
// FIXME some state parameters are parsed to number...
//       urlManager.read()
//       Object {page: "0", query: ""}
//       newUrlState
//       Object {page: 0, query: ""}

var urlManager = {
  init : function( urlStateDefaults, stateDefaults ){
    var state = stateDefaults || {};

    // Read the URL
    var urlParams = pick( urlManager.read(), keys( urlStateDefaults ) );

    // Create an updated state with the parameters given by the user
    var updatedURLState = assign( urlParams, urlStateDefaults || {} );
    var updatedStateDef = assign( {}, stateDefaults || {}, updatedURLState );
    var searchState = new SearchParameters( updatedStateDef );

    // Update the url with the computed state
    window.history.replaceState( searchState, "", "?" + qs.stringify( updatedURLState ) )

    // Return the new state
    return searchState;
  },
  update : function( state, urlStateDefaults ){
    var urlStateKeys = keys( urlStateDefaults );
    var newUrlState = pick( state, urlStateKeys );

    if( isEqual( newUrlState, urlManager.read() ) ) {
      return;
    }
    
    window.history.pushState( state, "", "?" + qs.stringify( newUrlState ) );
  },
  read : function() {
    var search = window.location.search.slice( 1 );
    var parameters = qs.parse( search );
    return parameters;
  }
}

module.exports = urlManager;
