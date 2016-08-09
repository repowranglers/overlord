import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStories, createUserStory, deleteStory, updateStatus } from '../actions/story_actions';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import customStyles from './dashboard';
import StoryCreate from '../components/create_user_story';

class UserStories extends Component {
  constructor(props) {
    super(props);
    this.state = { CreateUserStoryModal: false };

    this.showCreateUserStoryModal = this.showCreateUserStoryModal.bind(this);
    this.hideCreateUserStoryModal = this.hideCreateUserStoryModal.bind(this);
  }

  componentDidMount(){
    this.props.fetchUserStories();
  }

  showCreateUserStoryModal(){
    this.setState({ CreateUserStoryModal: true });
  }

  hideCreateUserStoryModal(){
    this.setState({ CreateUserStoryModal: false });
  }


  render() {
    return (
      <div id="user-stories-box">

      <h3>User Stories</h3>

      { this.props.storiesList[0] ? this.props.storiesList[0].map( story => {

        return (
          <ul key={story.title} className="list-group">
            <button className="delete-btn" onClick={() => this.props.deleteStory(story.title)}>Delete</button>
            <h5 className="story-name">{story.title}</h5>
            <button className="button story-create" onClick={this.showCreateUserStoryModal}>Create</button>
            <li className="list-group-item">{story.description}</li>
            <li className="list-group-item">{story.status}</li>

          </ul>
        );
      } ) : null }

      <Modal
        isOpen={this.state.CreateUserStoryModal}
        onRequestClose={this.hideCreateUserStoryModal}
        style={customStyles} >
       <StoryCreate />
      </Modal>
      <Stories storiesList={this.props.stories} />
      </div>
    )
  }
}

export default connect(mapStateToProps, { fetchUserStories, createUserStory, deleteStory, updateStatus })(UserStories);
