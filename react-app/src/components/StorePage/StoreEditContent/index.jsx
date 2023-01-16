import styles from "../../Modals/App.module.css";
import "../storepage.css";
import ModalChangeShopName from "../../Modals/AddShopForms/ModalChangeShopName";
import ModalChangeShopCategory from "../../Modals/AddShopForms/ModalChangeShopCategory";
import ModalAddProduct from "../../Modals/AddProduct/ModalAddProduct";
import { useState } from "react";
const StoreEditContent = ({ vendor, sessionUserId, userId }) => {
	const [isOpenChangeName, setIsOpenChangeName] = useState(false);
	const [isOpenChangeCat, setIsOpenChangeCat] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			{vendor.id === sessionUserId && (
				<div className="edit-store-container">
					<h3> Customize Your Store!</h3>
					<div>
						<button
							className={styles.primaryBtn}
							onClick={() => setIsOpen(true)}
						>
							Create Product
						</button>

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
				</div>
			)}
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

export default StoreEditContent;
