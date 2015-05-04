"use strict";
var React = require( "react" );
var map = require( "lodash/collection/map" );

var DisjunctiveFacet = React.createClass( {
  render : function() {
    var facet = this.props.facet;
    var helper = this.props.helper;

    var title = <h2 className="panel-title">{ facet.name }</h2>;

    var values = map( facet.data, function( nb, facetFilter ) {
      var isRefined = helper.isRefined( facet.name, facetFilter );
      var activeClass = isRefined ? " active" : "";
      var className = "list-group-item" + activeClass;
      return <a href="#"
                key={ facet.name + facetFilter }
                className={ className }
                onClick={ this.toggleSelect.bind( this, facet.name, facetFilter ) }>
               <input type="checkbox"
                      onClick={ function( e ) { e.preventDefault(); } }
                      checked={ isRefined }/>
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

module.exports = DisjunctiveFacet;
