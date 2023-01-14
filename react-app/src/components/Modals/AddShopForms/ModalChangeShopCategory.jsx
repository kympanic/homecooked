import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editUserThunk } from "../../../store/users";

const ModalChangeShopCategory = ({ setIsOpen, userId }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users[userId]);

	const [errors, setErrors] = useState([]);
	const [category, setCategory] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const newShopInfo = {
			id: user.id,
			email: user.email,
			username: user.username,
			profile_img: user.profileImg,
			phone_number: user.phoneNumber,
			shop_name: user.shopName,
			shop_logo_img: user.shopLogoImg,
			shop_splash_img: user.shopSplashImg,
			category,
			zipcode: user.zipcode,
		};
		let data = dispatch(editUserThunk(newShopInfo));
		if (data) {
			setErrors(data);
		}
		setIsOpen(false);
	};

	const updateCategory = (e) => {
		setCategory(e.target.value);
	};

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>
							Enter a new name for your store!
						</h5>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen(false)}
					>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.modalContent}>
						<form onSubmit={handleSubmit}>
							<div>
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div>
							<div>
								<label>Category: </label>
								<select
									value={category}
									onChange={updateCategory}
								>
									<option value="--">--</option>
									<option value="American">American</option>
									<option value="Asian">Asian</option>
									<option value="Italian">Italian</option>
									<option value="French">French</option>
									<option value="Mediterranean">
										Snacks
									</option>
									<option value="Vegetarian">
										Vegetarian
									</option>
									<option value="Vegan">Vegan</option>
									<option value="Indian">Indian</option>
									<option value="African">African</option>
									<option value="Ethnic">Ethnic</option>
									<option value="Fusion">Snacks</option>
									<option value="Dessert">Dessert</option>
									<option value="Snacks">Snacks</option>
									<option value="Other">Other</option>
								</select>
							</div>
						</form>
					</div>

					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button
								className={styles.submitBtn}
								onClick={handleSubmit}
							>
								Submit
							</button>
							<button
								className={styles.cancelBtn}
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalChangeShopCategory;
