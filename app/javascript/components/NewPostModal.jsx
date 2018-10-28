import React from "react";
import Modal from "react-modal";
import axios from 'axios'
import AxiosUtils from '../biz/axios-utils'


Modal.setAppElement("#root")

const customStyles = {
  overlay: {
    zIndex: "100",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  content: {
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
}

class NewPostModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: ''
    }
  }

  afterOpenModal = () => {
    document.getElementById("new-post-submit-btn").disabled = true
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.validateOnInput)
  }

  validateOnInput = () => {
    if (this.state.title === '' || this.state.body === '') {
      document.getElementById("new-post-submit-btn").disabled = true
    } else {
      document.getElementById("new-post-submit-btn").disabled = false
    }
  }

  handleNewSubmit = (e) => {
    if (!window.confirm('Submit new post?')) {
      return
    }
    axios.post('http://localhost:3000/posts',
      {
        post: {
          title: this.state.title,
          body: this.state.body
        }
      })
      .then(res => {
        console.log(res)
        this.props.closeModal()
        location.assign('/')
      })
      .catch(error => AxiosUtils.fail(error))
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.props.closeModal}
        onAfterOpen={this.afterOpenModal}
        style={customStyles}
        contentLabel="NewPostModal">

        <div className="new-post-modal-content">
          <div className="new-post-header">
            <h1 ref={subtitle => this.subtitle = subtitle}>New Post</h1>
            <span onClick={this.props.closeModal}>×</span>
          </div>
          <form className="new-post-form">
            <input type="text" name="title" placeholder="Title"
              value={this.state.title}
              onChange={this.handleInput} />
            <textarea name="body" placeholder="Content"
              value={this.state.body}
              onChange={this.handleInput} />
          </form>
          <div className="new-post-toolbar">
            <button id="new-post-submit-btn"
              onClick={this.handleNewSubmit}
            >Submit</button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default NewPostModal