import React, { Component } from 'react';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { VictoryPie } from 'victory';

export default class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    return (
      <div className="pie-chart">Resources per Project

        <VictoryPie
          height={250}
          width={250}

          style={{
            data: {
              stroke: (data) => data.y > 0.5 ?
                "tomato" : "blue"
            },
            labels: {
              fill: "red",
              fontSize: 10
            }
          }}
          data = {this.props.projectList
                  ? this.props.projectList.map(val => {
                    return {
                      x: val.proj_name,
                      y: (val.resources.length / this.props.resourceList.length)
                    }
        }):[]}
        />
      </div>
    );
  }

}
//y: # res on proj/total res
//x: proj name
