var qs = require( "qs" );

var defaults = require( "lodash/object/defaults" );
var pick = require( "lodash/object/pick" );
var keys = require( "lodash/object/keys" );
var isEqual = require( "lodash/lang/isEqual" );
var mapValues = require( "lodash/object/mapValues" );

var SearchParameters = require( "algoliasearch-helper/src/SearchParameters" );

var timerMaker = function( t0 ){
  var t = t0;
  return function(){
    var now = Date.now();
    var delta = now - t;
    t = now;
    return delta;
  };
};

var URLManager = function( urlStateDefaults, stateDefaults, threshold, timer ){
  this.urlStateDefaults = urlStateDefaults || {};
  this.stateDefaults = stateDefaults || {};
  this.threshold = threshold || 1000;
  this.timer = timer || timerMaker( Date.now() );
  this.urlStateKeys = keys( urlStateDefaults );
}

URLManager.prototype.init = function() {
  // Read the URL
  var urlParams = pick( this.read(), keys( this.urlStateDefaults ) );

  // Create an updated state with the parameters given by the user
  var updatedURLState = defaults( urlParams, this.urlStateDefaults );
  var updatedStateDef = defaults( {}, updatedURLState, this.stateDefaults );
  var searchState = new SearchParameters( updatedStateDef );

  // Update the url with the computed state
  window.history.replaceState( searchState, "", "?" + qs.stringify( updatedURLState ) )

  // Return the new state
  return searchState;
};

URLManager.prototype.update = function( state ) {
  var newUrlState = pick( state, this.urlStateKeys );
  var newUrlStateStringified = qs.stringify( newUrlState );
  var currentUrlSearch = window.location.search.slice( 1 );

  if( newUrlStateStringified === currentUrlSearch ) {
    return;
  }

  if( this.timer() < this.threshold ) {
    window.history.replaceState( state, "", "?" + newUrlStateStringified );
  }
  else {
    window.history.pushState( state, "", "?" + newUrlStateStringified );
  }
};

URLManager.prototype.read = function(){
  var search = window.location.search.slice( 1 );
  var parameters = qs.parse( search );
  return parameters;
};

module.exports = URLManager;
