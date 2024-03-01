import { useEffect, useState, useMemo } from "react";
import {
	FaSort,
	FaPlus,
	FaUndo,
	FaSortAmountDown,
	FaSortAmountDownAlt,
} from "react-icons/fa";
import Button from "./components/button";
import FormInput from "./components/form-input.jsx";
import AccountItem from "./components/account-item.jsx";

import { URL } from "./constants.js";

import "./App.css";

function App() {
	const [accounts, setAccounts] = useState([]);
	const [account_type, setAccountType] = useState();
	const [balance, setBalance] = useState();
	const [reload, setReload] = useState(false);

	/**
	 * Calculating and saving the account balance using array reduce() function.
	 * Using useMemo to retain the value of expensive calculation for better performance.
	 * accounts passed as dependancy, if accounts array is changed, the sumOfBalance will be recalculated.
	 */
	const sumOfBalance = useMemo(
		() => accounts.reduce((acc, item) => acc + item.balance, 0),
		[accounts]
	);

	/**
	 * Calls database to fetch latest records.
	 * Reloads every time the reload flag is changed.
	 */
	useEffect(() => {
		(async () => {
			try {
				const data = await fetch(URL);
				const json = await data.json();
				setAccounts(json);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [reload]);

	/**
	 * POST a new record to the database.
	 * Uses Account type and balance from the user submitted form.
	 */
	const postData = async () => {
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: account_type,
					balance: balance,
				}),
			});
			if (response.status === 201) {
				setReload((prevState) => !prevState);
			}
		} catch (error) {
			console.error(error);
		}
	};

	/**
	 * Sort accounts by ascending order of their balance
	 */
	const sortByAsc = () => {
		const sortedAccAsc = [...accounts].sort(
			(a, b) => a.balance - b.balance
		);
		setAccounts(sortedAccAsc);
	};

	/**
	 * Sort accounts by descending order of their balance
	 */
	const sortByDsc = () => {
		const sortedByDsc = [...accounts].sort((a, b) => b.balance - a.balance);
		setAccounts(sortedByDsc);
	};

	return (
		<div className="App">
			<h1>Accounts</h1>
			<div className="divider"></div>
			<div className="btn-container">
				<Button
					onClick={() => setReload((prev) => !prev)}
					Icon={FaUndo}
				>
					Refresh
				</Button>
				<Button onClick={() => {}} Icon={FaSort}>
					Sort
				</Button>
				<Button onClick={sortByAsc} Icon={FaSortAmountDownAlt}>
					Sort Balance ASC
				</Button>
				<Button onClick={sortByDsc} Icon={FaSortAmountDown}>
					Sort Balance DSC
				</Button>
			</div>
			{accounts &&
				accounts.map((item) => (
					<AccountItem item={item} setReload={setReload} />
				))}
			<div>
				<FormInput
					label="Account type:"
					type="text"
					setter={setAccountType}
				/>
				<FormInput
					label="Balance:"
					type="number"
					setter={(e) => setBalance(Number(e))}
				/>
				<Button
					onClick={(event) => {
						event.preventDefault();
						postData();
					}}
					Icon={FaPlus}
				>
					Add
				</Button>
				<div className="divider"></div>
				{accounts && (
					<div>Sum of balance: {sumOfBalance.toFixed(2)}</div>
				)}
			</div>
		</div>
	);
}

export default App;
