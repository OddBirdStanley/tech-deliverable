import { useRef } from "react";
import "./components.css";

export default function QuoteForm(props) {
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
