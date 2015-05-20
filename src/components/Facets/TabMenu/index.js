"use strict";
var React = require( "react" );
var cx = require( "classnames" );
var forEach = require( "lodash/collection/forEach" );
var sortBy = require( "lodash/collection/sortBy" );
var map = require( "lodash/collection/map" );
var bem = require( "../../BemHelper" )( "algolia-magic-tab-menu" );

// TODO: We should handle i18n in a much better way.
var facetAllValue = "All";

var TabMenu = React.createClass( {
  _getKey : function _getKey( facet ) {
    return [
      "algolia-tab-menu",
      this.props.facet.name,
      facet.value
    ].join( "-" );
  },
  _getCategories : function _getCategories( facets ) {
    var results = [];
    var allCount = 0;
    forEach( facets, function( count, value ) {
      results.push( {value : value, count : count} );
      allCount += count;
    } );
    results = sortBy( results, "count" ).reverse();
    results.unshift( {value : facetAllValue, count : allCount} );
    return results;
  },
  _getActiveTab : function _getActiveTab() {
    var facetName = this.props.facet.name;
    var refinements = this.props.helper.state.disjunctiveFacetsRefinements[facetName];
    if ( !refinements ) {
      return facetAllValue;
    }
    return refinements[0];
  },
  render : function() {
    var self = this;
    var facets = self._getCategories( this.props.facet.data );

    var lis = map( facets, function( facet ) {
      var uniqueKey = self._getKey( facet );
      var onChange = self.onChange.bind( self, facet.value );

      var className = {};
      className[bem( "item" )] = true;
      className[bem( "item", "active" )] = ( facet.value === self._getActiveTab() );
      className = cx( className );

      return (
        <li className={className} key={uniqueKey} onClick={onChange}>
          {facet.value}
          <span className={bem( "count" )}>{facet.count}</span>
        </li>
      );
    } );

    return <ul className="algolia-belongs-to-menu">{lis}</ul>;
  },
  onChange : function onChange( facetValue ) {
    var facetName = this.props.facet.name;
    this.props.helper.clearRefinements( facetName );
    if ( facetValue !== facetAllValue ) {
      this.props.helper.toggleRefine( facetName, facetValue );
    }
    this.props.helper.search();
  }
} );

module.exports = TabMenu;
