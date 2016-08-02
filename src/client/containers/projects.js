import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/index';
import { bindActionCreators } from 'redux';


let id = 0;

class Projects extends Component {

  render() {
    return (
      <div>
      { this.props.projectList[0] ? this.props.projectList[0].map( project => {
        id++;
        return (
          <p key={id} className="list-group-item">{project.proj_name}</p>
        );
      } ) : null }

      </div>
    )
  }
}

export default connect(null, { fetchProjects })(Projects);