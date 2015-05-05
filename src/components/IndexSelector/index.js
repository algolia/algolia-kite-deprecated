var React = require( "react" );
var DDButton = require( "react-dropdown-button" )

var AlgoliasearchHelper = require( "algoliasearch-helper/src/algoliasearch.helper" );
var SearchResults = require( "algoliasearch-helper/src/SearchResults" );
var SearchParameters = require( "algoliasearch-helper/src/SearchParameters" );

var find = require( "lodash/collection/find" );
var reject = require( "lodash/collection/reject" );

var IndexSelector = React.createClass( {
  propTypes : {
    helper : React.PropTypes.instanceOf( AlgoliasearchHelper ),
    results : React.PropTypes.instanceOf( SearchResults ),
    searchState : React.PropTypes.instanceOf( SearchParameters ),
    indices : React.PropTypes.arrayOf( React.PropTypes.shape( {
      label : React.PropTypes.string,
      index : React.PropTypes.string
    } ) ),
    selectedIndex : React.PropTypes.string
  },
  render : function() {
    var isSelectedIndex = function( i ) {
      return this.props.selectedIndex === i.index
    };
    var selectedIndex = find( this.props.indices, isSelectedIndex, this );
    var displayableIndices = reject( this.props.indices, isSelectedIndex, this );
    return <DDButton items={ displayableIndices } onMenuClick={ this.changeIndex }>
             Sort by : <strong>&nbsp; { selectedIndex.label }</strong>
           </DDButton>;
  },
  changeIndex : function( e, itemProps ){
    this.props.helper.setIndex( itemProps.data.index ).search();
  }
} );

module.exports = IndexSelector;
