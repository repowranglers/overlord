import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUserStory } from '..actions/index';

class StoryCreate extends Component {
  constructor(props){
    super(props);
    
    this.state = { projectName: '',
                   userStory: ''
                  };
  
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onUserStory = this.onUserStory.bind(this);

  }

  onInputChange(e) {
      this.setState({ projectName: e.target.value });
  }

  onUserStory(e) {
      this.setState({ userStory: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    let projectName = this.state.projectName;
    let userStory = this.state.userStory;

    console.log 
    this.props.createUserStory({ projectName, userStory });
    this.setState({ projectName: '',
                    userStory: ''
                  });
    this.props.closeUserStoryModal();
  }

  render() {
    return (
      <div>Create User-Story
        <form className="user-story-input-group" onSubmit={this.onFormSubmit}>
          Project Name:<br />
          <input className="user-story-project-name-input" type="text" value={this.state.projectName}
          onChange={this.onInputChange} /><br />
          User Story:<br />
          <input className="user-story-input" type="text" value={this.state.userStory}
          onChange={this.onUserStory} /><br />
          <span className="user-story-submit-btn">
            <input id="userStorySubmit" type="submit" value="Submit" />
          </span>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createUserStory, fetchUserStories }, dispatch);
}

export default connect(null, mapDispatchToProps)(StoryCreate);


