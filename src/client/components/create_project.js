import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProject } from '../actions/index';

class ProjectCreate extends Component {
  constructor(props){
    super(props);

    this.state = { term: '',
                   ddate: '',
                   stdate: ''
                  };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

  } 

onInputChange(e) {
    this.setState({ term: e.target.value });
  }
onDueChange(e) {
    this.setState({ ddate: e.target.value });
  }
onStartChange(e) {
    this.setState({ stdate: e.target.value });
  }
  onFormSubmit(e) {
    e.preventDefault();

 
    this.props.createProject(this.state.term);
    this.setState({ term: '',
                    ddate: '',
                    stdate: '' 
                  });
    this.props.closeProjectModal();
  }

  render() {
    return (
      <div>Create Project
        <form className="project-input-group" onSubmit={this.onFormSubmit}>
          Project Name:<br />
          <input className="project-name-input" type="text" value={this.state.term}
          onChange={this.onInputChange} /><br />
          Start Date:<br />
          <input className="start-date-input" type="date" value={this.state.stdate}
          onChange={this.onStartChange} /><br />
          Due Date:<br />
          <input className="due-date-input" type="date" value={this.state.ddate}
          onChange={this.onDueChange} /><br />
          <span className="project-submit-btn">
            <input id="projectSubmit" type="submit" value="Submit" />
          </span> 
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createProject }, dispatch);
}

export default connect(null, mapDispatchToProps)(ProjectCreate);


