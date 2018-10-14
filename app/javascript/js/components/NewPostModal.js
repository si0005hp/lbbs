import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

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
};

class NewPostModal extends React.Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="NewPostModal">

        <div className="new-post-modal-content">
          <div className="new-post-header">
            <h1 ref={subtitle => this.subtitle = subtitle}>New Post</h1>
            <span onClick={this.props.closeModal}>×</span>
          </div>
          <form className="new-post-form">
            <input type="text" name="title" placeholder="Title" />
            <textarea name="body" placeholder="Content"></textarea>
          </form>
          <div className="new-post-toolbar">
            <button>Submit</button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default NewPostModal