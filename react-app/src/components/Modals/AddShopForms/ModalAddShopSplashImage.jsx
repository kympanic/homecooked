import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editUserThunk } from "../../../store/users";
import "./splashimgform.css";
const ModalAddShopSplashImage = ({ setIsOpen, userId }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users[userId]);

	// const [errors, setErrors] = useState([]);
	const [errors, setErrors] = useState([]);
	const [shopSplashImg, setShopSplashImg] = useState("");

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
			shop_splash_img: shopSplashImg,
			category: user.category,
			zipcode: user.zipcode,
		};
		let data = dispatch(editUserThunk(newShopInfo));
		// if (data) {
		// 	setErrors(data);
		// }
		if (data) {
			setErrors(data);
		}
		setIsOpen(false);
	};

	const updateShopSplashImg = (e) => {
		setShopSplashImg(e.target.value);
	};

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>
							Display Something Attractive!
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
							{/* <div>
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div> */}
							<div>
								<label
									htmlFor="shopSplashImg"
									className="shopsplash-label"
								>
									Shop Splash Image Url{" "}
								</label>
								<input
									className="shopsplash-input"
									type="url"
									name="shopSplashImg"
									value={shopSplashImg}
									onChange={updateShopSplashImg}
									placeholder="Url for your shop splash"
								/>
							</div>
							<div>
								<label htmlFor="shopSplashImg">
									Shop Splash Image
								</label>
								<input
									type="text"
									name="shopSplashImg"
									value={shopSplashImg}
									onChange={updateShopSplashImg}
								/>
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

export default ModalAddShopSplashImage;
