import { useRef, useState, useEffect } from "react";
import "./components.css"

function Starry(props) {
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

function QuoteForm(props) {
	const inputRef1 = useRef(null);
	const inputRef2 = useRef(null);

	const submit = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		await fetch("/api/quote", {"method": "POST", body: new FormData(e.target)});
		inputRef1.current.value = "";
		inputRef2.current.value = "";
		props.update();
	}

	return (
<form className="quote-form-body" action="/quote" method="POST" onSubmit={submit}>
	<div className="quote-form-input-box">
		<label htmlFor="name" className="quote-form-input-label">Name:</label>
		<input type="text" name="name" required ref={inputRef1} className="quote-form-input"/>
	</div>
	<div className="quote-form-input-box">
		<label htmlFor="message" className="quote-form-input-label">Quote:</label>
		<input type="text" name="message" required ref={inputRef2} className="quote-form-input quote-form-input-long"/>
	</div>
	<input type="submit" value="Submit" className="quote-submit"/>
	<p style={{marginLeft: "10px"}}>(press to watch the stars!)</p>
</form>
	);
}

function QuoteDisplay(props) {
	return (
<tr>
	<td>{props.name}</td>
	<td>{props.quote}</td>
	<td>{props.time}</td>
</tr>
	);
}

export function QuoteManager(props) {
	const [starryKey, setStarryKey] = useState(0);
	const [quotes, setQuotes] = useState([]);
	const historyFormRef = useRef(null);	
	
	let loadQuotesAsync = async () => {
		let response = await (await fetch("api/history", {method: "POST", body: new FormData(historyFormRef.current)})).json();
		setStarryKey(starryKey + 1);
		setQuotes(response["quotes"]);
	}

	let loadQuotes = (e) => {
		e.preventDefault();
		e.stopPropagation();
		loadQuotesAsync();
	}

	useEffect(() => {
		loadQuotesAsync();
	}, []);
	
	return (
<div style={{padding: "20px"}}>
	<Starry key={starryKey}/>
	<div>
		<h2>Submit a new Quote</h2>
		<QuoteForm update={loadQuotesAsync}/>
	</div>
	<div>
		<h2>Find Quotes</h2>
		<form ref={historyFormRef} action="/api/history" method="POST" onSubmit={loadQuotes}>
			<select name="span" className="quote-history-select">
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
					{quotes.map((v, i) => <QuoteDisplay key={i} name={v.name} quote={v.message} time={new Date(Date.parse(v.time)).toLocaleString()}/>)}
				</tbody>
			</table>
		</div>
	</div>
</div>
	);
}
