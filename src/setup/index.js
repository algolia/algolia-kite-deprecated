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

    var appID = d.algoliaAppId;
    var key = d.algoliaKey;
    var index = d.algoliaIndex;

    if( !appID || !key || !index ){
      throw new Error( "algolia-app-id, algolia-key and algolia-index are mandatory parameters on the body. Check out the GETTING_STARTED.md chapter called 'configure index'." );
    }

    return {
      appID : d.algoliaAppId,
      key : d.algoliaKey,
      index : d.algoliaIndex
    };
  },
  /**
   * Read the current DOM node for component configurations. Return a list
   * of components to render. Those components should follow the same props
   * signature : { Helper, SearchResults, SearchState }
   * @param {DOMNode} dom the root dom node in which to look for components
   * @return {Array<function>} preconfigured react components
   */
  readContainersConfig : function lookForContainers( dom ) {
    var containersConfig = {};
    containersConfig.indexSelector = ( function( d ) {
      if( d === null ) return undefined;

      var options = d.querySelectorAll( "[data-index-name]" );
      var indices = map( options, function( d0 ) {
        return {
          label : d0.innerHTML,
          index : d0.dataset.indexName
        };
      } );

      return {
        node : d,
        indices : indices
      };
    } )( dom.querySelector( ".algolia-magic.index-selector" ) );

    containersConfig.hitsSelector = ( function( d ) {
      if( d === null ) return undefined;

      var options = d.querySelectorAll( "[data-hits-per-page]" );
      var displayOptions = map( options, function( d0 ) {
        return parseInt( d0.dataset.hitsPerPage, 10 );
      } );

      return {
        node : d,
        displayOptions : displayOptions
      };
    } )( dom.querySelector( ".algolia-magic.hits-selector" ) );

    containersConfig.sliders = map(
      dom.querySelectorAll( ".algolia-magic.slider" ),
      function domToSlider( d ) {
        return {
          node : d,
          name : d.dataset.facetName,
          titleLabel : d.dataset.titleLabel
        };
      } );

    containersConfig.tabMenu = map(
      dom.querySelectorAll( ".algolia-magic-tab-menu" ),
      function domToBelongsToTabMenu( d ) {
        return {
          node : d,
          name : d.dataset.algoliaFacetName
        };
      } );

    containersConfig.facets = map(
      dom.querySelectorAll( ".algolia-magic.facet" ),
      function domToFacet( d ) {
        return {
          node : d,
          name : d.dataset.facetName,
          sort : d.dataset.sort,
          titleLabel : d.dataset.titleLabel
        };
      } );

    containersConfig.disjunctiveFacets = map(
      dom.querySelectorAll( ".algolia-magic.disjunctive-facet" ),
      function domToFacet( d ) {
        return {
          node : d,
          name : d.dataset.facetName,
          sort : d.dataset.sort,
          titleLabel : d.dataset.titleLabel
        };
      } );

    containersConfig.searchBox = ( function domToSearchBox( d ) {
      if( d === null ) return undefined;

      return {
        node : d,
        placeholder : d.dataset.placeholder,
        inputClass : d.dataset.inputClass
      };
    } )( dom.querySelector( ".algolia-magic.search-box" ) );

    containersConfig.results = ( function domToResult( d ) {
      if( d === null ) return undefined;

      var noResSelector = d.dataset.noResultsTemplate;
      var noResTmplate = ( function( sel ){
        if( !sel ) return "";
        var templateDom = dom.querySelector( noResSelector );
        return templateDom ? templateDom.innerHTML : "";
      } )( noResSelector )

      var hitTemplateSelector = d.dataset.hitTemplate;
      if( !hitTemplateSelector ) throw new Error(
        "hit-template is a mandatory field of the results-items component and should be a selector to a valid template" );
      var hitTemplate = dom.querySelector( hitTemplateSelector );
      if( !hitTemplate ) throw new Error( "hit-template should be a selector to a valid template" );

      return {
        node : d,
        hitsPerPage : ( d.dataset && d.dataset.hitsPerPage ) || 12,
        hitTemplate : hitTemplate.innerHTML,
        noResultsTemplate : noResTmplate 
      };
    } )( dom.querySelector( ".algolia-magic.result-items" ) );

    containersConfig.pagination = ( function domToPagination( d ) {
      if( d === null ) return undefined;

      return {
        node : d,
        padding : d.dataset.padding || 2
      };
    } )( dom.querySelector( ".algolia-magic.pagination" ) );

    containersConfig.statistics = ( function domToStats( d ) {
      if( d === null ) return undefined;

      return {
        node : d,
        template : dom.querySelector( d.dataset.template ).innerHTML
      };
    } )( dom.querySelector( ".algolia-magic.statistics" ) );

    return containersConfig;
  }
};
