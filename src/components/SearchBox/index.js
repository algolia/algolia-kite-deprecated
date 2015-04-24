"use strict";
var React = require( "react" );

class SearchBox extends React.Component {
  render() {
    var onFocus = this.props.onFocus;
    return <form className="autocomplete-form" onSubmit={ function( e ) { e.preventDefault(); } }>
             <input type="text"
                    placeholder="Search for a speaker, a session, or a company"
                    name="query"
                    className="searchbox main form-control"
                    data-role="autocomplete"
                    autoComplete="off"
                    autofocus="autofocus"
                    onChange={ this.change.bind( this ) }
                    onFocus={ onFocus }
                    role="textbox" />
           </form>;
  }
  change( e ) {
    var value = e.target.value;
    var helper = this.props.helper;

    helper.setQuery( value ).search();
  }
}

module.exports = SearchBox;
