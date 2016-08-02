import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createResource } from '../actions/index';

class ResourceCreate extends Component {
  constructor(props){
    super(props);

    this.state = { term: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

  } 

onInputChange(e) {
    this.setState({ term: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    this.props.createResource(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (
      <div>Create Resource
        <form className="resource-input-group" onSubmit={this.onFormSubmit}>
          Name:<br />
          <input className="resource-name-input" type="text" value={this.state.term}
          onChange={this.onInputChange} /><br />
          Company Name:<br />
          <input className="company-name-input" type="text" value={this.state.term}
          onChange={this.onInputChange} /><br />
          <span className="resource-submit-btn">
            <input id="resourceSubmit" type="submit" value="Submit" />
          </span>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createResource }, dispatch);
}

export default connect(null, mapDispatchToProps)(ResourceCreate);