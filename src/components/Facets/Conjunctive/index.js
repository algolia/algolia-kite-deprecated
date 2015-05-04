"use strict";
var React = require( "react" );
var map = require( "lodash/collection/map" );

var Facet = React.createClass( {
  render : function() {
    var facet = this.props.facet;
    var helper = this.props.helper;

    var title = <h2 className="panel-title">{ facet.name }</h2>;

    var values = map( facet.data, function( nb, facetFilter ) {
      var activeClass = helper.isRefined( facet.name, facetFilter ) ? " active" : "";
      var className = "list-group-item" + activeClass;
      return <a href="#"
                className={ className }
                key={ facet.name + facetFilter }
                onClick={ this.toggleSelect.bind( this, facet.name, facetFilter ) }>
               { facetFilter } ({nb})
             </a>;
    }, this );

    return <div className="panel panel-default">
             <div className="panel-heading">{ title }</div>
             <div className="list-group">{values}</div>
           </div>;
  },
  toggleSelect : function( facetName, facetValue ) {
    this.props.helper.toggleRefine( facetName, facetValue ).search();
  }
} );

module.exports = Facet;
