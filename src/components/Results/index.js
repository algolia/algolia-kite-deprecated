"use strict";
var React = require( "react" );
var map = require( "lodash/collection/map" );

var Hogan = require( "../Hogan" );

var paginationLabels = {
  next : "next",
  previous : "previous"
};

class Results extends React.Component {
  render() {
    var results = this.props.results;
    var renderedResults = map( results.hits, function( r ) {
      return <Hogan data={ r } key={ r.objectID } template={ this.props.hitTemplate } />;
    }, this );
    return <div className="search_list search_results_container row">{ renderedResults }</div>
  }
}

module.exports = Results;
