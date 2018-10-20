import React, { Component } from 'react'
import MomentUtils from '../biz/moment-utils'
import Reply from './Reply';


class PostDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      replies: props.replies
    }
  }

  render() {
    return (
      <div className="post-detail">
        <div className="post-detail-root clearfix">
          <h1 className="title">{this.props.post.title}</h1>
          <p className="body">{this.props.post.body}</p>
          <time className="date">{MomentUtils.fmtDate(this.props.post.created_at)}</time>
        </div>
        <div className="post-detail-replies">
          <hr />
          {this.state.replies.map((reply) => {
            return (
              <div>
                <Reply reply={reply} key={reply.id} />
                <hr />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default PostDetail