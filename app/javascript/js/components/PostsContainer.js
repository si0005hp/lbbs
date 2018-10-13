import React, { Component } from 'react'
import axios from 'axios'
import Post from './Post';

class PostsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/posts.json')
      .then(response => {
        console.log(response)
        this.setState({ posts: response.data })
      })
      .catch(error => console.log(error))
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