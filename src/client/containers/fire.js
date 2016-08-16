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


    let deleteResource = this.props.deleteResource;
    

    if (componentBackingInstance) {
      let options = { };

      Dragula([componentBackingInstance, document.querySelector('.left'), document.querySelectorAll('.right')])
      .on('drop', function(el, target, source, sibling){
        if(target === document.querySelector('.fire')){
        console.log('in the fire', el.id)
       
        deleteResource(el.id).then(()=> { 

        var child = document.getElementById("" + el.id);
        child.childNodes[0].src="http://i.imgur.com/ZOfwR4O.gif";

        setTimeout(function(){
          child.parentNode.removeChild(child);
        }, 700 )
         })
        }
      })
    }
  };
 



  render() {

    let display = { display:'none' };

    return (
      
      <div className="fire"  ref={this.dragulaDecorator}>
      
      </div>
      
    )
  } 
}

export default connect(null, { deleteResource, fetchResources })(Fire);
