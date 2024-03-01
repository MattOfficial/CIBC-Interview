export default function Button({ onClick, Icon, children }) {
	return (
		<span className="indivisual-btn">
			<button onClick={onClick}>
				{children} <Icon />
			</button>
		</span>
	);
}
