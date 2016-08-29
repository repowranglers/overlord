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
        	  height={200}
        	  width={300}
        	>
        		<V.VictoryAxis
        			scale={{
        			  x: "time"
        			}}

        		  style={{
        		    axis: {stroke: "white"},
        		    ticks: {stroke: "white"},
        		    tickLabels: {stroke:   "white"}
        		  }}
        		/>
        		<V.VictoryAxis dependentAxis

        		  style={{
        		    axis: {stroke: "white"},
        		    ticks: {stroke: "white"},
        		    tickLabels: {stroke:   "white"}
        		  }}
        		/>
		      	  <V.VictoryLine
		        	  style={{
		        	    data: {
		        	      fill: "red"
		        	    }
		        	  }}

		      	    data={[
		      	      {x: Moment(this.props.project.start), y: this.props.stories.length},
		      	      {x: Moment(this.props.project.start).add(+1, 'week'), y: this.props.stories.filter(s=> {return Moment(s.date_completed).diff(Moment(this.props.project.start).add(-1, 'week'))>=0}).length },
		      	      {x: Moment(this.props.project.start).add(+2, 'week'), y: this.props.stories.filter(s=> {return Moment(s.date_completed).diff(Moment(this.props.project.start).add(-2, 'week'))>=0}).length },
		      	      {x: Moment(this.props.project.start).add(+3, 'week'), y: this.props.stories.filter(s=> {return Moment(s.date_completed).diff(Moment(this.props.project.start).add(-3, 'week'))>=0}).length },
		      	      {x: Moment(this.props.project.due), y: 0}
		      	    ]}

								animate = {{
	                duration: 1500,
	                onEnter: {
	                  duration: 1000
	                }
	              }}

								/>

        	</V.VictoryChart>
            <h3>This chart shows the amount of user stories left per days left on the project</h3>
        </div>);
    }
}

export default BurnDownChart;


// VictoryArea
// 	 data --> array with objects
//								first obj(x: project start date, y: total # user stories)
//
//								last obj(x: project due date, y: # user stories not yet completed)
