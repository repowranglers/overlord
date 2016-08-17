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
import UpdateStatus from '../components/update_story_status';
import { fetchProjects, fetchProject, deleteProject } from '../actions/project_actions';
import { fetchResources } from '../actions/resources_actions';
import { fetchUserStories, createUserStory, deleteStory, updateStatus } from '../actions/story_actions';
import { VictoryStack, VictoryBar } from 'victory';

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createStoryModal: false,
      selectedProjID: 0
    };
    this.showCreateStoryModal = this.showCreateStoryModal.bind(this);
    this.hideCreateStoryModal = this.hideCreateStoryModal.bind(this);
    this.hideUpdateDescriptionModal = this.hideCreateStoryModal.bind(this);
    this.showUpdateDescriptionModal = this.showCreateStoryModal.bind(this);
  }

  showCreateStoryModal(projectId){
    this.setState({ createStoryModal: true,
      selectedProjID: projectId
     });
  }

  hideCreateStoryModal(){
    this.setState({ createStoryModal: false });
    setTimeout(()=>{
      this.props.fetchUserStories(this.props.params.projID);
      console.log('stories', this.props.stories);
    }, 500)
  }

  showUpdateDescriptionModal(storyId) {
    this.setState({ UpdateDescriptionModal: true, storyId: storyId });
  }

  hideUpdateDescriptionModal() {
    this.setState({ UpdateDescriptionModal: false });
  }

  showUpdateStatusModal(storyId) {
    this.setState({ UpdateStatusModal: true, storyId: storyId});
  }

  hideUpdateStatusModal() {
    this.setState({ UpdateStatusModal: false });
    setTimeout(()=>{
      this.props.fetchUserStories(this.props.params.projID);
      console.log('stories', this.props.stories);
    }, 500)

  }

  onDelete(projectId){
    this.props.deleteProject(this.props.params.projID)
    setTimeout(()=>{
      this.props.fetchProject(this.props.params.projectID);
    }, 500)
  }

  onDeleteStory(story_id){
    this.props.deleteStory(story_id)
    setTimeout(()=>{
      this.props.fetchUserStories(this.props.params.projID);
    }, 500)
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
      <div className="project-view-page">
        <a className="button button-primary" href='/dashboard'>Dashboard</a>
        <div className="project-view-box">
          <div className="project-view-header">
            <p>{this.props.activeProject[0] ? this.props.activeProject[0][0].proj_name : null}</p>
          </div>
          <div className="project-mods">
            <a className="button button-primary" href='/dashboard' onClick={() => this.onDelete(this.props.activeProject[0].project_id)}>Delete</a>
          </div>
        </div>

        <div className="burndown-box">
          <BurnDown stories={this.props.stories[0] ? this.props.stories[0]: []} project={this.props.activeProject[0] ? this.props.activeProject[0][0] : {}} />
        </div>

        <div className="dates">
          <p className="start-date">Start Date: {this.props.activeProject[0] ? this.props.activeProject[0][0].start : null}</p>
          <p className="start-date">Due Date: {this.props.activeProject[0] ? this.props.activeProject[0][0].due : null}</p>
          <p className="start-date">Project Status: {this.props.activeProject[0] ? this.props.activeProject[0][0].status : null}</p>
        </div>

        <div className="horizontal-stack">
          <h2>LIFE</h2>
            <VictoryStack horizontal
              height={400}
              padding={75}
              style={{
                data: {
                  width: 100,
                  height: 50
                },
                labels: {
                  fontSize: 24,
                  fill: "white"
                }
              }}
              labels={["HEALTH"]}

            >
            {/* { story.date_completed ? "Completed: " + story.date_completed : "Not Completed" } */}
            <VictoryBar
              style={{data: {fill: "red"}}}
              data={[
                {
                  x: 1,
                  y: this.props.stories[0] ? this.props.stories[0].filter(s => {return !!s.date_completed}).length : 0
                },
              ]}
              animate = {{
                duration: 1500,
                onEnter: {
                  duration: 500
                }
              }}
            />
            <VictoryBar
              style={{data: {fill: "black"}}}
              data={[
                {
                  x: 1,
                  y: this.props.stories[0] ? this.props.stories[0].length : 0
                },
              ]}
              animate = {{
                duration: 1500,
                onEnter: {
                  duration: 500
                }
              }}
            />
            </VictoryStack>
      </div>


        <div className="stories-resources-box">
          <div className="stories-box">
                <h3 className="stories-header">User Stories</h3>
                <div className="stories-button-box">
                  <button className="button story-create" onClick={() => this.showCreateStoryModal(this.props.activeProject[0].project_id)}>Create Story</button>
                </div>
                <div className="stories-list">
                  { this.props.stories[0] ? this.props.stories[0].map(story => {
                    console.log('this is story' , story)
                    return (
                      <div className="single-story">
                        <ul key={story.story_id} >
                          <li>Story Title: {story.title}</li>
                          <li>Story Status: { story.date_completed ? "Completed-" + story.date_completed : "Not Completed" }</li>
                          <li>Description: {story.description}</li>
                          <div className="resource-button-box">
                            <button onClick={() => this.showUpdateStatusModal(story.story_id)}>Complete</button>
                            <button onClick={() => this.onDeleteStory(story.story_id)}>Delete</button>
                          </div>
                        </ul>
                      </div>
                      )
                  }): null}
                </div>
                <Modal
                  isOpen={this.state.UpdateStatusModal}
                  onRequestClose={this.hideUpdateStatusModal}
                  style={customStyles}
                  >
                  <UpdateStatus storyId={this.state.storyId} closeUpdateStatusModal={this.hideUpdateStatusModal.bind(this)} />
                  </Modal>
          </div>
          <div className="resources-box">
            <h3 className="resource-header">Project Resources</h3>
            <div className="resources-list">
              { this.props.resources[0] && this.props.activeProject[0] ? this.props.resources[0].filter(resource => { return resource.proj_id === this.props.activeProject[0][0].project_id }).map(resource => {
                return (
                  <ul key={resource.res_id} className="list-group">
                    <li className="list-group-item">{resource.res_name}</li>
                    <img src= {`/images/${resource.res_img}`}></img>
                  </ul>
                  )
              }): null}
            </div>
          </div>
        </div>



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


export default connect(mapStateToProps, { fetchUserStories, fetchProject, fetchProjects, fetchResources, deleteStory, createUserStory, deleteProject, updateStatus })(ProjectView);
