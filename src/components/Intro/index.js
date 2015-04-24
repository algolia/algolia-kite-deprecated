"use strict";
var React = require( "react" );

class Intro extends React.Component {
  render() {
    return <div className="header col-md-12">
             <h1 className="app-name">Find the speaker!</h1>
             <p className="tag-line">An <img src="images/irce-logo-small.png" alt="irce"/> app powered by <img src="images/Algolia_logo_bg-dark.jpg" alt="algolia" /></p>
           </div>;
  }
}

module.exports = Intro;
