import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class Landing extends Component {
  // componentWillMount() {
  //   this.props
  // }

  render() {
    return (
      <div>
        <ul className="navbar">
          <li>Overlord</li>
          <li>Sign In</li>
          <li>Sign Up</li>
        </ul>

        <h2>Streamline Your Project Management</h2>
      </div>
    );
  }
}

export default Landing;