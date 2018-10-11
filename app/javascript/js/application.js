import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="main-header">
          <h1>Main Page</h1>
        </div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDom.render(<App />, document.getElementById('root'))
})