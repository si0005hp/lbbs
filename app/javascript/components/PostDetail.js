import React, { Component } from 'react'
import MomentUtils from '../biz/moment-utils'


class PostDetail extends Component {

  render() {
    return (
      <div className="post-detail">
        <h1>{this.props.post.title}</h1>
        <h1>{this.props.post.body}</h1>
        <h1>{MomentUtils.fmtDate(this.props.post.created_at)}</h1>
      </div>
    )
  }
}

export default PostDetail