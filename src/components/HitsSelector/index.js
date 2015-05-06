var React = require( "react" );
var DDButton = require( "react-dropdown-button" )

var AlgoliasearchHelper = require( "algoliasearch-helper/src/algoliasearch.helper" );
var SearchResults = require( "algoliasearch-helper/src/SearchResults" );
var SearchParameters = require( "algoliasearch-helper/src/SearchParameters" );

var map = require( "lodash/collection/map" );
var without = require( "lodash/array/without" );

var HitsSelector = React.createClass( {
  propTypes : {
    helper : React.PropTypes.instanceOf( AlgoliasearchHelper ),
    results : React.PropTypes.instanceOf( SearchResults ),
    searchState : React.PropTypes.instanceOf( SearchParameters ),
    displayOptions : React.PropTypes.arrayOf( React.PropTypes.number )
  },
  render : function() {
    var selectedOption = parseInt( this.props.searchState.hitsPerPage, 10 );
    var selectableOptions = map(
      without( this.props.displayOptions, selectedOption ).sort(),
      function toDisplayObject( opt ) {
        return { label : opt, value : opt };
      }
    );
    return <DDButton items={ selectableOptions } onMenuClick={ this.changeIndex }>
             Display : <strong>&nbsp; { selectedOption }</strong>
           </DDButton>;
  },
  changeIndex : function( e, itemProps ){
    this.props.helper.setState(
      this.props.searchState.setHitsPerPage( itemProps.data.value )
    ).search();
  }
} );

module.exports = HitsSelector;
