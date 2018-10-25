import React, { Component } from 'react'
import NewPostModal from './NewPostModal';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <header className="header">
        {/* global navi */}
        <div className="global-nav-container">
          <nav className="nav-left">
            <ul>
              <li className="nav-item active"><a href="/">HOME</a></li>
              <li className="nav-item"><a href="/i/posts">MY POSTS</a></li>
            </ul>
          </nav>
          <nav className="nav-right">
            <ul>
              <button id="new-post-btn" onClick={this.openModal}>POST</button>
            </ul>
          </nav>
        </div>
        {/* modal */}
        {this.state.isModalOpen &&
          <NewPostModal
            openModal={this.openModal}
            closeModal={this.closeModal}
            isModalOpen={this.state.isModalOpen} />
        }
      </header>
    )
  }
}

export default Header