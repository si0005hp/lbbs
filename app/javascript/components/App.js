import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Header from './Header';
import PostsContainer from './PostsContainer';

class App extends Component {
  render() {
    return (
      <div className="main">
        <Header userId={this.props.userId} />
        <PostsContainer userId={this.props.userId} />
      </div>
    )
  }
}

// ReactDom.render(<App />, document.getElementById('root'))
export default App