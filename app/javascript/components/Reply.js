import React, { Component } from 'react'
import MomentUtils from '../biz/moment-utils'


class Reply extends Component {

  render() {
    return (
      <div className="reply clearfix" id={this.props.reply.id} >
        <p className="body">{this.props.reply.body}</p>
        <time className="date">{MomentUtils.fmtDate(this.props.reply.created_at)}</time>
      </div>
    )
  }
}

export default Reply