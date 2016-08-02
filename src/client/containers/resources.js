import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/index';

class Resources extends Component {
  render() {
    return (
      <div id="resources-box">

      <h3>Free Resources</h3>
      { this.props.resourceList ? this.props.resourceList.map( resource => {
        return (
          <ul key={resource.res_name} className="list-group">
            <li className="list-group-item">{resource.res_name}</li>
          </ul>
        );
      } ) : null }

      </div>
    )
  }
} 


export default connect(null, { fetchProjects })(Resources);