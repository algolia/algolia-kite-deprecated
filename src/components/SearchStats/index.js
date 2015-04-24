"use strict";
var React = require( "react" );

var Pagination = require( "../Pagination" );

var paginationLabels = {
  next : "suivant",
  previous : "précédent"
};

class SearchStats extends React.Component {
  render() {
    return <div className="search_stats_container">
             <h3 className="">
               { this.props.results.nbHits } jeux de données
               <span className="small"> trouvés</span>
             </h3>
             <Pagination results={ this.props.results }
                         helper={ this.props.helper }
                         showFirstLast={ false }
                         labels={ paginationLabels } />
           </div>;
  }
}

module.exports = SearchStats;
