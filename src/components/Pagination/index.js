"use strict";
var React = require( "react" );
var forEach = require( "lodash/collection/forEach" );

var Paginator = require( "./Paginator" );
var PaginationLink = require( "./PaginationLink" );

class Pagination extends React.Component {
  render() {
    var results = this.props.results;

    if( !results || !results.hits || results.hits.length === 0 ) return <span/>;

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
    var page = pager.isFirstPage() ? undefined : pager.currentPage - 1;
    return <PaginationLink href="#" label={ this.props.labels.previous } ariaLabel="Previous"
                           helper={ this.props.helper } page={ page } />;
  }
  nextPageLink( pager ) {
    var page = pager.isLastPage() ? undefined : pager.currentPage - 1;
    return <PaginationLink href="#" label={ this.props.labels.next } ariaLabel="Next"
                           helper={ this.props.helper } page={ page } />
  }
  firstPageLink( pager ) {
    var page = pager.isFirstPage() ? undefined : 0;
    return <PaginationLink href="#" label={ this.props.labels.first } ariaLabel="First"
                           helper={ this.props.helper } page={ page } />;
  }
  lastPageLink( pager ) {
    var page = pager.isLastPage() ? undefined : pager.total - 1;
    return <PaginationLink href="#" label={ this.props.labels.last } ariaLabel="Last"
                           helper={ this.props.helper } page={ page } />;
  }
  pages( pager ) {
    var pages = pager.pages();
    var elements = [];

    forEach( pages, function( pageNumber ) {
      var className = pageNumber === pager.currentPage ? "active" : "";
      elements.push( 
        <PaginationLink href="#" label={ pageNumber + 1 } ariaLabel={ pageNumber + 1 }
                        helper={ this.props.helper } page={ pageNumber }
                        key={ pageNumber }
                        className={ className} />
      );
    }, this );

    return elements;
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
