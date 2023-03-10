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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const editedReview = {
			id: review.id,
			body,
			rating,
			user_id: review.userId,
			product_id: review.productId,
		};
		let data = await dispatch(editReviewThunk(editedReview));
		if (data) {
			setErrors(data);
		} else {
			setIsOpen(false);
		}
	};

	return (
		<>
			{review && (
				<div>
					<div
						className={styles.darkBG}
						onClick={() => setIsOpen(false)}
					/>
					<div className={styles.centered}>
						<div className={styles.modal}>
							<div className={styles.modalHeader}>
								<p className={styles.heading}>
									Had second thoughts? Edit your review for{" "}
									{review.product.name}
								</p>
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
											onChange={(e) =>
												setBody(e.target.value)
											}
										/>
									</div>
									<div>
										<label>Rating: </label>
										<select
											value={rating}
											onChange={(e) =>
												setRating(e.target.value)
											}
										>
											<option value="--">--</option>
											<option value="1.0">1.0</option>
											<option value="1.5">1.5</option>
											<option value="2.0">2.0</option>
											<option value="2.5">2.5</option>
											<option value="3.0">3.0</option>
											<option value="3.5">3.5</option>
											<option value="4.0">4.0</option>
											<option value="4.5">4.5</option>
											<option value="5.0">5.0</option>
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
				</div>
			)}
		</>
	);
};

export default ModalEditReview;
