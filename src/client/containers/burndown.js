import React from 'react';
import * as V from 'victory';
import Moment from 'moment';

let testProject = {
	start: "2016-08-08",
	due: "2016-09-08"
}

let testStories = [
	{title: 'A', date_completed: '2016-08-12'},
	{title: 'B', date_completed: '2016-08-14'},
	{title: 'C', date_completed: '2016-08-20'},
	{title: 'D', date_completed: '2016-08-30'},
	{title: 'E', date_completed: null}
]


class BurnDownChart extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'BurnDownChart';
    }
    render() {

        return (<div>
        	<V.VictoryChart
        	  scale={{
        	    x: "time"
        	  }}
        	  height={200}
        	  width={300}
        	  style={{ data: {border: "1px solid #ccc"}} }
        	>
		      	  <V.VictoryArea
		        	  style={{
		        	    data: {
		        	      fill: "red"
		        	    }
		        	  }}

		      	    data={[
		      	      {x: Moment(testProject.start), y: testStories.length},
		      	      {x: Moment(testProject.start).add(-1, 'week'), y: testStores.filter(s=> return moment(s.date_completed)).length },
		      	      {x: Moment(testProject.start).add(-1, 'week'), y: 900},
		      	      {x: Moment(testProject.start).add(-1, 'week'), y: 900},
		      	      {x: Moment(testProject.due), y: }
		      	    ]}/>
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
