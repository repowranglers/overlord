import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { deleteResource } from '../actions/resources_actions.js';
import Dragula from 'react-dragula';

//groups are projects (each proj gets own group)g
// items are project timeline (start_time = start, end_time = end, title = proj_name, group is corresponding proj group#)

let itemIdCounter = 0;
let groupIdCounter = 0;

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  this.dragulaDecorator = this.dragulaDecorator.bind(this);
  }


   dragulaDecorator(componentBackingInstance){

    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance, document.querySelector('.left')], options)
    }
  };
 
   onDelete(resource){
    this.props.deleteResource(resource)
    .then(()=> {
      this.props.fetchResources();
    })
  }
  
  itemCreate(p){
    let item = {id: itemIdCounter, title: p.proj_name, start_time: moment(p.start), end_time: moment(p.due), group: itemIdCounter};
    itemIdCounter++;
    return item;
  }

  groupCreate(p){
    console.log('IdCounter ', groupIdCounter);
    let group = {id: groupIdCounter, title: ''};
    groupIdCounter++;
    return group;
  }

  dragulaDecorator(componentBackingInstance){

    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance, document.querySelector('.left')], options)
    }
  };
    onDelete(projectId){
    this.props.deleteProject(projectId)
    .then(()=> {
      this.props.fetchProjects();
    })
  }

  render() {
    return (
      <div id="fire">

     

      </div>
    )
  }
}

export default connect(null, { deleteResource })(Fire);
