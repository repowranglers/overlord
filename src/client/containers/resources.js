import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { fetchResources, deleteResource, assignResource } from '../actions/resources_actions.js';
import Dragula from 'react-dragula';
import { fetchProjects } from '../actions/project_actions.js'

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
    this.dragulaDecorator = this.dragulaDecorator.bind(this)
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

  dragulaDecorator(componentBackingInstance){
   
    let assignResource = this.props.assignResource;
  
    if (componentBackingInstance) {
  
      Dragula([componentBackingInstance, document.querySelector('.fire')])
      .on('drop', function(el, target, source, sibling){
        if(target !== document.querySelector('.fire')){
          console.log('this drop is not inside of the fire')
          assignResource(el.id, target.id)
        }
      })
  
    }
  };

  projSelect(e){
    this.setState({ projIdToAssign: e.target.value })
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

      <div id='resources-box'>
      <h3 className="title">Resources</h3>
    
      <div id='0' className="left container"  ref={this.dragulaDecorator}>
      
        { this.props.resourceList ? this.props.resourceList.filter(r => r.res_name !== '' && r.proj_id === 0).map( r => {
            return (
            <div id={r.res_id} className="item image-thing" key={r.res_name}><img src= {`/images/${r.res_img}`}></img> <br/> {r.res_name}
           </div> 
          );
        } ) : null }
  
      {/* I moved the form down and made each resource a div so it can be dragged individually
      the reason fro the form move is because the whole form would be moveable. */}
      </div>
      </div>
    )
  }
} 

export default connect(null, { fetchResources, fetchProjects, deleteResource, assignResource })(Resources);
