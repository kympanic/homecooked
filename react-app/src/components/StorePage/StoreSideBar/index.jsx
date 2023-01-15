import React from "react";
import styles from "../../Modals/App.module.css";
import ModalChangeShopName from "../../Modals/AddShopForms/ModalChangeShopName";
import ModalChangeShopCategory from "../../Modals/AddShopForms/ModalChangeShopCategory";
import ModalAddProduct from "../../Modals/AddProduct/ModalAddProduct";
import { useState } from "react";
const StoreSideBar = () => {
	const [isOpenChangeName, setIsOpenChangeName] = useState(false);
	const [isOpenChangeCat, setIsOpenChangeCat] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="sidenav">
			<button
				className={styles.primaryBtn}
				onClick={() => setIsOpen(true)}
			>
				Create Product
			</button>
			<div>
				<button
					className={styles.primaryBtn}
					onClick={() => setIsOpenChangeName(true)}
				>
					Edit Name
				</button>
				<button
					className={styles.primaryBtn}
					onClick={() => setIsOpenChangeCat(true)}
				>
					Edit Cuisine
				</button>
			</div>
			{isOpen && <ModalAddProduct setIsOpen={setIsOpen} />}
			{isOpenChangeName && (
				<ModalChangeShopName
					setIsOpen={setIsOpenChangeName}
					userId={userId}
				/>
			)}
			{isOpenChangeCat && (
				<ModalChangeShopCategory
					setIsOpen={setIsOpenChangeCat}
					userId={userId}
				/>
			)}
		</div>
	);
};

export default StoreSideBar;
