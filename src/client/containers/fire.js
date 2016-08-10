import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { deleteResource, fetchResources } from '../actions/resources_actions.js';
import Dragula from 'react-dragula';

class Fire extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  this.dragulaDecorator = this.dragulaDecorator.bind(this);
  }


   dragulaDecorator(componentBackingInstance){

    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance, document.querySelector('.left')])
    }
  };
 
   onDelete(resource){
    this.props.deleteResource(resource)
    .then(()=> {
      this.props.fetchResources();
    })
  }



  render() {
    return (
      <div className="fire"  ref={this.dragulaDecorator}>

      <h1>FUCKCKCKCKCKCKCKCKCKC</h1>
      </div>
    )
  }
}

export default connect(null, { deleteResource, fetchResources })(Fire);
