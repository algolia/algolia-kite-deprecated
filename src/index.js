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

var URLManager = require( "./setup/url.js" );

( function setupAll() {
  var firstRendering = true;
  var appConfig = setup.readAlgoliaConfig( document );
  var containers = setup.readContainersConfig( document );

  //check configuration
  if( !containers || !containers.results ) {
    throw new Error( "The result-items containers must be defined in order to correctly initialize the UI-kit. Please check GETTING-STARTED.md chapter called 'The search results'" );
  }

  var result = {};
  var state = {};

  var facets = map( containers.facets, "name" );
  var disjunctiveFacets = map( containers.disjunctiveFacets, "name" )
                         .concat( map( containers.sliders, "name" ) )
                         .concat( map( containers.tabMenu, "name" ) )
  var defaultUrlState = {
    page : 0,
    query : "",
    disjunctiveFacetsRefinements : {},
    facetsRefinements : {},
    numericRefinements : {}
  };
  var urlManager = new URLManager( 
    defaultUrlState,
    {
      hitsPerPage : containers.results.hitsPerPage,
      facets : facets,
      disjunctiveFacets : disjunctiveFacets
    }
  );

  var initialState = urlManager.init();

  var client = algoliasearch( appConfig.appID, appConfig.key );
  var helper = algoliasearchHelper( client, appConfig.index, initialState );

  helper.on( "result", function( newResult, newState ) {
    result = newResult;
    render( helper, newState, result );
  } );

  helper.on( "change", function( newState ) {
    state = newState;
    urlManager.update( state );
    render( helper, state, result );
  } );
  

  window.addEventListener( "popstate", function( event ){
    helper.overrideStateWithoutTriggeringChangeEvent( event.state )
          .search();
  } );

  helper.search();

  function render( h, s, r ) {
    if( containers.results ) {
      React.render( <Results results={ r }
                             searchState={ s }
                             helper={ h }
                             noResultsTemplate={ containers.results.noResultsTemplate }
                             hitTemplate={ containers.results.hitTemplate } />,
                    containers.results.node );
    }

    if( containers.searchBox ) {
      React.render( <SearchBox helper={ h }
                               inputClass={ containers.searchBox.inputClass }
                               placeholder={ containers.searchBox.placeholder } />,
                    containers.searchBox.node );
    }

    if( containers.pagination ) {
      React.render( <Pagination results={ r }
                                helper={ h }
                                padding={ containers.pagination.padding}
                                labels={ containers.pagination.labels } />,
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
