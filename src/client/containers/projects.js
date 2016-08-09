import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject, fetchUserStories, createUserStory, deleteStory, updateStatus } from '../actions/index';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import customStyles from './dashboard';
import ProjectCreate from '../components/create_project';
import StoryCreate from '../components/create_user_story';
import Timeline from 'react-calendar-timeline';
import moment from 'moment';
import Dragula from 'dragula';

//groups are projects (each proj gets own group)g
// items are project timeline (start_time = start, end_time = end, title = proj_name, group is corresponding proj group#)

let itemIdCounter = 0;
let groupIdCounter = 0;

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
    this.itemCreate = this.itemCreate.bind(this);
    this.groupCreate = this.groupCreate.bind(this);
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
 
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance, document.querySelector('.left')], options)
    }
  };
  onDelete(projectId){
    this.props.deleteProject(projectId)
    .then(()=> {
      this.props.fetchProjects();
    })
  }

  itemCreate(p){
    let item = {id: itemIdCounter, title: p.proj_name, start_time: moment(p.start), end_time: moment(p.due), group: itemIdCounter};
    itemIdCounter++;
    return item;
  }

  groupCreate(p){
    console.log('IdCounter ', groupIdCounter);
    let group = {id: groupIdCounter, title: p.proj_name};
    groupIdCounter++;
    return group;
  }

  dragulaDecorator(componentBackingInstance){
  
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance, document.querySelector('.left')], options)
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
      <div id="projects-box">
      <h3>Projects</h3>  

      <Timeline 
       groups={this.props.projectList[0] ? this.props.projectList[0].map(this.groupCreate):[]}
       items={this.props.projectList[0] ? this.props.projectList[0].map(this.itemCreate):[]}
       defaultTimeStart={moment().add(-7, 'day')}
       defaultTimeEnd={moment().add(6, 'month')}
       sidebarWidth="200"
       lineHeight="100"
       minZoom="1000*60*60*24"
      /> 

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



