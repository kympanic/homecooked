import React from "react";
import { useSelector } from "react-redux";
import "./productreview.css";

const ProductReviews = ({ id }) => {
	const product = useSelector((state) => state.products[id]);

	const testingReviews = product.reviews.map((review) => {
		return review.body;
	});

	// console.log(product, "this is the product");
	console.log(testingReviews, "THESE ARE THE REVIEWS FOR THE PRODUCTS");

	return (
		<div className="product-review-wrapper">
			<div>
				<img
					id="product-review-img"
					src={product.imageURL}
					alt={product.name}
				/>
				<h3>{product.name}</h3>
			</div>
			<div>
				{product &&
					product.reviews.map((review) => {
						<div>
							<p>{review}</p>
						</div>;
					})}
			</div>
		</div>
	);
};
export default ProductReviews;
