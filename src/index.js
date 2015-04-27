"use strict";
var React = require( "react" );
var algoliasearch = require( "algoliasearch" );
var algoliasearchHelper = require( "algoliasearch-helper" );

var map = require( "lodash/collection/map" );
var forEach = require( "lodash/collection/forEach" );

var Slider = require( "./components/Facets/Slider" );
var ConjunctiveF = require( "./components/Facets/Conjunctive" );
var DisjunctiveF = require( "./components/Facets/Disjunctive" );
var Results = require( "./components/Results" );
var SearchBox = require( "./components/SearchBox" );
var Pagination = require( "./components/Pagination" );
var Hogan = require( "./components/Hogan" );

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
    var sliders = map( document.querySelectorAll( ".algolia-magic.slider" ), function domToSlider( d ){
      return {
        node : d,
        name : d.dataset.facetName
      };
    } );

    var facets = map( document.querySelectorAll( ".algolia-magic.facet" ), function domToFacet( d ) {
      return {
        node : d,
        name : d.dataset.facetName
      };
    } );

    var disjunctiveFacets = map( document.querySelectorAll( ".algolia-magic.disjunctive-facet" ),
                                 function domToFacet( d ) {
      return {
        node : d,
        name : d.dataset.facetName
      };
    } );

    var searchBox = ( function domToSearchBox( d ) {
      return {
        node : d,
        placeholder : d.dataset.placeholder
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

    var statistics = ( function domToStats( e ) {
      return {
        node : e,
        template : document.querySelector( e.dataset.template ).innerHTML
      };
    } )( document.querySelector( ".algolia-magic.statistics" ) );

    return {
      searchBox : searchBox,
      results : results,
      facets : facets,
      disjunctiveFacets : disjunctiveFacets,
      pagination : pagination,
      sliders : sliders,
      statistics : statistics
    };
  } )();

  function render( h, s, r ) {
    React.render( <Results results={ r }
                           searchState={ s }
                           helper={ h }
                           hitTemplate={ containers.results.hitTemplate } />,
                  containers.results.node );
    React.render( <SearchBox helper={ h }
                             placeholder={ containers.searchBox.placeholder } />,
                  containers.searchBox.node );
    React.render( <Pagination results={ r }
                              helper={ h }
                              padding={ containers.pagination.padding} /> ,
                  containers.pagination.node );
    React.render( <Hogan template={ containers.statistics.template }
                         data={ r } />,
                  containers.statistics.node );

    forEach( containers.facets, function( f ) {
      React.render( <ConjunctiveF searchState={ s }
                            facet={ r.getFacetByName( f.name ) }
                            helper={ h } />,
                    f.node );
    } );

    forEach( containers.disjunctiveFacets, function( f ) {
      React.render( <DisjunctiveF searchState={ s }
                            facet={ r.getFacetByName( f.name ) }
                            helper={ h } />,
                    f.node );
    } );

    forEach( containers.sliders , function( s ) {
      React.render( <Slider searchState={ s }
                            facet={ r.getFacetByName( s.name ) }
                            helper={ h } />,
                    s.node );
    } );
  }

  var result = {};
  var state = {};

  var client = algoliasearch( appConfig.appID, appConfig.key );
  var helper = algoliasearchHelper( client, appConfig.index, {
    hitsPerPage : 24,
    facets : map( containers.facets, "name" ),
    disjunctiveFacets : map( containers.disjunctiveFacets, "name" ).concat( map( containers.sliders, "name" ) )
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
