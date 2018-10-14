import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="global-nav-container">
          <nav className="nav-left">
            <ul>
              <li className="nav-item active"><a>HOME</a></li>
              <li className="nav-item"><a>MY POSTS</a></li>
            </ul>
          </nav>
          <nav className="nav-right">
            <ul>
              <button id="new-post-btn">POST</button>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header