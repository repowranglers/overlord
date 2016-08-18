import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject } from '../actions/project_actions';
import { fetchUserStories, createUserStory, deleteStory, updateStatus } from '../actions/story_actions';
import { assignResource } from '../actions/resources_actions';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { Link } from 'react-router';
import customStyles from './dashboard';
import ProjectCreate from '../components/create_project';
import StoryCreate from '../components/create_user_story';
import Dragula from 'react-dragula';

class ResourceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProjectModal: false,
      createStoryModal: false,
      selectedProjID: 0,
      reateProjectModal: false
    };

    this.showCreateProjectModal = this.showCreateProjectModal.bind(this);
    this.hideCreateProjectModal = this.hideCreateProjectModal.bind(this);
    this.showEditProjectModal = this.showEditProjectModal.bind(this);
    this.hideEditProjectModal = this.hideEditProjectModal.bind(this);
    this.showCreateStoryModal = this.showCreateStoryModal.bind(this);
    this.hideCreateStoryModal = this.hideCreateStoryModal.bind(this);
    // need to provide this component to the dragulaDecorator
    this.dragulaDecorator = this.dragulaDecorator.bind(this);
  }

  showCreateProjectModal() {
    this.setState({ CreateProjectModal: true });
  }

  hideCreateProjectModal() {
    this.setState({ CreateProjectModal: false });
    this.props.fetchProjects();
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
    
    let assignResource = this.props.assignResource;
    let fetchProjects = this.props.fetchProjects;
      // code below was an attempt to map every node to an array

      // let drop = this.props.projectList[0] ? this.props.projectList[0].map( project => {
      //   return  document.querySelector(  `right${project.project_id}` )
      //  }) : null;
      
    if (componentBackingInstance) {
      // for demonstration purposes.
      // work around to be able to drag resources between projects.
      // functional up to 21 projects. After that one must clear database.
      let arrayy = [
      document.querySelector('.left'), document.querySelector('.right1'),
      document.querySelector('.right2'), document.querySelector('.right3'),
      document.querySelector('.right4'), document.querySelector('.right5'),
      document.querySelector('.right6'), document.querySelector('.right7'),
      document.querySelector('.right8'), document.querySelector('.right9'),
      document.querySelector('.right10'), document.querySelector('.right11'),
      document.querySelector('.right12'), document.querySelector('.right13'),
      document.querySelector('.right14'), document.querySelector('.right15'),
      document.querySelector('.right16'), document.querySelector('.right17'),
      document.querySelector('.right18'), document.querySelector('.right19'),
      document.querySelector('.right20'), document.querySelector('.right21')
      ]

      Dragula([componentBackingInstance].concat(arrayy))
      .on('drop', function(el, target){
        if(target !== document.querySelector('.fire')){
         
        assignResource(el.id, target.id);
        
        }
      })
    }
  };
    onDelete(projectId){
    this.props.deleteProject(projectId)
    .then(()=> {
      this.props.fetchProjects();
    })
  }


  render() {
    return (
      <div id="projects-resources">
      
      <h3 className="title">Projects</h3>
      <button id="create-proj" className="btn red" onClick={this.showCreateProjectModal.bind(this)}><div className="hover"><span></span><span></span><span></span><span></span><span></span></div>Create Project</button>
      <div className="project-list">
      { this.props.projectList[0] ? this.props.projectList[0].map( project => {
  
        return (
          <div key={project.proj_name} className="individual-project">
            <Link to={"/project_view"+project.project_id} className="proj-name">{project.proj_name}</Link>
            <p className="">{this.remainingDays(project.due)} DAYS LEFT!</p>
            <div>
            <div id={project.project_id} key={project.project_id} className={`right${project.project_id} container`} ref={this.dragulaDecorator}>
                 Drag Resource Here <br/>
                 { project.resources ? project.resources.filter(r => r.res_name !== '').map( r => {
            return (
            <div id={r.res_id} className="item image-thing" key={r.res_name}><img src= {`/images/${r.res_img}`}></img> <br/> {r.res_name}
            </div>
          );
        } ) : null }
            </div>
            </div>
          </div>
        );
      } ) : null }
      </div>

      <Modal
        isOpen={this.state.CreateProjectModal}
        onRequestClose={this.hideCreateProjectModal}
        style={customStyles}
      >
        <ProjectCreate closeProjectModal={this.hideCreateProjectModal.bind(this)} />
      </Modal>
      
      </div>
    )
  }
}

export default connect(null, { assignResource, fetchProjects, deleteProject, fetchUserStories, createUserStory, deleteStory, updateStatus })(ResourceView);
