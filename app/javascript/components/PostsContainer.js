import React, { Component } from 'react'
import axios from 'axios'
import Post from './Post';
import AxiosUtils from '../biz/axios-utils'

class PostsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    const userId = this.props.userId
    const apiUrl = userId == null ?
      'http://localhost:3000/posts.json' :
      `http://localhost:3000/posts/user/${userId}`

    this.loadPosts(apiUrl)
  }

  loadPosts(apiUrl) {
    axios.get(apiUrl)
      .then(res => {
        console.log(res)
        this.setState({ posts: res.data })
      })
      .catch(error => AxiosUtils.fail(error))
  }

  render() {
    return (
      <div className="postsContainer">
        {this.state.posts.map((post) => {
          return (<Post post={post} key={post.id} />)
        })}
      </div>
    )
  }
}

export default PostsContainer