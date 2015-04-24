"use strict";
var range = require( "lodash/utility/range" );
var Paginator = function Paginator( params ) {
  if( params.currentPage < 0 || params.currentPage > params.total ) {
    throw new Error( "First page is out of bounds. Was " +
                     params.currentPage + ", expected between 0 and " + params.total );
  }
  this.currentPage = params.currentPage;
  this.total = params.total;
  this.padding = params.padding || 5;
};


Paginator.prototype = {
  constructor : Paginator,
  pages : function() {
    var current = this.currentPage;
    var padding = this.padding;
    var paddingLeft = this.calculatePaddingLeft( current, padding, this.total );
    var paddingRight = Math.min( 2 * padding + 1, this.total ) - paddingLeft;
    var first = current - paddingLeft;
    var last = current + paddingRight;
    return range( first, last );
  },
  calculatePaddingLeft : function( current, padding, total ) {
    if( current <= padding ) {
      return current;
    }
    else {
      if( current >= ( total - padding ) ) {
        return 2 * padding + 1 - ( total - current );
      }
      else {
        return padding;
      }
    }
  },
  showFirstEllipsis : function() {
    return this.currentPage > this.padding;
  },
  showLastEllipsis : function() {
    return this.currentPage < ( this.total - this.padding );
  },
  isLastPage : function() {
    return this.currentPage === this.total - 1;
  },
  isFirstPage : function() {
    return this.currentPage === 0;
  }
};

module.exports = Paginator;
