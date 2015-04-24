"use strict";
var React = require( "react" );
var map = require( "lodash/collection/map" );

var Facets = React.createClass( {
  render : function() {
    var results = this.props.results;
    var helper = this.props.helper;
    var facets = map( results.facets, function( facet ) {
      
    }, this );

    return <div className="">{ facets }</div>;
  },
} );

module.exports = Facets;
