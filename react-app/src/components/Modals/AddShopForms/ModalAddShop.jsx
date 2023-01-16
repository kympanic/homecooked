import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editUserThunk } from "../../../store/users";
import { useHistory } from "react-router-dom";

const ModalAddShop = ({ setIsOpen, userId }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users[userId]);
	const history = useHistory();

	const [errors, setErrors] = useState([]);
	const [shopName, setShopName] = useState("");
	const [category, setCategory] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newShopInfo = {
			id: user.id,
			email: user.email,
			username: user.username,
			profile_img:
				"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/defaultprofileIMG.jpg",
			phone_number: user.phoneNumber,
			shop_name: shopName,
			shop_logo_img:
				"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/defaultshoplogo.jpg",
			shop_splash_img:
				"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/defaultshopsplash.jpg",
			category,
			zipcode: user.zipcode,
		};
		let data = await dispatch(editUserThunk(newShopInfo));
		if (data) {
			setErrors(data);
		} else {
			setIsOpen(false);
			history.push(`/store/${user.id}`);
		}
	};

	const updateShopName = (e) => {
		setShopName(e.target.value);
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
						<h5 className={styles.heading}>Create Your Store!</h5>
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
								<label htmlFor="shopName">Shop Name:</label>
								<input
									type="text"
									name="shopName"
									value={shopName}
									onChange={updateShopName}
									max={30}
								/>
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
										Mediterranean
									</option>
									<option value="Vegetarian">
										Vegetarian
									</option>
									<option value="Vegan">Vegan</option>
									<option value="Indian">Indian</option>
									<option value="African">African</option>
									<option value="Ethnic">Ethnic</option>
									<option value="Fusion">Fusion</option>
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

export default ModalAddShop;
