import { Component, createRef } from "react";

class QuoteForm extends Component {
	constructor(props) {
		super(props);
	}

	submit = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		let data = new FormData(e.target);
		await fetch("/api/quote", {"method": "POST", body: data});
		this.props.update();
	}

	render() {
		return (
<form action="/quote" method="POST" onSubmit={this.submit}>
	<div>
		<label htmlFor="name">Name:</label>
		<input type="text" name="name"/>
	</div>
	<div>
		<label htmlFor="message">Quote:</label>
		<input type="text" name="message"/>
	</div>
	<input type="submit" value="Submit"/>
</form>
		);
	}
}

class QuoteDisplay extends Component {
	constructor(props) {
		super(props);
	}

	formatTime(time) {
		return time;
	}

	render() {
		return (
<tr>
	<td>{this.props.name}</td>
	<td>{this.props.quote}</td>
	<td>{this.formatTime(this.props.time)}</td>
</tr>
		);
	}
}

export class QuoteManager extends Component {
	state = {
		quotes: []	
	};
	
	constructor(props) {
		super(props);
		this.historyFormRef = createRef();
	}

	loadQuotesAsync = async () => {
		let response = await (await fetch("api/history", {method: "POST", body: new FormData(this.historyFormRef.current)})).json();
		this.setState({quotes: response["quotes"]});
	}

	loadQuotes = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.loadQuotesAsync();
	}

	render() {
		return (
<div>
	<QuoteForm update={this.loadQuotesAsync}/>
	<form ref={this.historyFormRef} action="/api/history" method="POST" onSubmit={this.loadQuotes}>
		<select name="span">
			<option value={1}>last day</option>
			<option value={7}>last week</option>
			<option value={30}>last month</option>
			<option value={365}>last year</option>
			<option value={-1}>all</option>
		</select>
		<input value="Find" type="submit"/> 
	</form>
	<div>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Quote</th>
					<th>Time</th>
				</tr>
			</thead>
			<tbody>
				{this.state.quotes.map((v, i) => <QuoteDisplay key={i} name={v.name} quote={v.message} time={new Date(Date.parse(v.time)).toLocaleString()}/>)}
			</tbody>
		</table>
	</div>
</div>
		);	
	}
}
