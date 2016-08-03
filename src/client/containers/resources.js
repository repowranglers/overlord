import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { fetchProjects, deleteResource, assignResource } from '../actions/index';

class Resources extends Component {
  constructor(props){
    super(props);

    this.state = {
      resIdsToAssign: [],
      projIdToAssign: ''
    }

    this.boxCheck = this.boxCheck.bind(this);
    this.boxUncheck = this.boxUncheck.bind(this);
    this.submitAssignment = this.submitAssignment.bind(this);
    this.projSelect = this.projSelect.bind(this);
  }

  boxCheck(e){
    let resIdSelected = e.target.value;
    let resIds = this.state.resIdsToAssign;
    let iOfRes = resIds.indexOf(resIdSelected);
    if (iOfRes >= 0) { 
      this.setState({ resIdsToAssign: resIds.splice(iOfRes, 1) })
      console.log('this.state.resIdsToAssign ' , this.state.resIdsToAssign);
    } else {
      resIds.push(resIdSelected);
      this.setState({ resIdsToAssign: resIds });
      console.log('this.state.resIdsToAssign ' , this.state.resIdsToAssign);
    }  
  }

  boxUncheck(e){

  }

  projSelect(e){
    this.setState({ projIdToAssign: e.target.value })
    console.log('projIdToAssign', this.state.projIdToAssign);
  }

  submitAssignment(e){
    let resIds = this.state.resIdsToAssign;
    let projId = this.state.projIdToAssign;
    e.preventDefault();

    resIds.forEach(resId => {
      this.props.assignResource(resId, projId);
    })
  }

  render() {

    return (
      <div id="resources-box">

        <h3>Resources</h3>
        <form onSubmit={this.submitAssignment}>

        { this.props.resourceList ? this.props.resourceList.filter(r => r.res_name !== '').map( r => {
          return (
            <li key={r.res_name} className="list-group-item"><input value={r.res_id} onClick={this.boxCheck} type="checkbox" />  {r.res_name}
            <button className="delete-btn" onClick={() => this.props.deleteResource(r.res_id)}>Delete</button></li>
          );
        } ) : null }

        <select onChange={this.projSelect} onClick={this.projSelect} className="dropdown">
          { this.props.projectList ? this.props.projectList.map( p => {
              return (
                <option key={p.proj_name} value={p.project_id}>{p.project_id}</option>
                );
            }) : null }
        </select>
        <div><input type="submit" name="assign-resource" value="Assign Resource"/></div>
        </form>
      </div>
    )
  }
} 

export default connect(null, { fetchProjects, deleteResource, assignResource })(Resources);
