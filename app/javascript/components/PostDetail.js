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

  componentDidMount() {
    this.setActionBtnVisible()
  }

  isMyPost() {
    return this.props.userId === this.props.post.user_id
  }

  setActionBtnVisible() {
    if (this.isMyPost()) {
      document.getElementById('post-detail-edit-btn').hidden = false
      document.getElementById('post-detail-delete-btn').hidden = false
    }
  }

  render() {
    return (
      <div className="post-detail">
        <div className="post-detail-root clearfix">
          <h1 className="title">{this.props.post.title}</h1>
          <p className="body">{this.props.post.body}</p>
          <div className="post-detail-footer clearfix">
            <a id="post-detail-reply-btn" className="post-detail-action-btn" href="">Reply</a>
            <a id="post-detail-edit-btn" className="post-detail-action-btn" href="" hidden>Edit</a>
            <a id="post-detail-delete-btn" className="post-detail-action-btn" href="" hidden>Delete</a>
            <time className="date">{MomentUtils.fmtDate(this.props.post.created_at)}</time>
          </div>
        </div>
        <div className="post-detail-replies">
          <hr />
          {this.state.replies.map((reply) => {
            return (
              <div key={reply.id}>
                <Reply reply={reply} userId={this.props.userId} />
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