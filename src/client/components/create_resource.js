import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createResource } from '../actions/index';
import { fetchResources } from '../actions/index';

class ResourceCreate extends Component {
  constructor(props){
    super(props);

    this.state = { name: '',
                   company: ''
                 };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCompanyChange = this.onCompanyChange.bind(this);
  } 

  onInputChange(e) {
      this.setState({ name: e.target.value });
  }

  onCompanyChange(e) {
    this.setState({ company: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    let name = this.state.name;
    let company = this.state.company;

    this.props.createResource({ name, company });
    this.setState({ name: '',
                    company: '' 
                  });
    this.props.closeResourceModal();
    this.props.fetchResources();
  }

  render() {
    return (
      <div>Create Resource
        <form className="resource-input-group" onSubmit={this.onFormSubmit}>
          Name:<br />
          <input className="resource-name-input" type="text" value={this.state.name}
          onChange={this.onInputChange} /><br />
          Company Name:<br />
          <input className="company-name-input" type="text" value={this.state.company}
          onChange={this.onCompanyChange} /><br />
          <span className="resource-submit-btn">
            <input id="resourceSubmit" type="submit" value="Submit" />
          </span>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createResource, fetchResources }, dispatch);
}

export default connect(null, mapDispatchToProps)(ResourceCreate);