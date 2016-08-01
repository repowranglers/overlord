import React, { Component } from 'react';

class ProjectCreate extends Component {
  render() {
    return (
      <div>Create Project
        <form>
          <div>Project Name:</div>
          <div><input type="text" name="projectname"/></div>
          <div>Start Date:</div>
          <div><input type="date" name="startdate"/></div>
          <div>Due Date:</div>
          <div><input type="date" name="duedate" /></div>
        </form>
      </div>
    );
  }
}

export default ProjectCreate;