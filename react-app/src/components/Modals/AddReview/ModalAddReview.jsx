import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createReviewThunk } from "../../../store/reviews";

const ModalAddReview = ({ setIsOpen, product }) => {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.session.user.id);

	// const [errors, setErrors] = useState([]);
	const [body, setBody] = useState("");
	const [rating, setRating] = useState("");

	const updateBody = (e) => {
		setBody(e.target.value);
	};
	const updateRating = (e) => {
		setRating(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newReview = {
			user_id: userId,
			product_id: product.id,
			body,
			rating,
		};

		console.log(newReview, "THIS IS WHAT IS BEING SENT TO THE STORE ");
		await dispatch(createReviewThunk(newReview));
		setIsOpen(false);
		// if (data) {
		// 	const listoferrors = Object.values(data);
		// 	console.log(listoferrors, "WOAH DATA");
		// 	setErrors(listoferrors);
		// }
	};
	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>Food is in the Oven!</h5>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen(false)}
					>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.modalContent}>
						<form>
							{/* <div>
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div> */}
							<div>
								<label>Comment: </label>
								<input
									type="text"
									name="body"
									onChange={updateBody}
									value={body}
								/>
							</div>
							<div>
								<label>Rating: </label>
								<input
									type="text"
									name="rating"
									onChange={updateRating}
									value={rating}
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

export default ModalAddReview;
