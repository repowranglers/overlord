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
import { fetchProject } from '../actions/index';

export const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '30%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createStoryModal: false,
      selectedProjID: 0
    };

  }

  componentDidMount(){
    this.props.fetchProjects();
    console.log('this.props', this.props.projects);
  }

  render() {
    return (
      <div>
        <a className="button button-primary" href='/logout'>Logout</a>
        <a className="button button-primary" href='/dashboard'>Projects Dashboard</a>
        <h2 className="dashboard-header">Project Overview</h2>
           
          <Projects projectList={this.props.projects} />
        <div className="lists">

          
          <ResourceView projectList={this.props.projects} />

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
    resources: state.resources
  };
}


export default connect(mapStateToProps, { fetchProject, fetchProjects, fetchResources })(ProjectView);
