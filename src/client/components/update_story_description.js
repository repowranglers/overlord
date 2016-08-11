import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDescription } from '../actions/story_actions';

class UpdateStoryDescription extends Component {
  constructor(props){
    super(props);

    this.state = { 
                  description: ''
                  };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
      this.setState({ description: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
     
    let description = this.state.description;
    this.props.updateDescription(this.props.storyId, description )
    this.setState({ 
                    description: ''
                  });
  }

  render() {
    return (
      <div>Update Story Description
        <form className="input-group" onSubmit={this.onFormSubmit}>
          New Description:<br />
          <input className="update-description-input" type="text" value={this.state.description}
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
  return bindActionCreators({ updateDescription }, dispatch);
}

export default connect(null, mapDispatchToProps)(UpdateStoryDescription);
