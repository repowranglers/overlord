import React, { Component } from 'react';

class ProjectCreate extends Component {
  render() {
    return (
      <div>Create Project
        <form>
          Project Name:
          <input type="text" name="projectname"/>
          Start Date:
          <input type="date" name="startdate"/>
          Due Date:
          <input type="date" name="duedate" />
        </form>
      </div>
    );
  }
}

export default ProjectCreate;