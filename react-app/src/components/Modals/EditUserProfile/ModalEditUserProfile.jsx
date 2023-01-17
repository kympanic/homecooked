import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editNewUserThunk } from "../../../store/users";

const ModalEditUserProfile = ({ setIsOpen, userId }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users[userId]);

	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [profileImg, setProfileImg] = useState("");
	const [zipcode, setZipcode] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const editedUserProf = {
			id: user.id,
			username,
			email,
			phone_number: phoneNumber,
			profile_img: profileImg,
			zipcode,
		};

		//error handling
		let data = await dispatch(editNewUserThunk(editedUserProf));
		if (data) {
			setErrors(data);
		} else {
			setIsOpen(false);
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePhoneNumber = (e) => {
		setPhoneNumber(e.target.value);
	};

	const updateProfileImg = (e) => {
		setProfileImg(e.target.value);
	};

	const updateZipcode = (e) => {
		setZipcode(e.target.value);
	};

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>Edit Your Profile!</h5>
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
								<label htmlFor="username">Username:</label>
								<input
									type="text"
									name="username"
									value={username}
									placeholder={user?.username}
									onChange={updateUsername}
									maxLength={17}
								/>
							</div>
							<div>
								<label htmlFor="email">Email:</label>
								<input
									type="text"
									name="email"
									value={email}
									placeholder={user?.email}
									onChange={updateEmail}
								/>
							</div>
							<div>
								<label htmlFor="phoneNumber">
									Phone Number:
								</label>
								<input
									type="text"
									name="phoneNumber"
									value={phoneNumber}
									placeholder={user?.phoneNumber}
									onChange={updatePhoneNumber}
									maxLength={10}
									onKeyPress={(event) => {
										if (!/[0-9]/.test(event.key)) {
											event.preventDefault();
										}
									}}
								/>
							</div>
							<div>
								<label htmlFor="profileImg">
									Your Profile Image:
								</label>
								<input
									type="url"
									name="profileImg"
									value={profileImg}
									placeholder={user?.profileImg}
									onChange={updateProfileImg}
								/>
							</div>
							<div>
								<label htmlFor="zipcode">Zipcode:</label>
								<input
									type="text"
									name="zipcode"
									value={zipcode}
									placeholder={user?.zipcode}
									onChange={updateZipcode}
									minLength={5}
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

export default ModalEditUserProfile;
