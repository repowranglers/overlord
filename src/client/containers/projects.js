import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/index';
import { bindActionCreators } from 'redux';
import { deleteProject } from '../actions/index';

class Projects extends Component {
  render() {
    return (
      <div id="projects-box">

      <h3>Projects</h3>

      { this.props.projectList[0] ? this.props.projectList[0].map( project => {
        return (
          <ul key={project.proj_name} className="list-group">
            <h5>{project.proj_name}</h5>
            <li className="list-group-item">{project.start}</li>
            <li className="list-group-item">{project.due}</li>
            <li className="list-group-item">{project.status}</li>
            <li className="list-group-item">{project.project_name}
            <button className="delete-btn" onClick={() => this.props.deleteProject(project.project_id)}>Delete</button></li>
          </ul> 
        );
      } ) : null }

      </div>
    )
  }
}

export default connect(null, { fetchProjects, deleteProject })(Projects);