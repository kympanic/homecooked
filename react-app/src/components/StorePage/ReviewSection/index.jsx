import "../storepage.css";
import "./productreview.css";
import styles from "../../Modals/App.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalEditReview from "../../Modals/EditReview/ModalEditReview";
import ModalDeleteReview from "../../Modals/DeleteReview/ModalDeleteReview";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const ReviewSection = ({ reviewId, sessionUserId }) => {
	const history = useHistory();
	const review = useSelector((state) => state.reviews[reviewId]);
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);

	const profilePlaceholder =
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/defaultprofileIMG.jpg";

	const productPlaceholder =
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/default-food-image.jpeg";

	const onProfileError = (e) => {
		e.target.src = profilePlaceholder;
	};

	const onProductError = (e) => {
		e.target.src = productPlaceholder;
	};

	return (
		review &&
		sessionUserId && (
			<div id="store-review-container">
				<div id="store-reviews-section">
					<div className="store-reviews-profile-container">
						<img
							onClick={() => {
								history.push(`/users/${review.userId}`);
							}}
							className="store-review-profile-img"
							src={review.user.profileImg}
							alt={review.user.username}
							onError={onProfileError}
						/>
						<p>{review.user.username}</p>
						<p>
							Rating: {review.rating}
							<FontAwesomeIcon
								className="header-email-icon"
								icon={faStar}
							/>
						</p>
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
							id="store-product-review-img"
							src={review.product.imageURL}
							alt={review.product.name}
							onError={onProductError}
						/>
						<p>{review.product.name}</p>
					</div>
				</div>
			</div>
		)
	);
};
export default ReviewSection;
