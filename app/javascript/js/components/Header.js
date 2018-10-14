import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav className="global-nav">
          <ul>
            <li className="nav-item active"><a>HOME</a></li>
            <li className="nav-item"><a>MY POSTS</a></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header