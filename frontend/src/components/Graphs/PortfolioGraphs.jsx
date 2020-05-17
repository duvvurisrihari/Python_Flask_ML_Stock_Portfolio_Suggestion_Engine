import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { backendurl } from "../common/settings";
import axios from "axios";
import { Line } from "react-chartjs-2";

class PortfolioGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      values: [],
      datasets: [
        {
          label: "Stock Portfolio value",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [],
        },
      ],
    };
  }

  componentDidMount() {
    const { results } = this.props;

    axios
      .post(backendurl + "/portfolioGraphData", results)
      .then((response) => {
        console.log(
          "the response from backend is " + JSON.stringify(response.data)
        );
        console.log("the labels are" + response.data.label);

        const newDatasets = [
          {
            label: "Stock Portfolio value",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: response.data.value,
          },
        ];

        this.setState({
          labels: response.data.label,
          datasets: newDatasets,
        });
      })
      .catch((error) => {
        console.log("the error is" + error);
      });
  }

  render() {
    const { datasets } = this.state;
    console.log("inside render " + JSON.stringify(datasets));
    return (
      <div>
        <Container>
          <br />
          <br />
          <Row>
            <Col>
              <div className="col-md-11">
                <Line
                  data={this.state}
                  options={{
                    title: {
                      display: true,
                      text: "Weekly trend of Portfolio Value",
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PortfolioGraphs;
