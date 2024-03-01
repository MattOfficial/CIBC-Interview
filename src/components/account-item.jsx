import { FaRegTrashAlt } from "react-icons/fa";
import { URL } from "../constants";
import Button from "./button";

export default function AccountItem({ item, setReload }) {
	/**
	 * Delete an item from the database using it's ID.
	 * @param {number} id
	 */
	const deleteData = async (id) => {
		try {
			const response = await fetch(`${URL}\\${id}`, {
				method: "DELETE",
			});
			if (response.status === 200) {
				setReload((prev) => !prev);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div key={item.id} className="account-row">
				<Button
					onClick={() => deleteData(item.id)}
					Icon={FaRegTrashAlt}
				>
					Delete
				</Button>
				<span className="acc-item">{item.id}</span>
				<span className="acc-item">{item.type}</span>
				<span className="acc-item">{item.balance}</span>
			</div>
		</>
	);
}
