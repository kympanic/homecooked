import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editUserThunk } from "../../../store/users";

const ModalEditProfileImg = ({ setIsOpen, userId }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users[userId]);

	const [errors, setErrors] = useState([]);
	const [profileImg, setProfileImg] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newShopInfo = {
			id: user.id,
			email: user.email,
			username: user.username,
			profile_img: profileImg,
			phone_number: user.phoneNumber,
			shop_name: user.shopName,
			shop_logo_img: user.shopLogoImg,
			shop_splash_img: user.shopSplashImg,
			category: user.category,
			zipcode: user.zipcode,
		};
		let data = await dispatch(editUserThunk(newShopInfo));
		if (data) {
			setErrors(data);
		} else {
			setIsOpen(false);
			// return window.location.reload(false);
		}
	};

	const updateProfileImg = (e) => {
		setProfileImg(e.target.value);
	};

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>
							Update your Profile Image
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
								<label htmlFor="profileImg">
									Profile Image Url
								</label>
								<input
									type="text"
									name="shopSplashImg"
									value={profileImg}
									onChange={updateProfileImg}
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

export default ModalEditProfileImg;
