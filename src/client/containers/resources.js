import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/index';


class Resources extends Component {
  renderList() {
    return this.props.resources.map((resource) => {
      return (
        <li key={resource.name} className="list-group-item">{resource.name}</li>
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
    resources: state.resources
  };
}

export default connect(mapStateToProps, { fetchProjects })(Resources);