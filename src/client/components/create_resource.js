import React, { Component } from 'react';

class ResourceCreate extends Component {
  render() {
    return (
      <div>Create Resource
        <form>
          Name:
          <input type="text" name="name" />
          Company Name:
          <input type="text" name="companyname" />
        </form>
      </div>
    );
  }
}

export default ResourceCreate;