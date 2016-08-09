import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import Projects from './projects';
import Resources from './resources';
import ResourceView from './resource_project_view';
import ProjectCreate from '../components/create_project';
import ResourceCreate from '../components/create_resource';
import { fetchProjects, fetchResources } from '../actions/index';

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

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { CreateResourceModal: false };
    this.state = { CreateProjectModal: false }

    this.showCreateResourceModal = this.showCreateResourceModal.bind(this);
    this.hideCreateResourceModal = this.hideCreateResourceModal.bind(this);
    this.showCreateProjectModal = this.showCreateProjectModal.bind(this);
    this.hideCreateProjectModal = this.hideCreateProjectModal.bind(this);

  }

  componentDidMount(){
    this.props.fetchProjects();
    this.props.fetchResources();
  }

  showCreateResourceModal() {
    this.setState({ CreateResourceModal: true });
  }

  hideCreateResourceModal() {
    this.setState({ CreateResourceModal: false });
    this.props.fetchResources();
  }

  showCreateProjectModal() {
    this.setState({ CreateProjectModal: true });
  }

  hideCreateProjectModal() {
    this.setState({ CreateProjectModal: false });
    this.props.fetchProjects();
  }

  render() {
    return (
      <div>
        <a className="button button-primary" href='/logout'>Logout</a>
        <button id="create-res" className="button-primary" onClick={this.showCreateResourceModal.bind(this)}>Create Resource</button>   
        <button id="create-proj" className="button-primary" onClick={this.showCreateProjectModal.bind(this)}>Create Project</button>
        <h2 className="dashboard-header">Rule your Empire!</h2>
        <Modal
          isOpen={this.state.CreateResourceModal}
          onRequestClose={this.hideCreateResourceModal}
          style={customStyles}
        ><ResourceCreate closeResourceModal={this.hideCreateResourceModal.bind(this)} />
        </Modal>
        <Modal
          isOpen={this.state.CreateProjectModal}
          onRequestClose={this.hideCreateProjectModal}
          style={customStyles}
        >
          <ProjectCreate closeProjectModal={this.hideCreateProjectModal.bind(this)} />
        </Modal>
        <div className="lists">

          <Resources resourceList={this.props.resources[0]} projectList={this.props.projects[0]} />
        <ResourceView projectList={this.props.projects} />

        </div>
          <Projects projectList={this.props.projects} />
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


export default connect(mapStateToProps, { fetchProjects, fetchResources })(Dashboard);