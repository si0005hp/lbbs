import React, { Component } from 'react'
import * as moment from 'moment'

class Post extends Component {

  fmtDate(date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
  }

  render() {
    return (
      <a className="post" >
        <h1 className="title">{this.props.post.title}</h1>
        <p className="body">{this.props.post.body}</p>
        <time className="date">{this.fmtDate(this.props.post.created_at)}</time>
      </a>
    )
  }
}

export default Post