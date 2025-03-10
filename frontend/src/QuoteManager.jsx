import { useRef, useState, useEffect } from "react";
import Starry from "./Starry.jsx";
import QuoteDisplay from "./QuoteDisplay.jsx";
import QuoteForm from "./QuoteForm.jsx";
import "./components.css";

export default function QuoteManager(props) {
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
