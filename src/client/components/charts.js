import React, { Component } from 'react';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { VictoryPie, VictoryStack, VictoryBar } from 'victory';

export default class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorScale : [
        "#ff3333",
        "#ff0000",
        "#cc0000",
        "#b30000",
        "#990000",
        "#800000",
        "#660000",
        "#4d0000",
        "#330000"
      ]
    };
  }


  pieData() {
    if(this.props.projectList){
      return this.props.projectList.map(val => {
        return {
          x: val.proj_name,
          y: (val.resources.length / this.props.resourceList.length)
        }
      })
    }
  }

  pieTable() {

    if(this.props.projectList){
      return this.props.projectList.map((value, i) => {
        console.log('VALUE in pieTable: ', value)
        let color = {color: this.state.colorScale[i]}
        return (
          <tr style={color}>
            <td>{value.proj_name}</td>
            <td>{Math.floor((value.resources.length / this.props.resourceList.length)*100)}%</td>
          </tr>
        )
      })
    }
  }

    // you can use functional styles for that too.
    // Maybe something like scaling datum.y by some appropriate
    // value to set fontSize



  render() {


    console.log('PROJLIST ', this.props.projectList)
    return (
      <div>
      <h2 className="pie-chart-header">Resources per Project</h2>
        <div className="pie-table">
          <table>
            <tbody>
              {this.pieTable.call(this)}
            </tbody>
          </table>
        </div>
        <div className="pie-chart">
          <VictoryPie
            height={250}
            width={250}

            style={{
              data: {
                stroke: (datum) => datum.y > 75 ?
                  "tomato" : "black",
                strokeWidth: (datum) => datum.y > 75 ?
                  3 : 1
              },
              labels: {
                fill: "white",
                fontSize: 10,
                angle: (datum) => datum.y > 75 ? 0 : 45
              }
            }}

            data = {this.pieData.call(this)}

            animate = {{
              duration: 1000,
              onEnter: {
                duration: 500
              }
            }}

            // data = {(!this.props.projectList ||     !this.props.resourcesList.length)
            //   ? null
            //   : return (
            //   this.props.projectList
            //           ? this.props.projectList.map(val => {
            //             console.log("VAL ", val)
            //             console.log("val.proj_name ", val.proj_name)
            //             console.log('# of PROJ RESOURCES: ', val.resources.length)
            //             console.log('TOTAL # of RESOURCES: ', this.props.resourceList.length)
            //             console.log('Y VALUE: ', val.resources.length / this.props.resourceList.length)
            //             return {
            //               x: val.proj_name,
            //               y: (val.resources.length / this.props.resourceList.length)
            //             }
            //   }):[]
            // )}


            colorScale={this.state.colorScale}
          />
        </div>
      </div>
    );
  }

}
//y: # res on proj/total res
//x: proj name



// animate Charts
// debug pie Chart
// move/adapt bar Chart
  // - project view
  // - number of user stories completed vs incomplete
