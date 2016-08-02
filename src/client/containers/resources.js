import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/index';

class Resources extends Component {
  render() {
    return (
      <div>
      { this.props.resourceList[0] ? this.props.resourceList[0].map( resource => {
        return (
          <ul key={resource.proj_name} className="list-group">
            <h5>{resource.res_name}</h5>
            <li className="list-group-item">{resource.start}</li>
            <li className="list-group-item">{resource.due}</li>
            <li className="list-group-item">{resource.status}</li>
          </ul>
        );
      } ) : null }

      </div>
    )
  }
} 


export default connect(mapStateToProps, { fetchProjects })(Resources);