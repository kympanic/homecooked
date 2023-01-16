import "./reviewswiper.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const ReviewSwiper = ({ reviews }) => {
<<<<<<< HEAD
	return <div>This is the review swiper</div>;
=======
	const history = useHistory();
	const [currentIndx, setCurrentIndx] = useState(0);
	const carouselInfiniteScroll = () => {
		if (currentIndx === reviews.length - 1) {
			return setCurrentIndx(0);
		}
		return setCurrentIndx(currentIndx + 1);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			carouselInfiniteScroll();
		}, 3000);
		//clean up function
		return () => clearInterval(interval);
	});

	return (
		<div className={"carousel-container"}>
			{reviews &&
				reviews.map((review) => (
					<div
						key={review.id}
						className="carousel-item"
						style={{
							transform: `translate(-${currentIndx * 100}%)`,
						}}
					>
						<div id="content">
							<div class="review">
								<blockquote>
									{review.product.name} &mdash; {review.body}
								</blockquote>
								<div></div>
								<p>
									<img
										onClick={() =>
											history.push(
												`/users/${review.userId}`
											)
										}
										id="carousel-profile-img"
										src={review.user.profileImg}
										alt={review.user.username}
									/>{" "}
									<p>Score: {review.rating}</p>
									<p id="carousel-review-username">
										{review.user.username}
									</p>
								</p>
							</div>
						</div>
					</div>
				))}
		</div>
	);
>>>>>>> 8ec113c20d3806aacc10b717db39fe9a2af108b9
};

export default ReviewSwiper;
