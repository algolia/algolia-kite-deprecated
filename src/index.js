"use strict";
var React = require( "react" );
var algoliasearch = require( "algoliasearch" );
var algoliasearchHelper = require( "algoliasearch-helper" );

var forEach = require( "lodash/collection/forEach" );
var map = require( "lodash/collection/map" );

var setup = require( "./setup" );

var Slider = require( "./components/Facets/Slider" );
var TabMenu = require( "./components/Facets/TabMenu" );
var ConjunctiveF = require( "./components/Facets/Conjunctive" );
var DisjunctiveF = require( "./components/Facets/Disjunctive" );
var Results = require( "./components/Results" );
var SearchBox = require( "./components/SearchBox" );
var Pagination = require( "./components/Pagination" );
var Hogan = require( "./components/Hogan" );
var IndexSelector = require( "./components/IndexSelector" );
var HitsSelector = require( "./components/HitsSelector" );

( function setupAll() {
  var firstRendering = true;
  var appConfig = setup.readAlgoliaConfig( document );
  var containers = setup.readContainersConfig( document );

  var result = {};
  var state = {};

  var client = algoliasearch( appConfig.appID, appConfig.key );
  var helper = algoliasearchHelper( client, appConfig.index, {
    hitsPerPage : containers.results.hitsPerPage,
    facets : map( containers.facets, "name" ),
    disjunctiveFacets : map( containers.disjunctiveFacets, "name" ).concat( map( containers.sliders, "name" ) ).concat( map( containers.tabMenu, "name" ) )
  } );

  helper.on( "result", function( newResult, newState ) {
    result = newResult;
    render( helper, newState, result );
  } );

  helper.on( "change", function( newState ) {
    state = newState;
    render( helper, state, result );
  } );

  helper.search();

  function render( h, s, r ) {
    if( containers.results ) {
      React.render( <Results results={ r }
                             searchState={ s }
                             helper={ h }
                             hitTemplate={ containers.results.hitTemplate } />,
                    containers.results.node );
    }

    if( containers.searchBox ) {
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

    if( containers.indexSelector ) {

      React.render( <IndexSelector helper={ h }
                                   results={ r }
                                   searchState={ s }
                                   indices={ containers.indexSelector.indices }
                                   selectedIndex={ h.getIndex() } />,
                    containers.indexSelector.node );
    }

    if( containers.hitsSelector ) {
      React.render( <HitsSelector helper={ h } results={ r } searchState={ s }
                                  displayOptions={ containers.hitsSelector.displayOptions } />,
                    containers.hitsSelector.node );
    }

    forEach( containers.tabMenu, function( f ) {
      React.render( <TabMenu searchState={ s }
                             facet={ getFacetOrDefaults( r, f.name ) }
                             helper={ h }
                             sort={ f.sort } />,
                    f.node );
    } );

    forEach( containers.facets, function( f ) {
      React.render( <ConjunctiveF searchState={ s }
                                  facet={ getFacetOrDefaults( r, f.name ) }
                                  helper={ h }
                                  sort={ f.sort } />,
                    f.node );
    } );

    forEach( containers.disjunctiveFacets, function( f ) {
      React.render( <DisjunctiveF searchState={ s }
                                  facet={ getFacetOrDefaults( r, f.name ) }
                                  helper={ h }
                                  sort={ f.sort } />,
                    f.node );
    } );

    forEach( containers.sliders, function( slider ) {
      React.render( <Slider searchState={ s }
                            facet={ getFacetOrDefaults( r, slider.name ) }
                            helper={ h } />,
                    slider.node );
    } );

    if( firstRendering ) {
      forEach( document.querySelectorAll( ".algolia-magic" ), function( d ) {
        d.classList.add( "show" );
      } );
      firstRendering = false;
    }
  }

  function getFacetOrDefaults( results, facetName ) {
    return results.getFacetByName( facetName ) || {name : facetName, data : [] };
  }
} )();
