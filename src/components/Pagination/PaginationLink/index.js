"use strict";
var React = require( "react" );

class PaginationLink extends React.Component {
  render() {
    var label = this.props.label;
    var ariaLabel = this.props.ariaLabel;
    var href = this.props.href;
    var page = this.props.page;
    var className = this.props.className;

    var disabled = ( page === undefined );

    if( disabled ) {
      return  <li className="disabled">
                <a href={ href } aria-label={ ariaLabel } onClick={ this.clickDisabled }>
                  { label }
                </a>
              </li>;
    }
      
    return  <li className={ className } >
              <a href={ href } aria-label={ ariaLabel } onClick={ this.click.bind( this, page ) }>
                { label }
              </a>
            </li>;
  }
  clickDisabled( e ){
    e.preventDefault();
  }
  click( page, e ){
    e.preventDefault();
    this.props.helper.setCurrentPage( page ).search();
  }
}

module.exports = PaginationLink;
