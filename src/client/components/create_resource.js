import React, { Component } from 'react';

class ResourceCreate extends Component {
  render() {
    return (
      <div>Create Resource
        <form>
          <div>Name:</div>
          <div><input type="text" name="name" /></div>
          <div>Company Name:</div>
          <div><input type="text" name="companyname" /></div>
        </form>
      </div>
    );
  }
}

export default ResourceCreate;