import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invAmount: "",
      options: [
        { label: "Ethical Investing", value: "Ethical Investing" },
        { label: "Growth Investing", value: "Growth Investing" },
        { label: "Index Investing", value: "Index Investing" },
        { label: "Quality Investing", value: "Quality Investing" },
        { label: "Value Investing", value: "Value Investing" },
      ],
      selectedStrategies: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onStrategyChange = this.onStrategyChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onStrategyChange(opt) {
    this.setState({
      selectedStrategies: opt,
    });
  }

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();

    let strategies = [];
    this.state.selectedStrategies.forEach((eachObj) => {
      strategies.push(eachObj.value);
    });

    const data = {
      invAmount: this.state.invAmount,
      strategies: strategies,
    };

    console.log("data-->", data);
  };

  render() {
    const { options, selectedStrategies, invAmount } = this.state;

    return (
      <div>
        <Container>
          <h1>Stock Portfolio Suggestion Engine</h1>
          <br />
          <br />
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="invAmount">
                  <Form.Label>Select Investment Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Investment Amount in USD"
                    name="invAmount"
                    value={invAmount}
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Input dollar amount to invest in USD (Minimum is $5000 USD)
                  </Form.Text>
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="strategy">
                    <Form.Label>Pick Investment Strategies </Form.Label>
                    <Select
                      isMulti
                      onChange={this.onStrategyChange}
                      options={options}
                      value={selectedStrategies}
                      required
                    />
                  </Form.Group>
                </Form.Row>
                <Button
                  className="btn btn-primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
