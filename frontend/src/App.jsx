import { QuoteManager } from "./components.jsx";
import "./App.css";

function App() {
	return (
	<div>
		<div className="App">
			<img src="quotebook.png" width="50" height="50" style={{float: "left", marginRight: "20px"}}/>
			<h1 style={{lineHeight: "50px", margin: "0"}}>Hack at UCI Tech Deliverable</h1>
			<QuoteManager/>
		</div>
	</div>
	);
}

export default App;
