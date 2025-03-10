export default function QuoteDisplay(props) {
	return (
<tr>
	<td>{props.name}</td>
	<td>{props.quote}</td>
	<td>{props.time}</td>
</tr>
	);
}
