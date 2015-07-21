"use strict";
var React = require( "react" );
var map = require( "lodash/collection/map" );
var order = require( "../order" );

var DisjunctiveFacet = React.createClass( {
  render : function() {
    var facet = this.props.facet;
    var helper = this.props.helper;
    var sort = this.props.sort;
    var titleLabel = this.props.titleLabel || facet.name;

    var title = <h2 className="panel-title">{ titleLabel }</h2>;

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
      var activeClass = facetValue.isRefined ? " active" : "";
      var className = "list-group-item" + activeClass;
      return <a href="#"
                key={ facet.name + facetValue.name }
                className={ className }
                onClick={ this.toggleSelect.bind( this, facet.name, facetValue.name ) }>
               <input type="checkbox"
                      onClick={ function( e ) { e.preventDefault(); } }
                      checked={ facetValue.isRefined }
                      readOnly/>
               { facetValue.name } ({ facetValue.value })
             </a>;
    }, this );

    return <div className="panel panel-default">
             <div className="panel-heading">{ title }</div>
             <div className="list-group">{values}</div>
           </div>;
  },
  toggleSelect : function( facetName, facetValue, event ) {
    event.preventDefault();
    this.props.helper.toggleRefine( facetName, facetValue ).search();
  }
} );

module.exports = DisjunctiveFacet;
