import ModalAddProduct from "../Modals/AddProduct/ModalAddProduct";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../store/users";
import styles from "../Modals/App.module.css";

const StorePage = () => {
	//getting info for the specific vendor on the page
	const { userId } = useParams();
	const vendor = useSelector((state) => state?.users[userId]);
	const history = useHistory();

	const [isOpen, setIsOpen] = useState(false);

	console.log(vendor);
	//checking if the shop exists. if not, will redirect to a page that says shop does not exist, go back to home
	if (vendor?.shopName === null) {
		history.push("/");
	}

	return (
		<div>
			<h1>Store Page</h1>
			<button
				className={styles.primaryBtn}
				onClick={() => setIsOpen(true)}
			>
				Create Product
			</button>
			{isOpen && <ModalAddProduct setIsOpen={setIsOpen} />}
		</div>
	);
};
export default StorePage;
