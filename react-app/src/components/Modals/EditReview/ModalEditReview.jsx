import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { editReviewThunk } from "../../../store/reviews";
import { useState } from "react";

const ModalEditReview = ({ setIsOpen, review }) => {
	const dispatch = useDispatch();
	const [body, setBody] = useState("");
	const [rating, setRating] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const editedReview = {
			id: review.id,
			body,
			rating,
			user_id: review.userId,
			product_id: review.productId,
		};
		let data = dispatch(editReviewThunk(editedReview));
		if (data) {
			setErrors(data);
		}
		setIsOpen(false);
	};

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>Edit Your Meal!</h5>
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
								<label htmlFor="body">Body:</label>
								<input
									type="text"
									name="body"
									value={body}
									placeholder={review.body}
									onChange={(e) => setBody(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="rating">Your 1-5 Rating:</label>
								<input
									type="text"
									name="rating"
									value={rating}
									placeholder={review.rating}
									onChange={(e) => setRating(e.target.value)}
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

export default ModalEditReview;
