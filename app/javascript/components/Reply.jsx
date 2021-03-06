import React, { Component } from 'react'
import MomentUtils from '../biz/moment-utils'
import axios from 'axios'
import AxiosUtils from '../biz/axios-utils'


class Reply extends Component {
  constructor(props) {
    super(props)
    this.originalBody = props.reply.body

    this.state = {
      isEditing: false,
      body: props.reply.body
    }
  }

  componentDidMount() {
    this.setActionBtnVisible()
  }

  isMyReply() {
    return this.props.userId === this.props.reply.user_id
  }

  setActionBtnVisible() {
    if (this.isMyReply()) {
      let replyElm = document.getElementById(`reply-${this.props.reply.id}`)
      let btnElms = replyElm.getElementsByClassName('post-reply-action-btn')
      for (let btn of btnElms) {
        btn.hidden = false
      }
    }
  }

  toggleEditing = (e) => {
    if (this.state.isEditing && !this.canProceedToCancel()) {
      return
    }
    this.resetReplyConent()
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  }

  cancelEditing = (e) => {
    if (this.canProceedToCancel()) {
      this.resetReplyConent()
      this.setState({ isEditing: false })
    }
  }

  canProceedToCancel() {
    if (this.isReplyConentChanged() &&
      !window.confirm('The change will be lost. Are you sure to cancel?')) {
      return false
    }
    return true
  }

  isReplyConentChanged() {
    return this.state.body !== this.originalBody
  }

  resetReplyConent() {
    this.setState({ body: this.originalBody })
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.validateOnInput)
  }

  validateOnInput = () => {
  }

  handleUpdSubmit = (e) => {
    if (!window.confirm('Update the reply?')) {
      return
    }
    axios.put(`http://localhost:3000/replies/${this.props.reply.id}`,
      {
        reply: {
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
    if (!window.confirm('Delete the reply?')) {
      return
    }
    axios.delete(`http://localhost:3000/replies/${this.props.reply.id}`)
      .then(res => {
        console.log(res)
        location.reload()
      })
      .catch(error => AxiosUtils.fail(error))
  }

  render() {
    return (
      <div className="post-reply clearfix" id={`reply-${this.props.reply.id}`} >
        {this.postReplyEditableParts()}
        <div className="post-reply-footer clearfix">
          <a className="post-reply-edit-btn post-reply-action-btn" hidden
            onClick={this.toggleEditing}>Edit</a>
          <a className="post-reply-delete-btn post-reply-action-btn" hidden
            onClick={this.handleDelSubmit}>Delete</a>
          <time className="date">{MomentUtils.fmtDate(this.props.reply.created_at)}</time>
        </div>
      </div>
    )
  }

  postReplyEditableParts() {
    return this.state.isEditing ?
      (
        <div className="post-reply-editing">
          <textarea name="body"
            value={this.state.body}
            onChange={this.handleInput} />
          <div className="clearfix">
            <button className="post-reply-editing-cancel-btn"
              onClick={this.cancelEditing}>CANCEL</button>
            <button className="post-reply-editing-update-btn"
              onClick={this.handleUpdSubmit}>UPDATE</button>
          </div>
        </div>
      ) :
      (
        <div className="post-reply-fixed">
          <p className="body">{this.props.reply.body}</p>
        </div>
      )
  }
}

export default Reply