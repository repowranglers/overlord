import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { deleteResource, fetchResources } from '../actions/resources_actions.js';
import Dragula from 'react-dragula';

class Fire extends Component {
  constructor(props) {
    super(props);

  this.dragulaDecorator = this.dragulaDecorator.bind(this);
  }

houldComponentUpdate(){ return false }

   dragulaDecorator(componentBackingInstance){

    let yolo = this

    let deleteResource = this.props.deleteResource;
    let fetchResources = this.props.fetchResources;

    if (componentBackingInstance) {
      let options = { };

      Dragula([componentBackingInstance, document.querySelector('.left'), document.querySelector('.right')])
      .on('drop', function(el, target, source, sibling){
        if(target === document.querySelector('.fire')){
       
        deleteResource(el.id).then(()=> { 
        var child = document.getElementById("" + el.id);
          child.parentNode.removeChild(child);
         })
        }
        console.log('in the fire', el.id)
        console.log('the fucking target', target)
      })
    }
  };
 



  render() {
    return (
      <div className="fire"  ref={this.dragulaDecorator}>

      <h1>FUCKCKCKCKCKCKCKCKCKC</h1>
      </div>
    )
  }
}

export default connect(null, { deleteResource, fetchResources })(Fire);
