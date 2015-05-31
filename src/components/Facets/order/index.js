var order = {
  lexicographic : function( facetValueA, facetValueB ){
    return facetValueA.name.localeCompare( facetValueB.name );
  },
  lexicographicWithSelectedFirst : function( facetValueA, facetValueB ){
    if( facetValueB.isRefined === facetValueA.isRefined ) {
      return order.lexicographic( facetValueA, facetValueB );
    }
    return facetValueA.isRefined ? -1 : 1;
  },
  count : function( facetValueA, facetValueB ) {
    if( facetValueA.value === facetValueB.value ) {
      return 0;
    }
    return facetValueA.value > facetValueB.value ? -1 : 1;
  },
  countWithSelectedFirst : function( facetValueA, facetValueB ) {
    if( facetValueB.isRefined === facetValueA.isRefined ) {
      return order.count( facetValueA, facetValueB );
    }
    return facetValueA.isRefined ? -1 : 1;
  }
};

module.exports = order;
