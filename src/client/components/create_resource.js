import React, { Component } from 'react';

class ResourceCreate extends Component {
  render() {
    return (
      <div>Create Resource
        <form>
          Name:<br />
          <input type="text" name="name" /><br />
          Company Name:<br />
          <input type="text" name="companyname" /><br />
        </form>
      </div>
    );
  }
}

export default ResourceCreate;