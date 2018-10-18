import React, { Component } from 'react'
import MomentUtils from '../biz/moment-utils'


class PostDetail extends Component {

  render() {
    return (
      <div className="post-detail clearfix">
        <h1 className="title">{this.props.post.title}</h1>
        <p className="body">{this.props.post.body}</p>
        <time className="date">{MomentUtils.fmtDate(this.props.post.created_at)}</time>
      </div>
    )
  }
}

export default PostDetail