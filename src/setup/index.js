"use strict";
var map = require( "lodash/collection/map" );

module.exports = {
  readAlgoliaConfig : function readAlgoliaConfig() {
    var d = document.body.dataset;
    return {
      appID : d.algoliaAppId,
      key : d.algoliaKey,
      index : d.algoliaIndex
    };
  },
  readContainersConfig : function lookForContainers() {
    var containersConfig = {};
    containersConfig.sliders = map(
      document.querySelectorAll( ".algolia-magic.slider" ),
      function domToSlider( d ) {
        return {
          node : d,
          name : d.dataset.facetName
        };
      } );

    containersConfig.facets = map(
      document.querySelectorAll( ".algolia-magic.facet" ),
      function domToFacet( d ) {
        return {
          node : d,
          name : d.dataset.facetName
        };
      } );

    containersConfig.disjunctiveFacets = map(
      document.querySelectorAll( ".algolia-magic.disjunctive-facet" ),
      function domToFacet( d ) {
        return {
          node : d,
          name : d.dataset.facetName
        };
      } );

    containersConfig.searchBox = ( function domToSearchBox( d ) {
      if( d === null ) return undefined;
      else {
        return {
          node : d,
          placeholder : d.dataset.placeholder
        };
      }
    } )( document.querySelector( ".algolia-magic.search-box" ) );

    containersConfig.results = ( function domToResult( d ) {
      if( d === null ) return undefined;
      else {
        return {
          node : d,
          hitsPerPage : d.dataset.hitsPerPage || 12,
          hitTemplate : document.querySelector( d.dataset.hitTemplate ).innerHTML
        };
      }
    } )( document.querySelector( ".algolia-magic.result-items" ) );

    containersConfig.pagination = ( function domToPagination( d ) {
      if( d === null ) return undefined;
      else {
        return {
          node : d,
          padding : d.dataset.padding || 2
        };
      }
    } )( document.querySelector( ".algolia-magic.pagination" ) );

    containersConfig.statistics = ( function domToStats( d ) {
      if( d === null ) return undefined;
      else {
        return {
          node : d,
          template : document.querySelector( d.dataset.template ).innerHTML
        };
      }
    } )( document.querySelector( ".algolia-magic.statistics" ) );

    return containersConfig;
  }
};
