import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject, fetchUserStories, createUserStory, deleteStory, updateStatus } from '../actions/index';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import customStyles from './dashboard';
import ProjectCreate from '../components/create_project';
import StoryCreate from '../components/create_user_story';
import Dragula from 'react-dragula';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editProjectModal: false,
      createStoryModal: false,
      selectedProjID: 0 
    };
    this.showEditProjectModal = this.showEditProjectModal.bind(this);
    this.hideEditProjectModal = this.hideEditProjectModal.bind(this);
    this.showCreateStoryModal = this.showCreateStoryModal.bind(this);
    this.hideCreateStoryModal = this.hideCreateStoryModal.bind(this);
  }  

  showEditProjectModal(){
    this.setState({ editProjectModal: true });
  }

  hideEditProjectModal(){
    this.setState({ editProjectModal: false });
  }

  showCreateStoryModal(projectId){
    this.setState({ createStoryModal: true,
      selectedProjID: projectId
     });
  }

  hideCreateStoryModal(){
    this.setState({ createStoryModal: false });
  }

  remainingDays(dueDate){
   var today = new Date()
   var dueFormatted = new Date(dueDate)
   var remainingMS = dueFormatted - today
   var remainingDays = Math.ceil(remainingMS / (1000*60*60*24))
   return remainingDays
  }
   dragulaDecorator(componentBackingInstance){
    console.log('projects', componentBackingInstance)
    if (componentBackingInstance) {
      let options = { };
     // Dragula([document.querySelector('.left'),document.querySelector(', document.querySelector('.right')], options)
      Dragula([componentBackingInstance, document.querySelector('.left')], options);
    }
  };
  render() {
    return (
      <div id="projects-box">

      <h3>Projects</h3>

      { this.props.projectList[0] ? this.props.projectList[0].map( project => {

        return (
          <div>
          <ul key={project.proj_name} className="list-group">
            <button className="delete-btn" onClick={() => this.props.deleteProject(project.project_id)}>Delete</button>
            <h5 className="proj-name">{project.proj_name}</h5>
            <button className="button proj-edit" onClick={this.showEditProjectModal}>Edit</button>
            <li className="list-group-item">{this.remainingDays(project.due)} DAYS LEFT!</li>
            <li className="list-group-item">{project.start.split('T')[0]}</li>
            <li className="list-group-item">{project.due.split('T')[0]}</li>
            <li className="list-group-item">{project.status}</li>
            <button className="button story-create" onClick={() => this.showCreateStoryModal(project.project_id)}>Create Story</button>
          </ul> 

            <div>
            <p>Resources on Projects</p>
            <div key={project.proj_name} className='right container' ref={this.dragulaDecorator}>
                <div className="item"> TEST1 </div>
                <div className="item"> test2 </div>
                <div className="item"> TEST3 </div>
            </div>
            </div>
          </div>
        );
      } ) : null }

      <Modal
        isOpen={this.state.editProjectModal}
        onRequestClose={this.hideEditProjectModal}
        style={customStyles} >
        <ProjectCreate />
      </Modal>
      <Modal
        isOpen={this.state.createStoryModal}
        onRequestClose={this.hideCreateStoryModal}
        style={customStyles} >
        <StoryCreate proj_id={this.state.selectedProjID} closeCreateStoryModal={this.hideCreateStoryModal.bind(this)} />
      </Modal>

      </div>
    )
  }
}

export default connect(null, { fetchProjects, deleteProject, fetchUserStories, createUserStory, deleteStory, updateStatus })(Projects);



