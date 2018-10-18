import React, { Component } from 'react'
import * as moment from 'moment'

class Post extends Component {

  fmtDate(date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
  }

  render() {
    return (
      <div className="post" >
        <a className="title" href={"/posts/" + this.props.post.id} target="_blank">
          <h1>{this.props.post.title}</h1>
        </a>
        <p className="body">{this.props.post.body}</p>
        <time className="date">{this.fmtDate(this.props.post.created_at)}</time>
      </div>
    )
  }
}

export default Post