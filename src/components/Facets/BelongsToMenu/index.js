"use strict";
var React = require( "react" );
var reduce = require( "lodash/collection/reduce" );
var map = require( "lodash/collection/map" );
var values = require( "lodash/object/values" );

var BelongsToMenu = React.createClass( {
  componentWillMount : function() {
    var categories = this.props.facet.data;
    categories.All = reduce( values( categories ), function( total, n ) {
      return total + n;
    } );

    this.setState( {
      facetName : this.props.facet.name,
      uniqueId : this.uniqueId(),
      selectedCategory : "All",
      categories : categories
    } );
  },
  uniqueId : function uniqueId() {
    // TODO: This should return a unique Id for the component, so we can add
    // several BelongsToMenu on the same page.
    return "algolia-belongstomenu";
  },
  render : function() {
    var categories = this.state.categories;
    var uniqueId = this.state.uniqueId;
    var self = this;

    var lis = map( categories, function( count, category ) {
      var inputId = uniqueId + "-" + category;
      var onChange = self.onChange.bind(self, category);
      return <li key={inputId}>
        <input type="radio" name={uniqueId} value={category} id={inputId} onChange={onChange} />
        <label htmlFor={inputId}>
          {category}
          <span className="count">{count}</span>
        </label>
      </li>;
    } );

    return <div className="search-filters"><ul>{lis}</ul></div>;
  },
  onChange : function onChange( category ) {
    this.props.helper.clearRefinements(this.state.facetName);
    if (category !== "All") {
      this.props.helper.toggleRefine( this.state.facetName, category );
    }
    this.props.helper.search();
  }
} );

module.exports = BelongsToMenu;
