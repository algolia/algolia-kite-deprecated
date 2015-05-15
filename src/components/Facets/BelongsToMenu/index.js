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
  // TODO: This helps in writing BEM classes, but if its usage is to be common
  // all over the plugin, this should go elsewhere.
  bemHelper: function(block) {
    return function(element, modifier) {
      if (!element) {
        return block;
      }
      if (!modifier) {
        return block + "--" + element;
      }
      return block + "--" + element + "__" + modifier;
    };
  },
  render : function() {
    var categories = this.state.categories;
    var uniqueId = this.state.uniqueId;
    var self = this;
    var bem = this.bemHelper('algolia-belongs-to-menu');

    var lis = map( categories, function( count, category ) {
      var inputId = uniqueId + "-" + category;
      var onChange = self.onChange.bind(self, category);
      var className = bem('item');
      if (category === self.state.selectedCategory) {
        className += " " + bem('item', 'active');
      }

      return (
        <li className={className} key={inputId}>
          <input className={bem('hidden-radio')} type="radio" name={uniqueId} value={category} id={inputId} onChange={onChange} />
          <label className={bem('label')} htmlFor={inputId} >
            {category}
            <span className={bem('count')}>{count}</span>
          </label>
        </li>
      );
    } );

    return <ul className="algolia-belongs-to-menu">{lis}</ul>;
  },
  onChange : function onChange( category ) {
    this.setState({ 
      selectedCategory: category
    });

    this.props.helper.clearRefinements(this.state.facetName);
    if (category !== "All") {
      this.props.helper.toggleRefine( this.state.facetName, category );
    }
    this.props.helper.search();
  }
} );

module.exports = BelongsToMenu;
