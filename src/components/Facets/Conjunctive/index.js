"use strict";
var React = require( "react" );
var map = require( "lodash/collection/map" );
var order = require( "../order" );

var Facet = React.createClass( {
  render : function() {
    var facet = this.props.facet;
    var helper = this.props.helper;
    var sort = this.props.sort;

    var title = <h2 className="panel-title">{ facet.name }</h2>;

    var facetValues = map( facet.data, function( nb, facetFilter ) {
      return {
        name : facetFilter,
        isRefined : helper.isRefined( facet.name, facetFilter ),
        value : nb
      };
    } );

    if( sort && order[ sort ] ){
      facetValues.sort( order[ sort ] );
    }

    var values = map( facetValues, function( facetValue ) {
      var activeClass = helper.isRefined( facet.name, facetValue.name ) ? " active" : "";
      var className = "list-group-item" + activeClass;
      return <a href="#"
                className={ className }
                key={ facet.name + facetValue.name }
                onClick={ this.toggleSelect.bind( this, facet.name, facetValue.name ) }>
               { facetValue.name } ({ facetValue.value })
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
