"use strict";
var React = require( "react" );

var AlgoliasearchHelper = require( "algoliasearch-helper/src/algoliasearch.helper" );
var SearchResults = require( "algoliasearch-helper/src/SearchResults" );

var SearchBox = React.createClass( {
  propTypes : {
    helper : React.PropTypes.instanceOf( AlgoliasearchHelper ),
    results : React.PropTypes.instanceOf( SearchResults ),
    onFocus : React.PropTypes.func,
    placeholder : React.PropTypes.string
  },
  render : function() {
    var onFocus = this.props.onFocus;
    return <form className="autocomplete-form" onSubmit={ function( e ) { e.preventDefault(); } }>
             <input type="text"
                    value={ this.props.helper.state.query }
                    placeholder={ this.props.placeholder }
                    name="query"
                    className="searchbox main form-control"
                    data-role="autocomplete"
                    autoComplete="off"
                    autofocus="autofocus"
                    onChange={ this.change }
                    onFocus={ onFocus }
                    role="textbox" />
           </form>;
  },
  change : function( e ) {
    var value = e.target.value;
    var helper = this.props.helper;

    helper.setQuery( value ).search();
  }
} );

module.exports = SearchBox;
