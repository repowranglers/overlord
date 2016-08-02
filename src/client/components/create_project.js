import React, { Component } from 'react';

class ProjectCreate extends Component {
  render() {
    return (
      <div>Create Project
        <form>
          Project Name:<br />
          <input type="text" name="projectname"/><br />
          Start Date:<br />
          <input type="date" name="startdate"/><br />
          Due Date:<br />
          <input type="date" name="duedate" /><br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ProjectCreate;