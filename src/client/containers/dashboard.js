import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import Projects from './projects';
import Resources from './resources';
import ResourceView from './resource_project_view';
import Fire from './fire';
import Charts from '../components/charts';
import { fetchProjects } from '../actions/project_actions';
import { fetchResources } from '../actions/resources_actions';

export const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '30%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    borderStyle           : 'groove',
    borderWidth           : '5px',
  },
  overlay: {
    zIndex: 20,
    backgroundColor: 'rgba(204, 0, 0, 0.2)'
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchProjects();
    this.props.fetchResources();
  }


  render() {
    console.log('poop', this.props.projects)
    return (
      <div className="dashboard">
        {(this.props.resources[0] && this.props.resources[0].length === 0) ?
        <div>
          <a className="btn red" href='/logout'><div className="hover"><span></span><span></span><span></span><span></span><span></span></div>Logout</a>
          <h2 className="dashboard-header">Rule your Empire!</h2>
          <Projects projectList={this.props.projects} />
          <div className="lists">
            <ResourceView projectList={this.props.projects} />
            <Resources resourceList={this.props.resources[0]} projectList={this.props.projects[0]} />
          </div>
           <Fire />
          </div>
        </div> : 
        <div>
          <a className="btn red" href='/logout'><div className="hover"><span></span><span></span><span></span><span></span><span></span></div>Logout</a>
          <h2 className="dashboard-header">Rule your Empire!</h2>
          <Projects projectList={this.props.projects} />
          <Charts resourceList={this.props.resources[0]} projectList={this.props.projects[0]} />
          <div className="lists">

          <ResourceView projectList={this.props.projects} />
          <Resources resourceList={this.props.resources[0]} projectList={this.props.projects[0]} />
        </div>
        <div>
          <Fire />
        </div>
        </div>
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
    resources: state.resources
  };
}


export default connect(mapStateToProps, { fetchProjects, fetchResources })(Dashboard);
