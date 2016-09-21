import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from 'CommentBox';


const App = React.createClass({
	render(){
		return (
		  <CommentBox />        
		);
	}
});
	

ReactDOM.render(<App />,
  document.getElementById('content')
);