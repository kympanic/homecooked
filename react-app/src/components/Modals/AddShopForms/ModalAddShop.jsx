import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editUserThunk } from "../../../store/users";
// import { useHistory } from "react-router-dom";

const ModalAddShop = ({ setIsOpen, userId }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users[userId]);
<<<<<<< HEAD
	const history = useHistory();
=======
	// const history = useHistory();
	console.log(user);
>>>>>>> 8ec113c20d3806aacc10b717db39fe9a2af108b9

	const [errors, setErrors] = useState([]);
	const [shopName, setShopName] = useState("");
	const [shopLogoImg, setShopLogoImg] = useState("");
	const [category, setCategory] = useState("");

<<<<<<< HEAD
	const handleSubmit = (e) => {
		e.preventDefault();
=======
	const handleSubmit = async (e) => {
		e.preventDefault();

>>>>>>> 8ec113c20d3806aacc10b717db39fe9a2af108b9
		const newShopInfo = {
			id: user.id,
			email: user.email,
			username: user.username,
<<<<<<< HEAD
			profile_img: user.profileImg,
			phone_number: user.phoneNumber,
			shop_name: shopName,
			shop_logo_img: shopLogoImg,
			shop_splash_img: user.shopSplashImg,
			category,
			zipcode: user.zipcode,
		};
		let data = dispatch(editUserThunk(newShopInfo));
=======
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
>>>>>>> 8ec113c20d3806aacc10b717db39fe9a2af108b9
		if (data) {
			setErrors(data);
		} else {
			setIsOpen(false);
			return window.location.reload(false);
		}
<<<<<<< HEAD
		setIsOpen(false);
		if (data) {
			history.push(`/store/${user.id}`);
		}
=======
>>>>>>> 8ec113c20d3806aacc10b717db39fe9a2af108b9
	};

	const updateShopName = (e) => {
		setShopName(e.target.value);
	};

	const updateShopLogoImg = (e) => {
		setShopLogoImg(e.target.value);
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
<<<<<<< HEAD
						<h5 className={styles.heading}>
							Create or Edit Your Store!
						</h5>
=======
						<h5 className={styles.heading}>Create Your Store!</h5>
>>>>>>> 8ec113c20d3806aacc10b717db39fe9a2af108b9
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
<<<<<<< HEAD
								/>
							</div>
							<div>
								<label htmlFor="shopLogoImg">Shop Logo:</label>
								<input
									type="text"
									name="shopLogoImg"
									value={shopLogoImg}
									onChange={updateShopLogoImg}
=======
									max={30}
>>>>>>> 8ec113c20d3806aacc10b717db39fe9a2af108b9
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
<<<<<<< HEAD
										Snacks
=======
										Mediterranean
>>>>>>> 8ec113c20d3806aacc10b717db39fe9a2af108b9
									</option>
									<option value="Vegetarian">
										Vegetarian
									</option>
									<option value="Vegan">Vegan</option>
									<option value="Indian">Indian</option>
									<option value="African">African</option>
									<option value="Ethnic">Ethnic</option>
<<<<<<< HEAD
									<option value="Fusion">Snacks</option>
=======
									<option value="Fusion">Fusion</option>
>>>>>>> 8ec113c20d3806aacc10b717db39fe9a2af108b9
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
