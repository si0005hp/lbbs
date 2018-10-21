import React, { Component } from 'react'
import MomentUtils from '../biz/moment-utils'
import Reply from './Reply';


class PostDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      replies: props.replies,
      isEditing: false,
      title: props.post.title,
      body: props.post.body
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

  toggleEditing = (e) => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  }

  cancelEditing = (e) => {
    this.setState({ isEditing: false })
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.validateOnInput)
  }

  validateOnInput = () => {
  }

  render() {
    return (
      <div className="post-detail">
        <div className="post-detail-root clearfix">
          {this.postDetailEditableParts()}
          <div className="post-detail-footer clearfix">
            <a id="post-detail-reply-btn" className="post-detail-action-btn" href="">Reply</a>
            <a id="post-detail-edit-btn" className="post-detail-action-btn" hidden
              onClick={this.toggleEditing}>Edit</a>
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

  postDetailEditableParts() {
    return this.state.isEditing ?
      (
        <div className="post-detail-editing">
          <input type="text" name="title"
            value={this.state.title}
            onChange={this.handleInput} />
          <textarea name="body"
            value={this.state.body}
            onChange={this.handleInput} />
          <div>
            <button>UPDATE</button>
            <button onClick={this.cancelEditing}>CANCEL</button>
          </div>
        </div>
      ) :
      (
        <div className="post-detail-fixed">
          <h1 className="title">{this.props.post.title}</h1>
          <p className="body">{this.props.post.body}</p>
        </div>
      )
  }
}

export default PostDetail