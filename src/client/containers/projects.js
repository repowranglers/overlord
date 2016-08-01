import React, { Component } from 'react';
import { connect } from 'react-redux';

class Projects extends Component {
  renderList() {
    return this.props.projects.map((project) => {
      return (
        <li key={project.name} className="list-group-item">{project.name}</li>
      );
    });
  }

  render() {
    return (
      <ul className="list-group">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
  	projects: state.projects
  };
}

export default connect(mapStateToProps)(Projects);