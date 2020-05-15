import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Steps, Row, Col, Button, message, Form, InputNumber, Select, Typography, Divider } from 'antd';

import 'antd/dist/antd.css';

import TickerBar from '../TickerBar/TickerBar';
import TickerTape from '../TickerBar/TickerTape';
import './Home.styles.css';

const queryString = require('query-string');

const { Title, Paragraph, Text } = Typography;

const OPTIONS = ['Ethical Investing', 'Growth Investing', 'Index Investing', 'Quality Investing', 'Value Investing'];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const Step = Steps.Step;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invAmount: "",
      options: [
        { label: "Ethical Investing", value: "EthicalInvesting" },
        { label: "Growth Investing", value: "GrowthInvesting" },
        { label: "Index Investing", value: "IndexInvesting" },
        { label: "Quality Investing", value: "QualityInvesting" },
        { label: "Value Investing", value: "ValueInvesting" },
      ],
      selectedStrategies: ["None"],
      selectedItems: [],

    };
    this.handleChange = this.handleChange.bind(this);
    this.onStrategyChange = this.onStrategyChange.bind(this);

  }
  validateNumber = (number) => {
    if (number < 5000) {
      return 'error';
    }

    return 'success';
  }
  handleBack = () => {

    let newVal = this.state.current - 1;
    if (newVal === 0) {
      this.setState({ enableBack: false });
    }
    this.setState(({ showSubmit: false }))
    this.setState({ current: (newVal) });

  };

  handleNumberChange = (value) => {
    this.setState({
      validateNumberStatus: this.validateNumber(value),
      amount: value
    });
  }

  handleOptionChange = selectedItems => {
    this.setState({ selectedItems });
  };

  handleNext = () => {

    if (this.state.current === 1 && this.state.selectedItems.length > 2) {
      message.error('Select maximum of 2 Investment strategies');
      this.setState(({ validateOptionStatus: 'error' }))
    }
    else if (this.state.current === 1 && this.state.selectedItems.length === 0) {
      message.error('Please select at-least 1 Investment strategy');
      this.setState(({ validateOptionStatus: 'error' }))
    }
    else if (this.state.current === 0 && this.state.amount < 5000) {
      message.error('Please select valid amount');
    }
    else {
      this.setState(({ validateOptionStatus: 'success' }))
      let newVal = this.state.current + 1;
      if (newVal === 2) {
        this.setState(({ showSubmit: true }))
      }
      this.setState({ current: (newVal) });
      this.setState({ enableBack: true });
    }

  };

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
  onClick = (e) => {


    let Strategies = this.state.selectedStrategies;

    console.log(Strategies.toString())
    console.log(typeof (e))
    if (Strategies.includes(e)) {
      Strategies.pop(e)
      this.setState({ selectedStrategies: Strategies }, () => {
        console.log(this.state.selectedStrategies.toString())
      })
    }
    else {
      Strategies.push(e)
      this.setState({ selectedStrategies: Strategies }, () => {
        console.log(this.state.selectedStrategies.toString())
      })
    }

  }

  render() {
    const { options, selectedStrategies, invAmount } = this.state;
    const { selectedItems } = this.state;
    const formatedSelectedItems = selectedItems.join(" & ");
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    return (
      <div>
        <div>
          <TickerBar />
        </div>
        <div className='container'>

          <div className='heading text-white'>
            <h1>Stock Portfolio Suggestion Engine</h1>
          </div>
          <div className="stepsClass">
            <Steps direction="vertical" size="small" current={this.state.current}>
              <Step title="Investment Amount" description="Investment Amount (in $)" />
              <Step title="Choose Investment Strategy"
                description="Choose upto 2 Strategies" />
              <Step title="Confirm" description="Check Input" />
            </Steps>
          </div>
          <Form className='inputForm text-white' variant="dark">
            <Form.Group controlId="invAmount">
              <Form.Label variant="dark">Select Investment Amount</Form.Label>
              <Form.Control
                variant="dark"
                type="number"
                placeholder="Enter Investment Amount in USD"
                name="invAmount"
                value={invAmount}
                onChange={this.handleChange}
                required
              />
              <Form.Text className="text-white">
                Input dollar amount to invest in USD (Minimum is $5000 USD)
                  </Form.Text>
            </Form.Group>

            <Form.Row>

            </Form.Row>
            <Button
              className="btn btn-dark "
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
                </Button>
          </Form>



        </div>
        <div >
          {this.state.options.map((option) =>
            <div >
              <Card
                bg='dark'

                text='white'
                style={{ width: '10rem' }}
                value={"texthgxj"}
                name={option.label}
                onClick={() => this.onClick(option.value)}

              >

                <Card.Body value={option.value}
                  name={option.label}
                >
                  <Card.Title> {option.label} </Card.Title>
                  <Card.Text>
                    {option.value}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
          <Card
            bg='dark'
            onClick={this.onClick}
            text='white'
            style={{ width: '10rem' }}
            value='ValueInvesting'

          >

            <Card.Body>
              <Card.Title> Value Investing </Card.Title>
              <Card.Text>

              </Card.Text>
            </Card.Body>
          </Card>
        </div>



        <div className="App">
          <div className="box effect1">
            <Typography>
              <div style={{ textAlign: 'center' }}>
                <Title level={3}> <a href="/">Stock Portfolio Suggestion Engine </a></Title>
              </div>
              <Divider />
            </Typography>
            <Row>
              <Col span={8}>
                <div className="stepsClass">
                  <Steps direction="vertical" size="small" current={this.state.current}>
                    <Step title="Investment Amount" description="Investment Amount (in $)" />
                    <Step title="Choose Investment Strategy"
                      description="Choose upto 2 Strategies" />
                    <Step title="Confirm" description="Check Input" />
                  </Steps>
                </div>
              </Col>
              <Col span={16}>
                <div className="contentClass">
                  <Form {...formItemLayout}>
                    {(this.state.current === 0 &&
                      <div>
                        <Form.Item
                          validateStatus={this.state.validateNumberStatus}
                          help="Amount should be greater than $5000"
                          style={{ width: '100%' }}
                        >
                          <InputNumber placeholder="Enter Amount"
                            defaultValue={5000}
                            value={this.state.amount}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: '100%' }}
                            onChange={this.handleNumberChange} />
                        </Form.Item>
                      </div>)
                      || (this.state.current === 1 &&
                        <div>
                          <Form.Item
                            help="Pick one or two Investment strategies"
                            validateStatus={this.state.validateOptionStatus}
                            style={{ width: '100%' }}
                          >
                            <Select
                              mode="multiple"
                              placeholder="Investment strategies"
                              value={selectedItems}
                              onChange={this.handleOptionChange}
                              style={{ width: '100%' }}
                            >
                              {filteredOptions.map(item => (
                                <Select.Option key={item} value={item}>
                                  {item}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>)
                      || (this.state.current === 2 &&
                        <div>
                          <Text strong>Amount: </Text> <Text>{this.state.amount}</Text>
                          <br />
                          <Text strong>Investing
                                                Strategies: </Text><Text>{formatedSelectedItems}</Text>
                        </div>)
                    }
                  </Form>
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={6} offset={10}>
                {!this.state.enableBack &&
                  <Button onClick={this.handleBack} style={{ marginRight: 20 }} disabled>Back</Button>
                }

                {this.state.enableBack &&
                  <Button onClick={this.handleBack} style={{ marginRight: 20 }}>Back</Button>
                }

                {!this.state.showSubmit &&
                  <Button type="primary" onClick={this.handleNext}>Next</Button>
                }

                {this.state.showSubmit &&
                  <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
                }

              </Col>
            </Row>


          </div>
          <div className="box effect1" style={{ textAlign: 'center' }}>
            <Row>
              <Col>
                <Typography>
                  <Title level={4}> Market Overview Widget</Title>
                </Typography>
                            Market Overview Widget provides a quick glance at the latest market activity across various
                            sectors.
                        </Col>
            </Row>
            <Row>
              <Col span={16} offset={4}>
                <div id="rohit">
                  <div className="tradingview-widget-container">
                    <div className="tradingview-widget-container__widget"></div>

                  </div>
                </div>
              </Col>
              <Col span={12}></Col>
            </Row>

          </div>
        </div>
        <div className='tickertape'>

          <TickerTape />
        </div>
      </div >

    );
  }
}

export default Home;








