import React from 'react';
import * as V from 'victory';
import Moment from 'moment';

class BurnDownChart extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'BurnDownChart';
    }
    componentDidMount(){
    	this.props.project = {
    		start: "2016-08-08",
    		due: "2016-09-08"
    	}
    	this.props.stories = [
  			{title: 'A', date_completed: '2016-08-12'},
  			{title: 'B', date_completed: '2016-08-14'},
  			{title: 'C', date_completed: '2016-08-20'},
  			{title: 'D', date_completed: '2016-08-30'},
  			{title: 'E', date_completed: null}
    	]
    }

    render() {

        return (<div>
        	<V.VictoryChart
        	  scale={{
        	    x: "time"
        	  }}
        	  style={{
        	  	axis: {stroke: "white"}
        	  }} 
        	>
        	  {this.props.projects ? 
	      	  <V.VictoryArea
	        	  style={{
	        	    data: {
	        	      fill: "red"
	        	    }
	        	  }}
	      	    data={[
	      	      {x: moment(this.props.project.start), y: (this.props.stories.length*10)},
	      	      {x: moment(this.props.project.start).add(-1, 'week'), y: 900},
	      	      {x: new Date(2016, 9, 1), y: 875},
	      	      {x: new Date(2016, 9, 12), y: 700},
	      	      {x: new Date(2016, 9, 28), y: 650},
	      	      {x: new Date(2016, 10, 5), y: 600},
	      	      {x: new Date(2016, 10, 22), y: 400},
	      	      {x: moment(this.props.project.due), y: 250}
	      	    ]}/>
	      	    : null
        	  }

        	</V.VictoryChart>
        </div>);
    }
}

export default BurnDownChart;


// VictoryArea
// 	 data --> array with objects
//								first obj(x: project start date, y: total # user stories)
//
//								last obj(x: project due date, y: # user stories not yet completed)
