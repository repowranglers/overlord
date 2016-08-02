import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import Projects from './projects';
import Resources from './resources';
import ProjectCreate from '../components/create_project';
import ResourceCreate from '../components/create_resource';
import { fetchProjects } from '../actions/index';

const customStyles = {
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
  }

  showCreateResourceModal() {
    this.setState({ CreateResourceModal: true });
  }

  hideCreateResourceModal() {
    this.setState({ CreateResourceModal: false });
  }

  showCreateProjectModal() {
    this.setState({ CreateProjectModal: true });
  }

  hideCreateProjectModal() {
    this.setState({ CreateProjectModal: false });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
            <ul className="navbar-list">
              <Link to="/" className="navbar-item navbar-header">Overlord</Link>
              <button className="button-primary" onClick={this.showCreateResourceModal.bind(this)}className="create-resource">Create Resource</button>
              <button className="button-primary" onClick={this.showCreateProjectModal.bind(this)}className="create-project">Create Project</button>
            </ul>
        </nav>

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

        <h3 id="projects-header">Projects</h3>
        <h3 id="projects-header">Projects</h3>

          <Projects projectList={this.props.projects} />
        
        <h3 id="resources-header">Resources</h3>
          <Resources />
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


export default connect(mapStateToProps, { fetchProjects })(Dashboard);