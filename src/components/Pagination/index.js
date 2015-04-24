"use strict";
var React = require( "react" );
var forEach = require( "lodash/collection/forEach" );

var Paginator = require( "./Paginator" );

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
        <a href="#" aria-label="Previous">
          <span aria-hidden="true">{ this.props.labels.previous }</span>
        </a>
      </li> :
      <li onClick={ this.setPage.bind( this, pager.currentPage - 1 ) }>
        <a href="#" aria-label="Previous">
          <span aria-hidden="true">{ this.props.labels.previous }</span>
        </a>
      </li>;
  }
  nextPageLink( pager ) {
    return pager.isLastPage() ?
      <li className="disabled">
        <a href="#" aria-label="Next">
          <span aria-hidden="true">{ this.props.labels.next }</span>
        </a>
      </li> :
      <li onClick={ this.setPage.bind( this, pager.currentPage + 1 ) }>
        <a href="#" aria-label="Next">
          <span aria-hidden="true">{ this.props.labels.next }</span>
        </a>
      </li>;
  }
  firstPageLink( pager ) {
    return pager.isFirstPage() ?
      <li className="disabled">
        <a href="#" aria-label="Previous">
          <span aria-hidden="true">{ this.props.labels.first }</span>
        </a>
      </li> :
      <li onClick={ this.setPage.bind( this, 0 ) }>
        <a href="#" aria-label="Previous">
          <span aria-hidden="true">{ this.props.labels.first }</span>
        </a>
      </li>;
  }
  lastPageLink( pager ) {
    return pager.isLastPage() ?
      <li className="disabled">
        <a href="#" aria-label="Next">
          <span aria-hidden="true">{ this.props.labels.last }</span>
        </a>
      </li> :
      <li onClick={ this.setPage.bind( this, pager.total - 1 ) }>
        <a href="#" aria-label="Next">
          <span aria-hidden="true">{ this.props.labels.last }</span>
        </a>
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
             <a href="#">
               { pageNumber + 1 }
             </a>
           </li>;
  }
  ellipsis() {
    return <li className="disabled"><a>...</a></li>;
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
