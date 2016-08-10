import React from 'react';
import * as V from 'victory';

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
        	  style={{
        	  	axis: {stroke: "white"}
        	  }}
        	  >
        	  <V.VictoryArea
	        	  style={{
	        	    data: {
	        	      fill: "red"
	        	    }
	        	  }}
        	    data={[
        	      {x: new Date(2016, 8, 1), y: 950},
        	      {x: new Date(2016, 8, 11), y: 900},
        	      {x: new Date(2016, 9, 1), y: 875},
        	      {x: new Date(2016, 9, 12), y: 700},
        	      {x: new Date(2016, 9, 28), y: 650},
        	      {x: new Date(2016, 10, 5), y: 600},
        	      {x: new Date(2016, 10, 22), y: 400},
        	      {x: new Date(2016, 11, 1), y: 250}
        	    ]}/>
        	</V.VictoryChart>
        </div>);
    }
}

export default BurnDownChart;
