"use strict";
var React = require( "react" );

var Slider = require( "react-slider" );

var AlgoliaSlider = React.createClass( {
  render : function() {
    var helper = this.props.helper;
    var facet = this.props.facet;
    var titleLabel = this.props.titleLabel || facet.name;

    var title = <h2 className="panel-title">{ titleLabel }</h2>;

    var min = ( facet.stats && facet.stats.min ) || 0;
    var max = ( facet.stats && facet.stats.max ) || 0;
    var values = [
      helper.state.getNumericRefinement( facet.name, ">=" ) || min,
      helper.state.getNumericRefinement( facet.name, "<=" ) || max
    ];

    return <div className="panel panel-default">
             <div className="panel-heading">{ title }</div>
             <div className="list-group">
               <div className="list-group-item">{ values[0] } - { values[1] }</div>
               <Slider className="horizontal-slider list-group-item"
                       pearling={ true }
                       barClassName="bar"
                       withBars={ true }
                       max={ max }
                       min={ min }
                       value={ values }
                       onChange={ this.change }
                       onAfterChange={ this.search }>
                 <div className="handle handle-min" ></div>
                 <div className="handle handle-max"/>
               </Slider>
             </div>
           </div>;
  },
  change : function( values ) {
    this.props.helper.addNumericRefinement( this.props.facet.name, ">=", values[0] )
                     .addNumericRefinement( this.props.facet.name, "<=", values[1] );
  },
  search : function() {
    this.props.helper.search();
  }
} );

module.exports = AlgoliaSlider;
