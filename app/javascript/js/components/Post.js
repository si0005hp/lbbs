import React, { Component } from 'react'

class Post extends Component {

  render() {
    return (
      <div className="post" >
        <h1>{this.props.post.title}</h1>
        <p>{this.props.post.body}</p>
      </div>
    )
  }
}

export default Post