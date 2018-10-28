import React, { Component } from 'react'


const RETURN_KEY_CODE = 13

class GlobalSearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.validateOnInput)
  }

  validateOnInput = () => {
  }

  handleSearchSubmit = (e) => {
    let keyword = this.state.keyword
    location.assign(`/posts/search?keyword=${this.state.keyword}`)
  }

  handleKeyDown = (e) => {
    if (e.keyCode === RETURN_KEY_CODE) {
      this.handleSearchSubmit()
    }
  }

  render() {
    return (
      <div className="global-search-bar">
        <input id="global-search-edit" type="text" name="keyword"
          value={this.state.keyword}
          placeholder="input keyword to search"
          onChange={this.handleInput}
          onKeyDown={this.handleKeyDown} />
        <span id="global-search-btn"
          onClick={this.handleSearchSubmit} />
      </div>
    )
  }
}

export default GlobalSearchBar