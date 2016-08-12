import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { fetchResources, deleteResource, assignResource } from '../actions/resources_actions.js';
import Dragula from 'react-dragula';
import { fetchProjects } from '../actions/project_actions.js';
import Modal from 'react-modal';
import customStyles from './dashboard';
import ResourceCreate from '../components/create_resource';

class Resources extends Component {
  constructor(props){
    super(props);

    this.state = {
      resIdsToAssign: [],
      projIdToAssign: '',
      CreateResourceModal: false
    }


    this.boxCheck = this.boxCheck.bind(this);
    this.boxUncheck = this.boxUncheck.bind(this);
    this.submitAssignment = this.submitAssignment.bind(this);
    this.projSelect = this.projSelect.bind(this);
    this.dragulaDecorator = this.dragulaDecorator.bind(this);

    this.showCreateResourceModal = this.showCreateResourceModal.bind(this);
    this.hideCreateResourceModal = this.hideCreateResourceModal.bind(this);

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
  
      Dragula([componentBackingInstance,document.querySelectorAll('.right'), document.querySelector('.fire')])
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

  showCreateResourceModal() {
    this.setState({ CreateResourceModal: true });
  }

  hideCreateResourceModal() {
    this.setState({ CreateResourceModal: false });
    this.props.fetchResources();
  }

  render() {

    return (

      <div id='resources-box'>
      <h3 className="title">Resources</h3>
      <button id="create-res" className="btn red" onClick={this.showCreateResourceModal.bind(this)}><div className="hover"><span></span><span></span><span></span><span></span><span></span></div>Create Resource</button>
    
      <div id='0' className="left container"  ref={this.dragulaDecorator}>
        .
        { this.props.resourceList ? this.props.resourceList.filter(r => r.res_name !== '' && r.proj_id === 0).map( r => {
            return (
            <div id={r.res_id} className="item image-thing" key={r.res_name}><img src= {`/images/${r.res_img}`}></img> <br/> {r.res_name}
           </div> 
          );
        } ) : null }
  
      {/* I moved the form down and made each resource a div so it can be dragged individually
      the reason fro the form move is because the whole form would be moveable. */}
      </div>
      <Modal
        isOpen={this.state.CreateResourceModal}
        onRequestClose={this.hideCreateResourceModal}
        style={customStyles}
      ><ResourceCreate closeResourceModal={this.hideCreateResourceModal.bind(this)} />
      </Modal>
      </div>
    )
  }
} 

export default connect(null, { fetchResources, fetchProjects, deleteResource, assignResource })(Resources);
