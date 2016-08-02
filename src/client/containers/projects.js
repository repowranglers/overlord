import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/index';
import { bindActionCreators } from 'redux';

class Projects extends Component {
  render() {
    return (
      <div>
      { this.props.projectList[0] ? this.props.projectList[0].map( project => {
        return (
          <ul key={project.proj_name} className="list-group">
            <h5>{project.proj_name}</h5>
            <li className="list-group-item">{project.start}</li>
            <li className="list-group-item">{project.due}</li>
            <li className="list-group-item">{project.status}</li>
          </ul>
        );
      } ) : null }

      </div>
    )
  }
}

export default connect(null, { fetchProjects })(Projects);