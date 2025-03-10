import { QuoteManager } from "./components.jsx";
import "./App.css";

function App() {
	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>

			<h2>Previous Quotes</h2>
			<QuoteManager/>
		</div>
	);
}

export default App;
