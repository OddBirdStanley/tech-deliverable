import { QuoteManager } from "./components.jsx";
import "./App.css";

function App() {
	return (
		<div className="App">
			<img src="quotebook.png" width="50" height="50" style={{float: "left", marginRight: "20px"}}/>
			<h1 style={{lineHeight: "50px"}}>Hack at UCI Tech Deliverable</h1>
			<QuoteManager/>
		</div>
	);
}

export default App;
