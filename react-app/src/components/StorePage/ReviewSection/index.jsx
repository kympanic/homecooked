import "../storepage.css";
import "./productreview.css";
import styles from "../../Modals/App.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalEditReview from "../../Modals/EditReview/ModalEditReview";
import ModalDeleteReview from "../../Modals/DeleteReview/ModalDeleteReview";
import { useSelector } from "react-redux";

const ReviewSection = ({ vendor, reviewId, sessionUserId }) => {
	const history = useHistory();
	const review = useSelector((state) => state.reviews[reviewId]);
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);

	return (
		review &&
		sessionUserId && (
			<div className="store-review-container">
				<div className="store-reviews-section">
					<div className="reviews-profile-container">
						<img
							onClick={() => {
								history.push(`/users/${review.userId}`);
							}}
							className="review-profile-img"
							src={review.user.profileImg}
							alt={review.user.username}
						/>
						<p>{review.user.username}</p>
						<p>Rating: {review.rating}</p>
					</div>
					<div className="reviews-content-container">
						<div className="review-body-element">
							<p>{review.body}</p>
						</div>
						<div id="reviews-product-element">
							<img
								id="product-review-img"
								src={review.product.imageURL}
								alt={review.product.name}
							/>
							<h4>{review.product.name}</h4>
						</div>
					</div>
					{sessionUserId === review.userId && review && (
						<div>
							<button
								onClick={() => setIsOpenEdit(true)}
								className={styles.primaryBtn}
							>
								Edit
							</button>
							<button
								onClick={() => setIsOpenDelete(true)}
								className={styles.primaryBtn}
							>
								Delete
							</button>
							{isOpenEdit && (
								<ModalEditReview
									setIsOpen={setIsOpenEdit}
									review={review}
								/>
							)}
							{isOpenDelete && (
								<ModalDeleteReview
									setIsOpen={setIsOpenDelete}
									review={review}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		)
	);
};
export default ReviewSection;
