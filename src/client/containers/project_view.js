import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import Projects from './projects';
import Resources from './resources';
import ResourceView from './resource_project_view';
import StoryCreate from '../components/create_user_story';
import { fetchProjects } from '../actions/project_actions';
import { fetchResources } from '../actions/resources_actions';
import { fetchProject } from '../actions/project_actions';

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createStoryModal: false,
      selectedProjID: 0
    };

  }

  componentDidMount(){
    this.props.fetchProject(this.props.params.projID);
    setTimeout(()=>{
      console.log('this.props', this.props);
    }, 2000)
  }

  render() {
    return (
      <div>
        <a className="button button-primary" href='/logout'>Logout</a>
        <a className="button button-primary" href='/dashboard'>Projects Dashboard</a>
        <h2 className="dashboard-header">{this.props.activeProject[0] ? this.props.activeProject[0][0].proj_name : null}</h2>
        <h4 className="start-date">Start Date: {this.props.activeProject[0] ? this.props.activeProject[0][0].start : null}</h4>
        <h4 className="start-date">Due Date: {this.props.activeProject[0] ? this.props.activeProject[0][0].due : null}</h4>
        <h4 className="start-date">Status: {this.props.activeProject[0] ? this.props.activeProject[0][0].status : null}</h4>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeProject: state.activeProject,
    resources: state.resources
  };
}


export default connect(mapStateToProps, { fetchProject, fetchProjects, fetchResources })(ProjectView);
