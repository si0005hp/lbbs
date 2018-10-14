import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    zIndex: "100",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "15px",
    transform: "translate(-50%, -50%)"
  }
};

class NewPostModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isModalOpen}
          onRequestClose={this.props.closeModal}
          style={customStyles}
          contentLabel="NewPostModal">

          <h1 ref={subtitle => this.subtitle = subtitle}>New Post</h1>
          <button onClick={this.props.closeModal}>Close</button>
          <form>
            <input type="text" name="title" placeholder="Title" />
            <textarea name="body" placeholder="Content"></textarea>
          </form>
          <div>
            <button>Submit</button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default NewPostModal