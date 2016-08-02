import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { githubLogin } from '../actions/index';
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
                <a className="button button-primary" href='/auth/github'>Login with GitHub</a> 
            </ul>
        </nav>

        <h2 className="top-header">Streamline Your Project Management</h2>

        <Modal
          isOpen={this.state.signInModal}
          onRequestClose={this.hideSignInModal}
          style={customStyles}>
          <div>
          <button className="button-primary" onClick={this.props.githubLogin.bind(this)}>Log in with Github</button>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // Whenever is returned will show up as props
  // inside of BookList

  return {
    user: state.user
  };
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever selectbook is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ githubLogin }, dispatch);
}

// Promote BookList from a component to a cotainer - it needs to
// about this new dispatch method, selectBook. Make it available
// as a prop
export default connect(mapStateToProps, mapDispatchToProps)(Landing);