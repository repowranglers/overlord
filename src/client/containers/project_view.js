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
import { fetchProjects, fetchProject, deleteProject } from '../actions/project_actions';
import { fetchResources } from '../actions/resources_actions';
import { fetchUserStories, createUserStory, deleteStory, updateStatus } from '../actions/story_actions';

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

  onDelete(projectId){
    this.props.deleteProject(projectId)
    .then(()=> {
      this.props.fetchProjects();
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
        <button className="delete-btn" onClick={() => this.onDelete(this.props.activeProject[0].project_id)}>Delete</button>
        <button className="button proj-edit" onClick={this.showEditProjectModal}>Edit</button>
        <h3 className="stories-header">User Stories</h3>
        { this.props.stories[0] ? this.props.stories[0].map(story => {
          return (
            <ul key={story.story_id} className="list-group">
              <li className="list-group-item">Title: {story.title}</li>
              <li className="list-group-item">Status: {story.status}</li>
              <li className="list-group-item">{story.description}</li>
            </ul>
            )
        }): null}

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

function mapStateToProps(state) {
  return {
    stories: state.stories,
    activeProject: state.activeProject,
    resources: state.resources
  };
}


export default connect(mapStateToProps, { fetchUserStories, fetchProject, fetchProjects, fetchResources, deleteStory, updateStatus, createUserStory, deleteProject })(ProjectView);

