import React, { Component } from 'react'

class AccountMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
    }
  }

  showMenu = e => {
    e.preventDefault()
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }

  closeMenu = e => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu)
    })
  }

  render() {
    return (
      <div id="account-menu">
        <a id="menu-toggle" onClick={this.showMenu}>Account</a>
        {
          this.state.showMenu
            ? (
              <div className="menu-items-pane">
                <a className="menu-item" href="/users/edit">Edit</a>
                <a className="menu-item" href="/users/sign_out" data-method="delete">Logout</a>
              </div>
            )
            : (
              null
            )
        }
      </div>
    )
  }
}
export default AccountMenu