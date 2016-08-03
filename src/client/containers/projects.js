import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject } from '../actions/index';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import customStyles from './dashboard';
import ProjectCreate from '../components/create_project';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { editProjectModal: false };
    this.showEditProjectModal = this.showEditProjectModal.bind(this);
    this.hideEditProjectModal = this.hideEditProjectModal.bind(this);
  }  

  showEditProjectModal(){
    this.setState({ editProjectModal: true });
  }

  hideEditProjectModal(){
    this.setState({ editProjectModal: false });
  }


  render() {
    return (
      <div id="projects-box">

      <h3>Projects</h3>

      { this.props.projectList[0] ? this.props.projectList[0].map( project => {
        let start = project.start.split('T')[0];
        let due = project.due.split('T')[0];

        let today = new Date();

        console.log('today ' , today);
        // let daysLeft = 

        return (
          <ul key={project.proj_name} className="list-group">
            <h5>{project.proj_name}</h5>
            <button className="button proj-edit" onClick={this.showEditProjectModal}>Edit</button>
            <li className="list-group-item">{due - start} DAYS LEFT TILL DESTRUCTION!!!</li>
            <li className="list-group-item">{start}</li>
            <li className="list-group-item">{due}</li>
            <li className="list-group-item">{project.status}</li>
            <li className="list-group-item">{project.project_name}
            <button className="delete-btn" onClick={() => this.props.deleteProject(project.project_id)}>Delete</button></li>
          </ul> 
        );
      } ) : null }

      <Modal
        isOpen={this.state.editProjectModal}
        onRequestClose={this.hideEditProjectModal}
        style={customStyles} >
        <ProjectCreate />
      </Modal>

      </div>
    )
  }
}

export default connect(null, { fetchProjects, deleteProject })(Projects);