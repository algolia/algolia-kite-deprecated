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
    if( results && results.hits && results.hits.length > 0 ){
      var renderedResults = map( results.hits, function( r ) {
        return <Hogan data={ r } key={ r.objectID } template={ this.props.hitTemplate } />;
      }, this );
      return <div className="search_list search_results_container row">{ renderedResults }</div>
    }
    else {
      return  <div className="search_list search_results_container row">
                <Hogan data={ results } key={ 42 } template={ this.props.noResultsTemplate } />
              </div>;
    }
  }
}

module.exports = Results;
