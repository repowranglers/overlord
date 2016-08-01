import React, { Component } from 'react';
import Resources from '../containers/resources';
import Projects from '../containers/projects';

export default class App extends Component {
  render() {
    return (
      <div> 
      {this.props.children}
      </div>
    );
  }
}

