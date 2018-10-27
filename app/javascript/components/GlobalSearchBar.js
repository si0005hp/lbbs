import React, { Component } from 'react'


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

  render() {
    return (
      <div className="global-search-bar">
        <input id="global-search-edit" type="text" name="keyword"
          value={this.state.keyword}
          onChange={this.handleInput} />
        <span id="global-search-btn"
          onClick={this.handleSearchSubmit}>
        </span>
      </div>
    )
  }
}

export default GlobalSearchBar