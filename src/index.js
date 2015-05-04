"use strict";
var React = require( "react" );
var algoliasearch = require( "algoliasearch" );
var algoliasearchHelper = require( "algoliasearch-helper" );

var forEach = require( "lodash/collection/forEach" );
var map = require( "lodash/collection/map" );

var setup = require( "./setup" );

var Slider = require( "./components/Facets/Slider" );
var ConjunctiveF = require( "./components/Facets/Conjunctive" );
var DisjunctiveF = require( "./components/Facets/Disjunctive" );
var Results = require( "./components/Results" );
var SearchBox = require( "./components/SearchBox" );
var Pagination = require( "./components/Pagination" );
var Hogan = require( "./components/Hogan" );

( function setupAll() {
  var appConfig = setup.readAlgoliaConfig( document );
  var containers = setup.readContainersConfig( document );

  var result = {};
  var state = {};

  var client = algoliasearch( appConfig.appID, appConfig.key );
  var helper = algoliasearchHelper( client, appConfig.index, {
    hitsPerPage : containers.results.hitsPerPage,
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

  function render( h, s, r ) {
    if( containers.results ){
      React.render( <Results results={ r }
                             searchState={ s }
                             helper={ h }
                             hitTemplate={ containers.results.hitTemplate } />,
                    containers.results.node );
    }

    if( containers.searchBox ){
      React.render( <SearchBox helper={ h }
                               placeholder={ containers.searchBox.placeholder } />,
                    containers.searchBox.node );
    }

    if( containers.pagination ) {
      React.render( <Pagination results={ r }
                                helper={ h }
                                padding={ containers.pagination.padding} />,
                    containers.pagination.node );
    }

    if( containers.statistics ) {
      React.render( <Hogan template={ containers.statistics.template }
                           data={ r } />,
                    containers.statistics.node );
    }

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
} )();
