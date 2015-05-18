"use strict";
var React = require( "react" );
var forEach = require( "lodash/collection/forEach" );
var map = require( "lodash/collection/map" );

var BelongsToMenu = React.createClass( {
  componentWillMount : function() {
    this.setState( {
      uniqueId : this.uniqueId(),
      selectedCategory : "All"
    } );
  },
  uniqueId : function uniqueId() {
    // TODO: This should return a unique Id for the component, so we can add
    // several BelongsToMenu on the same page.
    return "algolia-belongstomenu";
  },
  // TODO: This helps in writing BEM classes, but if its usage is to be common
  // all over the plugin, this should go elsewhere.
  bemHelper : function( block ) {
    return function( element, modifier ) {
      if ( !element ) {
        return block;
      }
      if ( !modifier ) {
        return block + "--" + element;
      }
      return block + "--" + element + "__" + modifier;
    };
  },
  getCategories : function getCategories( facets ) {
    var categories = [];
    var allCount = 0;
    forEach( facets, function( count, name ) {
      categories.push( {name : name, count : count} );
      allCount += count;
    } );
    categories.unshift( {name : "All", count : allCount} );
    return categories;
  },
  render : function() {
    var self = this;
    var categories = self.getCategories( self.props.facet.data );
    var uniqueId = self.state.uniqueId;
    var bem = self.bemHelper( "algolia-belongs-to-menu" );

    var lis = map( categories, function( category ) {
      var name = category.name;
      var count = category.count;
      var inputId = uniqueId + "-" + name;
      var onChange = self.onChange.bind( self, name );
      var className = bem( "item" );
      if ( name === self.state.selectedCategory ) {
        className += " " + bem( "item", "active" );
      }

      return (
        <li className={className} key={inputId}>
          <input className={bem( "hidden-radio" )} type="radio" name={uniqueId} value={name} id={inputId} onChange={onChange} />
          <label className={bem( "label" )} htmlFor={inputId} >
            {name}
            <span className={bem( "count" )}>{count}</span>
          </label>
        </li>
      );
    } );

    return <ul className="algolia-belongs-to-menu">{lis}</ul>;
  },
  onChange : function onChange( categoryName ) {
    var facetName = this.props.facet.name;
    this.setState( {
      selectedCategory : categoryName
    } );

    this.props.helper.clearRefinements( facetName );
    if ( categoryName !== "All" ) {
      this.props.helper.toggleRefine( facetName, categoryName );
    }
    this.props.helper.search();
  }
} );

module.exports = BelongsToMenu;
