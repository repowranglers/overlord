import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateStatus } from '../actions/story_actions';

class UpdateStoryStatus extends Component {
  constructor(props){
    super(props);

    this.state = { 
                  status: ''
                  };

    this.onInputChange = this.onInputChange.bind(this);
    
  }

  onInputChange(e) {
      this.setState({ status: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    let status = this.state.status;

    this.setState({ 
                    status: ''
                  });
  }

  render() {
    return (
      <div>Update Story Status
        <form className="input-group" onSubmit={this.onFormSubmit}>
          New Status:<br />
          <input className="update-status-input" type="text" value={this.state.status}
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

export default connect(null, mapDispatchToProps)(UpdateStoryStatus);
