import React, { Component } from 'react'


class Reply extends Component {

  render() {
    return (
      <div className="reply" id={this.props.reply.id} >
        <p className="body">{this.props.reply.body}</p>
        <time className="date">{this.props.reply.created_at}</time>
        <hr />
      </div>
    )
  }
}

export default Reply