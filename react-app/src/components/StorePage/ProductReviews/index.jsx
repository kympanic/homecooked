import React from "react";
import { useSelector } from "react-redux";
import "./productreview.css";

const ProductReviews = ({ id }) => {
	const product = useSelector((state) => state.products[id]);
	const reviews = useSelector((state) => Object.values(state.reviews));

	const filteredReviews = reviews.filter((review) => {
		return review.productId === id;
	});

	console.log(filteredReviews, "these are the reviews");

	// const testingReviews = product.reviews.map((review) => {
	// 	return review.body;
	// });

	// console.log(product, "this is the product");
	// console.log(testingReviews, "THESE ARE THE REVIEWS FOR THE PRODUCTS");

	return (
		<div>
			{filteredReviews &&
				filteredReviews.map((review) => {
					<div>
						<h1>{review.rating}</h1>
					</div>;
				})}
		</div>
		// <div className="product-review-wrapper">
		// 	<div>
		// 		<img
		// 			id="product-review-img"
		// 			src={product.imageURL}
		// 			alt={product.name}
		// 		/>
		// 		<h3>{product.name}</h3>
		// 		<p>Avg Rating: {product.avgRating}</p>
		// 	</div>
		// 	<div>
		// 		{product &&
		// 			product.reviews.length > 0 &&
		// 			product.reviews.map((review) => {
		// 				<div>
		// 					<p>{review.body}</p>
		// 				</div>;
		// 			})}
		// 		{product.reviews.length === 0 && (
		// 			<div>
		// 				<p>There are no reviews yet!</p>
		// 			</div>
		// 		)}
		// 	</div>
		// </div>
	);
};
export default ProductReviews;
