"use strict";
var React = require( "react" );
var forEach = require( "lodash/collection/forEach" );

var Paginator = require( "./Paginator" );

class PaginationLink extends React.Component {
  render() {
    var label = this.props.label;
    var ariaLabel = this.props.ariaLabel;
    var href = this.props.href;
    return  <a href="#" aria-label={ariaLabel} onClick={ this.click }>
              { label }
            </a>;
  }
  click( e ){
    e.preventDefault();
  }
}

class Pagination extends React.Component {
  render() {
    var results = this.props.results;
    var pager = new Paginator( {
      currentPage : results.page,
      total : results.nbPages,
      padding : this.props.padding
    } );

    if( pager ) {
      return <nav className={this.props.className}>
               <ul className="pagination top_pagination">
                  { this.props.showFirstLast ? this.firstPageLink( pager ) : undefined }
                  { this.previousPageLink( pager ) }
                  { this.pages( pager ) }
                  { this.nextPageLink( pager ) }
                  { this.props.showFirstLast ? this.lastPageLink( pager ) : undefined }
               </ul>
             </nav>;
    }
    return <nav><ul className="pagination top_pagination"></ul></nav>;
  }
  previousPageLink( pager ) {
    return pager.isFirstPage() ?
      <li className="disabled">
        <PaginationLink href="#" label={ this.props.labels.previous } ariaLabel="Previous" />
      </li> :
      <li onClick={ this.setPage.bind( this, pager.currentPage - 1 ) }>
        <PaginationLink href="#" label={ this.props.labels.previous } ariaLabel="Previous" />
      </li>;
  }
  nextPageLink( pager ) {
    return pager.isLastPage() ?
      <li className="disabled">
        <PaginationLink href="#" label={ this.props.labels.next } ariaLabel="Next" />
      </li> :
      <li onClick={ this.setPage.bind( this, pager.currentPage + 1 ) }>
        <PaginationLink href="#" label={ this.props.labels.next } ariaLabel="Next" />
      </li>;
  }
  firstPageLink( pager ) {
    return pager.isFirstPage() ?
      <li className="disabled">
        <PaginationLink href="#" label={ this.props.labels.first } ariaLabel="First" />
      </li> :
      <li onClick={ this.setPage.bind( this, 0 ) }>
        <PaginationLink href="#" label={ this.props.labels.first } ariaLabel="First" />
      </li>;
  }
  lastPageLink( pager ) {
    return pager.isLastPage() ?
      <li className="disabled">
        <PaginationLink href="#" label={ this.props.labels.last } ariaLabel="Last" />
      </li> :
      <li onClick={ this.setPage.bind( this, pager.total - 1 ) }>
        <PaginationLink href="#" label={ this.props.labels.last } ariaLabel="Last" />
      </li>;
  }
  pages( pager ) {
    var pages = pager.pages();
    var elements = [];

    forEach( pages, function( pageNumber ) {
      elements.push( this.page( pager, pageNumber ) );
    }, this );

    return elements;
  }
  page( pager, pageNumber ) {
    var className = pageNumber === pager.currentPage ? "active" : "";
    return <li key={ pageNumber } onClick={ this.setPage.bind( this, pageNumber ) }
               className={ className } >
             <PaginationLink href="#" label={ pageNumber + 1 } ariaLabel={ pageNumber + 1 } />
           </li>;
  }
  setPage( newPage ) {
    this.props.helper.setCurrentPage( newPage ).search();
  }
}

Pagination.defaultProps = {
  labels : {
    previous : <span>&lsaquo;</span>,
    next : <span>&rsaquo;</span>,
    first : <span>&laquo;</span>,
    last : <span>&raquo;</span>
  },
  showFirstLast : true
};

module.exports = Pagination;
