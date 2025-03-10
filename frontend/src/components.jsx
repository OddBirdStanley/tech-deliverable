import { Component, createRef } from "react";
import "./components.css"

class Starry extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
<div className="starry">
	<img src="starry.svg"/>
	<img src="starry.svg"/>
	<img src="starry.svg"/>
	<img src="starry.svg"/>
	<img src="starry.svg"/>
	<img src="starry.svg"/>
	<img src="starry.svg"/>
	<img src="starry.svg"/>
</div>
		);
	}
}

class QuoteForm extends Component {
	constructor(props) {
		super(props);
		this.inputRef1 = createRef();
		this.inputRef2 = createRef();
	}

	submit = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		let data = new FormData(e.target);
		await fetch("/api/quote", {"method": "POST", body: data});
		this.inputRef1.current.value = "";
		this.inputRef2.current.value = "";
		this.props.update();
	}

	render() {
		return (
<form className="quote-form-body" action="/quote" method="POST" onSubmit={this.submit}>
	<div className="quote-form-input-box">
		<label htmlFor="name" className="quote-form-input-label">Name:</label>
		<input type="text" name="name" required ref={this.inputRef1} className="quote-form-input"/>
	</div>
	<div className="quote-form-input-box">
		<label htmlFor="message" className="quote-form-input-label">Quote:</label>
		<input type="text" name="message" required ref={this.inputRef2} className="quote-form-input quote-form-input-long"/>
	</div>
	<input type="submit" value="Submit" className="quote-submit"/>
	<p style={{marginLeft: "10px"}}>(press to watch the stars!)</p>
</form>
		);
	}
}

class QuoteDisplay extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
<tr>
	<td>{this.props.name}</td>
	<td>{this.props.quote}</td>
	<td>{this.props.time}</td>
</tr>
		);
	}
}

export class QuoteManager extends Component {
	state = {
		starryKey: 0,
		quotes: []	
	};
	
	constructor(props) {
		super(props);
		this.historyFormRef = createRef();
	}

	loadQuotesAsync = async () => {
		let response = await (await fetch("api/history", {method: "POST", body: new FormData(this.historyFormRef.current)})).json();
		this.setState({starryKey: this.state.starryKey + 1, quotes: response["quotes"]});
	}

	loadQuotes = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.loadQuotesAsync();
	}

	componentDidMount() {
		this.loadQuotesAsync();
	}

	render() {
		return (
<div style={{padding: "20px"}}>
	<Starry key={this.state.starryKey}/>
	<div>
		<h2>Submit a new Quote</h2>
		<QuoteForm update={this.loadQuotesAsync}/>
	</div>
	<div>
		<h2>Find Quotes</h2>
		<form ref={this.historyFormRef} action="/api/history" method="POST" onSubmit={this.loadQuotes}>
			<select name="span" class="quote-history-select">
				<option value={1}>last day</option>
				<option value={7}>last week</option>
				<option value={30}>last month</option>
				<option value={365}>last year</option>
				<option value={-1}>all</option>
			</select>
			<input value="Find" type="submit" className="quote-submit"/> 
		</form>
		<div className="quote-history-body">
			<table className="quote-table">
				<thead>
					<tr>
						<th style={{width: "15%"}}>Name</th>
						<th style={{width: "65%"}}>Quote</th>
						<th style={{width: "20%"}}>Time</th>
					</tr>
				</thead>
				<tbody>
					{this.state.quotes.map((v, i) => <QuoteDisplay key={i} name={v.name} quote={v.message} time={new Date(Date.parse(v.time)).toLocaleString()}/>)}
				</tbody>
			</table>
		</div>
	</div>
</div>
		);	
	}
}
