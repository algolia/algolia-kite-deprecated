var React = require( "react" );

var hogan = require( "hogan.js" );

var HoganResult = React.createClass( {
  componentWillMount : function(){
    this.setState( {
      template : hogan.compile( this.props.template )
    } );
  },
  render : function(){
    var content = this.state.template.render( this.props.data );
    return <div dangerouslySetInnerHTML={{ __html : content }} />;
  }
} );

module.exports = HoganResult;
