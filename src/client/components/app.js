import React, { Component } from 'react';
import Resources from '../containers/resources';
import Projects from '../containers/projects';
import EasyTransition from 'react-easy-transition';

export default class App extends Component {
  render() {
    return (
      <div> 
      	<EasyTransition
      	    path={location.pathname}
      	    initialStyle={{opacity: 0}}
      	    transition="opacity 0.5s ease-in"
      	    finalStyle={{opacity: 1}}
      	>
      	    {this.props.children}
      	</EasyTransition>
      </div>
    );
  }
}

