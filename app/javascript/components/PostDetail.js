import React, { Component } from 'react'
import MomentUtils from '../biz/moment-utils'
import Reply from './Reply';
import axios from 'axios'
import AxiosUtils from '../biz/axios-utils'


class PostDetail extends Component {
  constructor(props) {
    super(props)
    this.originalTitle = props.post.title
    this.originalBody = props.post.body

    this.state = {
      title: props.post.title,
      body: props.post.body,
      replies: props.replies,
      isEditing: false,
      isReplying: false,
      preparingReplyBody: ''
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
    if (this.state.isEditing && !this.canProceedToCancel(this.isPostConentChanged)) {
      return
    }
    this.resetPostConent()
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  }

  cancelEditing = (e) => {
    if (this.canProceedToCancel(this.isPostConentChanged)) {
      this.resetPostConent()
      this.setState({ isEditing: false })
    }
  }

  canProceedToCancel(isContentChanged) {
    if (isContentChanged() &&
      !window.confirm('The change will be lost. Are you sure to cancel?')) {
      return false
    }
    return true
  }

  isPostConentChanged = () => {
    return this.state.title !== this.originalTitle || this.state.body !== this.originalBody
  }

  resetPostConent() {
    this.setState({ title: this.originalTitle, body: this.originalBody })
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.validateOnInput)
  }

  validateOnInput = () => {
  }

  handleUpdSubmit = (e) => {
    if (!window.confirm('Update the post?')) {
      return
    }
    axios.put(`http://localhost:3000/posts/${this.props.post.id}`,
      {
        post: {
          title: this.state.title,
          body: this.state.body
        }
      })
      .then(res => {
        console.log(res)
        location.reload()
      })
      .catch(error => AxiosUtils.fail(error))
  }

  handleDelSubmit = (e) => {
    if (!window.confirm('Delete the post?')) {
      return
    }
    axios.delete(`http://localhost:3000/posts/${this.props.post.id}`)
      .then(res => {
        console.log(res)
        location.replace('/')
      })
      .catch(error => AxiosUtils.fail(error))
  }

  toggleReplying = (e) => {
    if (this.state.isReplying && !this.canProceedToCancel(this.isPreparingReplyConentChanged)) {
      return
    }
    this.setState({ preparingReplyBody: '' })
    this.setState(prevState => ({
      isReplying: !prevState.isReplying
    }));
  }

  cancelReplying = (e) => {
    if (this.canProceedToCancel(this.isPreparingReplyConentChanged)) {
      this.setState({ preparingReplyBody: '', isReplying: false })
    }
  }

  isPreparingReplyConentChanged = () => {
    return this.state.preparingReplyBody !== ''
  }

  handleNewSubmit = (e) => {
    if (!window.confirm('Submit new reply?')) {
      return
    }
    axios.post(`http://localhost:3000/replies`,
      {
        reply: {
          body: this.state.preparingReplyBody
        }
      })
      .then(res => {
        console.log(res)
        location.reload()
      })
      .catch(error => AxiosUtils.fail(error))
  }

  render() {
    return (
      <div className="post-detail">
        <div className="post-detail-root clearfix">
          {this.postDetailEditableParts()}
          <div className="post-detail-footer clearfix">
            <a id="post-detail-reply-btn" className="post-detail-action-btn"
              onClick={this.toggleReplying}>Reply</a>
            <a id="post-detail-edit-btn" className="post-detail-action-btn" hidden
              onClick={this.toggleEditing}>Edit</a>
            <a id="post-detail-delete-btn" className="post-detail-action-btn" hidden
              onClick={this.handleDelSubmit}>Delete</a>
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
        {this.preparingReply()}
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
          <div className="clearfix">
            <button id="post-detail-editing-cancel-btn"
              onClick={this.cancelEditing}>CANCEL</button>
            <button id="post-detail-editing-update-btn"
              onClick={this.handleUpdSubmit}>UPDATE</button>
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

  preparingReply() {
    if (this.state.isReplying) {
      return (
        <div className="post-detail-replying">
          <textarea name="preparingReplyBody"
            value={this.state.preparingReplyBody}
            onChange={this.handleInput} />
          <div className="clearfix">
            <button id="post-detail-editing-cancel-btn"
              onClick={this.cancelReplying}>CANCEL</button>
            <button id="post-detail-editing-update-btn"
              onClick={this.handleNewSubmit}>SUBMIT</button>
          </div>
        </div>
      )
    }
  }
}

export default PostDetail