import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import Projects from './projects';
import Resources from './resources';
import customStyles from './dashboard';
import ProjectCreate from '../components/create_project';
import ResourceView from './resource_project_view';
import StoryCreate from '../components/create_user_story';
import BurnDown from './burndown';
import UpdateStoryDescription from '../components/update_story_description';
import { fetchProjects, fetchProject, deleteProject } from '../actions/project_actions';
import { fetchResources } from '../actions/resources_actions';
import { fetchUserStories, createUserStory, deleteStory, updateDescription } from '../actions/story_actions';

class ProjectView extends Component {
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
    this.hideUpdateDescriptionModal = this.hideCreateStoryModal.bind(this);
    this.showUpdateDescriptionModal = this.showCreateStoryModal.bind(this);
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
    this.setState({ createStoryModal: false })
  }

  showUpdateDescriptionModal(storyId) {
    this.setState({ UpdateDescriptionModal: true, storyId: storyId });
  }

  hideUpdateDescriptionModal() {
    this.setState({ UpdateDescriptionModal: false });
  }

  showUpdateStatusModal() {
    this.setState({ UpdateStatusModal: true });
  }

  hideUpdateStatusModal() {
    this.setState({ UpdateStatusModal: false });
  }


  onDelete(projectId){
    this.props.deleteProject(this.props.params.projID)
    .then(()=> {
      this.props.fetchProject();

    })
  }

  onDeleteStory(story_id){
    this.props.deleteStory()
    .then(()=> {
      this.props.fetchUserStories();

    })
  }

  componentDidMount(){
    this.props.fetchProject(this.props.params.projID);
    setTimeout(()=>{
      console.log('this.props', this.props);
    }, 2000),
    this.props.fetchUserStories(this.props.params.projID);
    setTimeout(()=>{
      console.log('stories', this.props.stories);
    }, 2000),
    this.props.fetchResources();
    setTimeout(()=>{
      console.log('resources', this.props.resources);
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
        <h4 className="start-date">Project Status: {this.props.activeProject[0] ? this.props.activeProject[0][0].status : null}</h4>
        <button className="button story-create" onClick={() => this.showCreateStoryModal(this.props.activeProject[0].project_id)}>Create Story</button>
        <button className="button delete-project" onClick={() => this.onDelete(this.props.activeProject[0].project_id)}>Delete Project</button>
        <button className="button edit-project" onClick={this.showEditProjectModal}>Edit</button>
        <h3 className="stories-header">User Stories</h3>
        { this.props.stories[0] ? this.props.stories[0].map(story => {
          return (
            <ul key={story.story_id} className="list-group">
              <li className="list-group-item">Story Title: {story.title}</li>
              <li className="list-group-item">Story Status: {story.status}</li>
              <li className="list-group-item">Description: {story.description}</li>
              <button className="button update-description" onClick={() => this.showUpdateDescriptionModal(story.story_id)}>Update Story Description</button>
              <button className="button delete-story" onClick={() => this.onDeleteStory(story.story_id)}>Delete Story</button>
            </ul>
            
            )
        }): null}
        <Modal
          isOpen={this.state.UpdateDescriptionModal}
          onRequestClose={this.hideUpdateDescriptionModal}
          style={customStyles}
          >
          <UpdateStoryDescription storyId={this.state.storyId} />
          </Modal>
        <h3 className="resource-header">Project Resources</h3>
        { this.props.resources[0] && this.props.activeProject[0] ? this.props.resources[0].filter(resource => { return resource.proj_id === this.props.activeProject[0][0].project_id }).map(resource => {
          return (
            <ul key={resource.res_id} className="list-group">
              <li className="list-group-item">Name: {resource.res_name}</li>
              <img src= {`/images/${resource.res_img}`}></img>
            </ul>
            )
        }): null}
        
        <BurnDown stories={this.props.stories[0] ? this.props.stories[0]: []} project={this.props.activeProject[0] ? this.props.activeProject[0][0] : {}} />

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
        <StoryCreate proj_id={this.props.params.projID} closeCreateStoryModal={this.hideCreateStoryModal.bind(this)} />
      </Modal>

        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    resources: state.resources,
    stories: state.stories,
    activeProject: state.activeProject
  };
}


export default connect(mapStateToProps, { fetchUserStories, fetchProject, fetchProjects, fetchResources, deleteStory, createUserStory, deleteProject, updateDescription })(ProjectView);

