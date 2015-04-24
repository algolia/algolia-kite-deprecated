"use strict";
var React = require( "react" );
var algoliasearch = require( "algoliasearch" );
var algoliasearchHelper = require( "algoliasearch-helper" );

var map = require( "lodash/collection/map" );
var forEach = require( "lodash/collection/forEach" );

var ConjunctiveF = require( "./components/Facets/Conjunctive" );
var Results = require( "./components/Results" );
var SearchBox = require( "./components/SearchBox" );
var Pagination = require( "./components/Pagination" );

( function setup() {
  var appConfig = ( function readAlgoliaConfig() {
    var d = document.body.dataset;
    return {
      appID : d.algoliaAppId,
      key : d.algoliaKey,
      index : d.algoliaIndex
    };
  } )();

  var containers = ( function lookForContainers() {
    var facets = map( document.querySelectorAll( ".algolia-magic.facet" ), function domToFacet( d ) {
      return {
        node : d,
        name : d.dataset.facetName
      };
    } );

    var searchBox = ( function domToSearchBox( d ){
      return {
        node : d
      };
    } )( document.querySelector( ".algolia-magic.search-box" ) );

    var results = ( function domToResult( d ) {
      return {
        node : d,
        hitTemplate : document.querySelector( d.dataset.hitTemplate ).innerHTML
      };
    } )( document.querySelector( ".algolia-magic.result-items" ) );

    var pagination = ( function domToPagination( d ) {
      return {
        node : d,
        padding : d.dataset.padding || 2
      };
    } )( document.querySelector( ".algolia-magic.pagination" ) );

    return {
      searchBox : searchBox,
      results : results,
      facets : facets,
      pagination : pagination
    };
  } )();

  function render( h, s, r ) {
    React.render( <Results results={ r }
                           searchState={ s }
                           helper={ h } 
                           hitTemplate={ containers.results.hitTemplate } />,
                  containers.results.node );
    React.render( <SearchBox helper={ h } />,
                  containers.searchBox.node );
    React.render( <Pagination results={ r }
                              helper={ h }
                              padding={ containers.pagination.padding } />,
                  containers.pagination.node );
    
    forEach( containers.facets, function( f ) {
      React.render( <ConjunctiveF searchState={ s }
                            facet={ r.getFacetByName( f.name ) } 
                            helper={ h } />,
                    f.node );
    } );
  }

  var result = {};
  var state = {};

  var client = algoliasearch( appConfig.appID, appConfig.key );
  var helper = algoliasearchHelper( client, appConfig.index, {
    hitsPerPage : 24,
    facets : map( containers.facets, "name" )
  } );

  helper.on( "result", function( newResult ) {
    result = newResult;
    render( helper, state, result );
  } );

  helper.on( "change", function( newState ) {
    state = newState;
    render( helper, state, result );
  } );

  helper.search();
} )();
