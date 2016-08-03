import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/index';
import { deleteResource } from '../actions/index';

class Resources extends Component {

  render() {
    return (
      <div id="resources-box">

      <h3>Free Resources</h3>
      { this.props.resourceList ? this.props.resourceList.map( resource => {
        console.log('resource', resource);
        return (
          <ul key={resource.res_id} className="list-group">
            <li className="list-group-item">{resource.res_name}
            <button className="delete-btn" onClick={() => this.props.deleteResource(resource.res_id)}>Delete</button></li>
          </ul>
        );
      } ) : null }

      </div>
    )
  }
} 

export default connect(null, { fetchProjects, deleteResource })(Resources);