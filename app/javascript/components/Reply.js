import React, { Component } from 'react'
import MomentUtils from '../biz/moment-utils'


class Reply extends Component {

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

  render() {
    return (
      <div className="post-reply clearfix" id={`reply-${this.props.reply.id}`} >
        <p className="body">{this.props.reply.body}</p>
        <div className="post-reply-footer clearfix">
          <a className="post-reply-edit-btn post-reply-action-btn" hidden>Edit</a>
          <a className="post-reply-delete-btn post-reply-action-btn" hidden>Delete</a>
          <time className="date">{MomentUtils.fmtDate(this.props.reply.created_at)}</time>
        </div>
      </div>
    )
  }
}

export default Reply