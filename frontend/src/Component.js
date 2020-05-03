import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			stockName: "", 
			status: null
		};
	}

	inputChangedHandler = (event) => {
		let id = event.target.id;
		
		this.setState({
			stockName: event.target.value
		});
	}

	submitHandler = async () => {

		try {
			let result = await axios.get('http://3.101.23.185:5001/test/' + this.state.stockName);
			//console.log(result);

			let time = result.data.time;
			let latestStockPrice = result.data.latestStockPrice;
			let percentageChanges = result.data.percentageChanges;
			let fullName = result.data.fullName;
			let valueChanges = result.data.valueChanges;
			this.setState({
				status: "success", 
				time: time, 
				latestStockPrice: latestStockPrice, 
				percentageChanges: percentageChanges, 
				fullName: fullName, 
				valueChanges: valueChanges
			});
		} catch(error) {
			console.log(error.response);
			// This was one wierd issue, when there is Connection refused error and all, the request hasnt even reched the server(https://github.com/axios/axios#handling-errors).
			//console.log(error.request); // if error.response existed then request has gone but some error(400/500) has happened.
			// If error.response itself is not there, then err connection refused has happened.
			if(!error.response) {
				this.setState({
					status: "failure", 
					errorMessage: "Connection refused."
				});
			} else {

				if(error.response.status == 404)
					this.setState({
						status: "failure", 
						errorMessage: "Stock not found."
					});
				else if(error.response.status == 500)
					this.setState({
						status: "failure", 
						errorMessage: "Internal Server Error."
					});
			}
		}

	}

	render() {
		let result;
		if(this.state.status === "failure") {
			result = <div class="alert alert-danger" role="alert">
										{this.state.errorMessage}
								</div>;
		} else if(this.state.status === "success") {
			result = <div class="alert alert-success" role="alert">
									<h3>time: {this.state.time}</h3>
									<h3>fullName: {this.state.fullName}</h3>
									<h3>latestStockPrice: {this.state.latestStockPrice}</h3>
									<h3>percentageChanges: {this.state.percentageChanges}</h3>
									<h3>valueChanges: {this.state.valueChanges}</h3>
								</div>;
		} else {
			// This means status is null.
		}

		return (
			<div className="container">
				<h1 className="display-4">Welcome to Stock Price Dashboard</h1>
				<form>
					<div className="form-group">
						<label for="stockName">Stock Name</label>
						<input type="text" className="form-control" value={this.state.stockName} onChange={this.inputChangedHandler} id="stockName" />
					</div>
					<button type="button" onClick={this.submitHandler} disabled={!this.state.stockName} className="btn btn-primary">Calculate</button>
					<small class="form-text text-muted">Complete the form to enable this button.</small>
				</form>
				{result}
				<footer class="footer mt-auto py-3">
					<div class="container">
						<span class="text-muted">By Aswin Prasad. (014344512) for CMPE 285 HW. Using ReactJs, Flask(Python) </span>
						<a href="https://github.com/aswinpchn/Get-Stock-Data">Github Link</a>
					</div>
				</footer>
			</div>
		);
	}
}

export default Home;