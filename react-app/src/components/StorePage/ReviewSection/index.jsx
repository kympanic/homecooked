import "../storepage.css";
import "./productreview.css";
import styles from "../../Modals/App.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalEditReview from "../../Modals/EditReview/ModalEditReview";
import ModalDeleteReview from "../../Modals/DeleteReview/ModalDeleteReview";
<<<<<<< HEAD
const ReviewSection = ({ vendor, reviews, sessionUserId }) => {
	const history = useHistory();
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);

	consol.log(reviews);
	return (
		<div className="store-review-container">
			{vendor.reviews.length > 0 && (
				<div className="review-header-wrapper">
					<h1>Reviews</h1>
				</div>
			)}
			<div>
				{reviews &&
					reviews.length > 0 &&
					reviews.map((review) => (
						<div key={review.id} className="store-reviews-section">
							<div
								key={review.id}
								className="reviews-profile-container"
							>
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
									<h3>{review.body}</h3>
								</div>
								<div id="reviews-product-element">
									<img
										id="product-review-img"
										src={review.product.imageURL}
										alt={review.product.name}
									/>
									<h3>{review.product.name}</h3>
								</div>
							</div>
							<div>
								{sessionUserId === review.userId && review && (
									<div>
										<button
											onClick={() => setIsOpenEdit(true)}
											className={styles.primaryBtn}
										>
											Edit
										</button>
										<button
											onClick={() =>
												setIsOpenDelete(true)
											}
											className={styles.primaryBtn}
										>
											Delete
										</button>
									</div>
								)}
							</div>
							{isOpenEdit && (
								<ModalEditReview
									setIsOpen={setIsOpenEdit}
									review={review}
								/>
							)}
							{isOpenDelete && (
								<ModalDeleteReview
									setIsOpen={setIsOpenDelete}
								/>
							)}
						</div>
					))}
				{reviews.length === 0 && (
					<div>
						<h1>THERE ARE NO REVIEWS YET</h1>
					</div>
				)}
			</div>
		</div>
	);
};

=======
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
					<div className="store-reviews-profile-container">
						<img
							onClick={() => {
								history.push(`/users/${review.userId}`);
							}}
							className="store-review-profile-img"
							src={review.user.profileImg}
							alt={review.user.username}
						/>
						<p>{review.user.username}</p>
						<p>Rating: {review.rating}</p>
					</div>
					<div className="store-reviews-content-container">
						<div className="store-review-body-element">
							<p>{review.body}</p>
						</div>
						{sessionUserId === review.userId && review && (
							<div className="edit-delete-review-btns">
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
					<div id="store-reviews-product-element">
						<img
							id="product-review-img"
							src={review.product.imageURL}
							alt={review.product.name}
						/>
						<p>{review.product.name}</p>
					</div>
				</div>
			</div>
		)
	);
};
>>>>>>> 8ec113c20d3806aacc10b717db39fe9a2af108b9
export default ReviewSection;
