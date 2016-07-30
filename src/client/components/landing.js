import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '30%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = { signInModal: false };

    this.showSignInModal = this.showSignInModal.bind(this);
    this.hideSignInModal = this.hideSignInModal.bind(this);
  }

  showSignInModal() {
    this.setState({ signInModal: true });
  }

  hideSignInModal() {
    this.setState({ signInModal: false });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
            <ul className="navbar-list">
              <li className="navbar-item navbar-header">Overlord</li>
              <button onClick={this.showSignInModal.bind(this)} className="navbar-item">Sign In</button>
            </ul>
        </nav>

        <h2 id="top-header">Streamline Your Project Management</h2>

        <Modal
          isOpen={this.state.signInModal}
          onRequestClose={this.hideSignInModal}
          style={customStyles}
        >
          <div>
          <button className="button-primary">Log in with Github</button>
          <img className="modal-img" src='/images/github-logo.png' onClick={console.log('hi')}/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Landing;