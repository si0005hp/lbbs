import React, { Component } from 'react'
import * as moment from 'moment'

class Post extends Component {

  fmtDate(date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
  }

  setClampVisible() {
    let postElm = document.getElementById(`post-${this.props.post.id}`)
    let postContentElm = postElm.getElementsByClassName('post-content')[0]

    let titleElm = postContentElm.getElementsByClassName('title')[0]
    let bodyElm = postContentElm.getElementsByClassName('body')[0]

    if (titleElm.clientHeight + bodyElm.clientHeight > postContentElm.clientHeight) {
      let clampElm = postElm.getElementsByClassName('clamp')[0]
      clampElm.hidden = false
    }
  }

  componentDidMount() {
    this.setClampVisible()
  }

  render() {
    return (
      <div className="post" id={`post-${this.props.post.id}`} >
        <div className="post-content">
          <a className="title" href={"/posts/" + this.props.post.id} target="_blank">
            <h1>{this.props.post.title}</h1>
          </a>
          <p className="body">{this.props.post.body}</p>
        </div>
        <span className="clamp" hidden>...</span>
        <time className="date">{this.fmtDate(this.props.post.created_at)}</time>
      </div>
    )
  }
}

export default Post