import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ModalSubmitReview = ({ setIsOpen, payment }) => {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.session.user.id);

	const [errors, setErrors] = useState([]);
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

		// const newOrder = {
		// 	user_id: userId,
		// 	product_id: product.id,
		// 	body,
		// 	rating,
		// };

		// // console.log(newReview, "THIS IS WHAT IS BEING SENT TO THE STORE ");
		// let data = await dispatch(createReviewThunk(newReview));
		// setIsOpen(false);
		// if (data) {
		// 	setErrors(errors);
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
					<div className={styles.modalContent}></div>
					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button
								className={styles.submitBtn}
								onClick={handleSubmit}
							>
								Submit Your Order!
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

export default ModalSubmitReview;
