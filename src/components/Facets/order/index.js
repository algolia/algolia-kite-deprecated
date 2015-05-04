var order = {
  lexicographic : function( facetValueA, facetValueB ){
    return facetValueA.name.localeCompare( facetValueB.name );
  },
  lexicographicWithSelectedFirst : function( facetValueA, facetValueB ){
    if( facetValueB.isRefined === facetValueA.isRefined ){
      return order.lexicographic( facetValueA, facetValueB );
    }
    if( facetValueA.isRefined ){
      return -1;
    }
    else {
      return 1;
    }
  }
};

module.exports = order;
