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
    console.log(keyword)
    location.assign(`/search?keyword=${keyword}`)
  }

  render() {
    return (
      <div id="global-search-bar">
        <input type="text" name="keyword"
          value={this.state.keyword}
          onChange={this.handleInput} />
        <button onClick={this.handleSearchSubmit}>SEARCH</button>
      </div>
    )
  }
}

export default GlobalSearchBar