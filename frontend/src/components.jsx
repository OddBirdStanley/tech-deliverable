import { Component } from "react";

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
		history: 1,
		quotes: []	
	};
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
<div>
	<div>
		<select>
			<option>last day</option>
			<option>last week</option>
			<option>last month</option>
			<option>last year</option>
			<option>all</option>
		</select>
		<button>Find</button>
	</div>
	<div>
		<table>
			<tr>
				<th>Name</th>
				<th>Quote</th>
				<th>Time</th>
			</tr>
			{this.state.quotes.map(i => <QuoteDisplay name={i.name} quote={i.quote} time={i.time}/>)}
		</table>
	</div>
</div>
		);	
	}
}
