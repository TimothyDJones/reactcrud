import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
	constructor(props) {
		super(props);
		this.onChangeQuote = this.onChangeQuote.bind(this);
		this.onChangeAuthor = this.onChangeAuthor.bind(this);
		this.onChangeTags = this.onChangeTags.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			quote: '',
			author: '',
			tags: ''
		}
	}

	onChangeQuote(e) {
		this.setState({
			quote: e.target.value
		});
	}

	onChangeAuthor(e) {
		this.setState({
			author: e.target.value
		});
	}

	onChangeTags(e) {
		this.setState({
			tags: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		console.log(`Input values: ${this.state.quote}, ${this.state.author}, ${this.state.tags}.`);

		const obj = {
			quote: this.state.quote,
			author: this.state.author,
			tags: this.state.tags
		}
		axios.post('http://localhost:4000/quote/add', obj);

		this.setState({
			quote: '',
			author: '',
			tags: ''
		});
	}

	render() {
		return (
			<div style={{marginTop: 10}}>
				<h3>Add New Quote</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Quote: </label>
						<input 
							type="text" 
							className="form-control"
							value={this.state.quote}
							onChange={this.onChangeQuote} 
						/>
					</div>
					<div className="form-group">
						<label>Author: </label>
						<input 
							type="text" 
							className="form-control"
							value={this.state.author}
							onChange={this.onChangeAuthor} 
						/>
					</div>
					<div className="form-group">
						<label>Tags: </label>
						<input 
							type="text" 
							className="form-control"
							value={this.state.tags}
							onChange={this.onChangeTags} 
						/>
					</div>
					<div className="form-group">
						<input type="submit" onClick={this.onSubmit} value="Add Quote" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}
