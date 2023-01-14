import React from "react";
import ProductReviews from "../ProductReviews";
import "../storepage.css";

const ReviewSection = ({ vendor, selectedProducts }) => {
	return (
		<div>
			{vendor.reviews.length > 0 && (
				<div className="review-content-wrapper">
					<div>
						<h1>Reviews</h1>
					</div>
				</div>
			)}
			<div className="reviews-section">
				{selectedProducts &&
					selectedProducts.map((product) => (
						<div key={product.id} className="reviews-container">
							<div className="reviews-content">
								<ProductReviews id={product.id} />
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ReviewSection;
