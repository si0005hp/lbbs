import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Header from './components/Header';
import PostsContainer from './components/PostsContainer';

class App extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <PostsContainer />
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDom.render(<App />, document.getElementById('root'))
})