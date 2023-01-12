import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalEditReview from "../../Modals/EditReview/ModalEditReview";
import ModalDeleteReview from "../../Modals/DeleteReview/ModalDeleteReview";
import "./productreview.css";
import styles from "../../Modals/App.module.css";

const ProductReviews = ({ id }) => {
	const product = useSelector((state) => state.products[id]);
	const reviews = useSelector((state) => Object.values(state.reviews));
	const sessionUserId = useSelector((state) => state.session.user.id);
	const filteredReviews = reviews.filter((review) => {
		return review.productId === id;
	});

	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);

	console.log(filteredReviews, "these are the filtered reviews");
	return (
		<div className="review-box-container">
			<div>
				<img
					id="product-review-img"
					src={product.imageURL}
					alt={product.name}
				/>
				<h3>{product.name}</h3>
				<p>Avg Rating: {product.avgRating}</p>
			</div>
			<div className="review-content-wrapper">
				{filteredReviews &&
					filteredReviews.length > 0 &&
					filteredReviews.map((review) => (
						<div>
							<div className="review-container">
								<div className="review-left">
									<img
										className="review-profile-img"
										src={review.user.profileImg}
										alt={review.user.username}
									/>
									<Link
										style={{
											textDecoration: "none",
											color: "black",
										}}
										to={`/users/${review.userId}`}
									>
										{review.user.username}
									</Link>
									<p>{review.rating}</p>
								</div>
								<div className="review-right">
									<p>{review.body}</p>
									{sessionUserId === review.userId && (
										<div>
											<button
												className={styles.primaryBtn}
												onClick={() =>
													setIsOpenEdit(true)
												}
											>
												Edit Comment
											</button>
											{isOpenEdit && (
												<ModalEditReview
													setIsOpen={setIsOpenEdit}
													review={review}
												/>
											)}
											<button
												className={styles.primaryBtn}
												onClick={() =>
													setIsOpenDelete(true)
												}
											>
												Delete Comment
											</button>
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
						</div>
					))}
				{filteredReviews.length === 0 && (
					<div>
						<p> THERE ARE NO REVIEWS YET!</p>
					</div>
				)}
			</div>
		</div>
	);
};
export default ProductReviews;
