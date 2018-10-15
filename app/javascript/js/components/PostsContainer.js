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
    axios.get('http://localhost:3000/posts.json')
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