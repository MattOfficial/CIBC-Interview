export default function FormInput({ label, setter, type }) {
	return (
		<>
			<label>{label}</label>
			<input
				type={type}
				name="account_type"
				id="account_type"
				onChange={(e) => setter(e.target.value)}
			/>
		</>
	);
}
