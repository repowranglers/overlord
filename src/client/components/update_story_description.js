import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateStatus } from '../actions/story_actions';

class UpdateStatus extends Component {
  constructor(props){
    super(props);

    this.state = { 
                  date_completed: ''
                  };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
      this.setState({ date_completed: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
     
    let date_completed = this.state.date_completed;
    let story_id = this.props.storyId;

    console.log(story_id);
    this.props.updateStatus( story_id, date_completed )
    this.setState({ 
                    date_completed: ''
                  });
    this.props.closeUpdateStatusModal();
  }

  render() {
    return (
      <div>Update Story Status
        <form className="input-group" onSubmit={this.onFormSubmit}>
          Date Completed:<br />
          <input className="update-status-input" type="date" value={this.state.date_completed}
          onChange={this.onInputChange} /><br />
          <span className="user-story-submit-btn">
            <input id="updateStorySubmit" type="submit" value="Submit" />
          </span>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateStatus }, dispatch);
}

export default connect(null, mapDispatchToProps)(UpdateStatus);
