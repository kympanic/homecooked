import "./reviewswiper.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const ReviewSwiper = ({ reviews }) => {
	const history = useHistory();
	const [currentIndx, setCurrentIndx] = useState(0);

	const profilePlaceholderImg =
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/defaultprofileIMG.jpg";
	const onProfileImgError = (e) => {
		e.target.src = profilePlaceholderImg;
	};

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
										onError={onProfileImgError}
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
};

export default ReviewSwiper;
