import ModalAddProduct from "../Modals/AddProduct/ModalAddProduct";
import { useState } from "react";
import styles from "../Modals/App.module.css";

const StorePage = () => {
	const [isOpen, setIsOpen] = useState(false);

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
