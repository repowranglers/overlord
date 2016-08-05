import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStories, createUserStory, deleteStory } from '../actions/index';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import customStyles from './dashboard';
import StoryCreate from '../components/create_user_story';

class UserStories extends Component {
  constructor(props) {
    super(props);
    this.state = { createUserStoryModal: false };
    this.showCreateUserStoryModal = this.showCreateUserStoryModal.bind(this);
    this.hideCreateUserStoryModal = this.hideCreateUserStoryModal.bind(this);
  }  

  showCreateUserStoryModal(){
    this.setState({ createUserStoryModal: true });
  }

  hideCreateUserStoryModal(){
    this.setState({ createUserStoryModal: false });
  }


  render() {
    return (
      <div id="user-stories-box">

      <h3>User Stories</h3>

      { this.props.storiesList[0] ? this.props.storiesList[0].map( story => {

        return (
          <ul key={story.story_name} className="list-group">
            <button className="delete-btn" onClick={() => this.props.deleteStory(story.story_id)}>Delete</button>
            <h5 className="story-name">{story.story_name}</h5>
            <button className="button story-create" onClick={this.showCreateUserStoryModal}>Create</button>
            <li className="list-group-item">{story.story_name}</li>
            <li className="list-group-item">{story.user_story}</li>

          </ul> 
        );
      } ) : null }

      <Modal
        isOpen={this.state.createUserStoryModal}
        onRequestClose={this.hideCreateUserStoryModal}
        style={customStyles} >
        <StoryCreate />
      </Modal>

      </div>
    )
  }
}

export default connect(null, { fetchUserStories, createUserStory, deleteStory })(UserStories);