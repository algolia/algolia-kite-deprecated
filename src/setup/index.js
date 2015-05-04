"use strict";
var map = require( "lodash/collection/map" );

module.exports = {
  /**
   * Read the algolia configuration from a given dom node.
   * @param {DOMNode} dom node holding the configuration
   * @return {Object} configuration for the algolia search client
   */
  readAlgoliaConfig : function readAlgoliaConfig( dom ) {
    var d = dom.body.dataset;
    return {
      appID : d.algoliaAppId,
      key : d.algoliaKey,
      index : d.algoliaIndex
    };
  },
  /**
   * Read the current the DOM node for component configurations. Return a list
   * of components to render. Those components should follow the same props
   * signature : { Helper, SearchResults, SearchState }
   * @param {DOMNode} dom the root dom node in which to look for components
   * @return {Array<function>} preconfigured react components
   */
  readContainersConfig : function lookForContainers( dom ) {
    var containersConfig = {};
    containersConfig.sliders = map(
      dom.querySelectorAll( ".algolia-magic.slider" ),
      function domToSlider( d ) {
        return {
          node : d,
          name : d.dataset.facetName
        };
      } );

    containersConfig.facets = map(
      dom.querySelectorAll( ".algolia-magic.facet" ),
      function domToFacet( d ) {
        return {
          node : d,
          name : d.dataset.facetName
        };
      } );

    containersConfig.disjunctiveFacets = map(
      dom.querySelectorAll( ".algolia-magic.disjunctive-facet" ),
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
    } )( dom.querySelector( ".algolia-magic.search-box" ) );

    containersConfig.results = ( function domToResult( d ) {
      if( d === null ) return undefined;
      else {
        return {
          node : d,
          hitsPerPage : d.dataset.hitsPerPage || 12,
          hitTemplate : dom.querySelector( d.dataset.hitTemplate ).innerHTML
        };
      }
    } )( dom.querySelector( ".algolia-magic.result-items" ) );

    containersConfig.pagination = ( function domToPagination( d ) {
      if( d === null ) return undefined;
      else {
        return {
          node : d,
          padding : d.dataset.padding || 2
        };
      }
    } )( dom.querySelector( ".algolia-magic.pagination" ) );

    containersConfig.statistics = ( function domToStats( d ) {
      if( d === null ) return undefined;
      else {
        return {
          node : d,
          template : dom.querySelector( d.dataset.template ).innerHTML
        };
      }
    } )( dom.querySelector( ".algolia-magic.statistics" ) );

    return containersConfig;
  }
};