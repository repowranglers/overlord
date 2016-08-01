import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Modal from 'react-modal';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { dashboardModal:  }

  }

  render() {
    return (
      <div>
        <nav className="navbar">
            <ul className="navbar-list">
              <li className="navbar-item navbar-header">Overlord</li>
              <button className="create-resource">Create Resource</button>
              <button className="create-project">Create Project</button>
            </ul>
        </nav>

        <h4 id="projects-header">Projects</h4>
        <Modal >

        <h4 id="resources-header">Resources</h4>
        <Modal >

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects
  };
}

export default Dashboard;