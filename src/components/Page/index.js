"use strict";
var React = require( "react" );
var SearchBox = require( "../SearchBox" );
var Results = require( "../Results" );
var Intro = require( "../Intro" );

class Page extends React.Component {
  render() {
    var result = this.props.result;
    var searchState = this.props.searchState;
    var helper = this.props.helper;
    var resultRendered = result.nbHits > 0 ?
          <Results results={ result } searchState={ searchState } helper={ helper } /> :
          <div className="no-results">No results could be found :(</div>;

    return <span>
             <div className="container-fluid header">
               <Intro />
             </div>
             <div className="container-fluid search-container" ref="searchContainer">
               <div className="search col-md-12">
                 <div className="search-box">
                   <SearchBox helper={ helper } onFocus={ this.moveToRef.bind( this ) }/>
                 </div>
               </div>
             </div>
             <div className="container results-container">
               <div className="result-items col-md-12">
                { resultRendered }
               </div>
             </div>
           </span>;
  }
  componentDidMount() {
    this.searchContainerPosition = React.findDOMNode( this.refs.searchContainer ).getBoundingClientRect().top;
  }
  moveToRef() {
    window.scrollTo( 0, this.searchContainerPosition );
  }
}

module.exports = Page;
