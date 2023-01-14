import "./reviewswiper.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ReviewSwiper = ({ reviews, vendor }) => {
	const sessionUser = useSelector((state) => state.session.user);

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
		<div
			className={
				vendor.id === sessionUser.id
					? "carousel-container"
					: "carousel-container-notowner"
			}
		>
			{reviews &&
				reviews.map((review) => (
					<div
						id="carousel-item-wrapper"
						key={review.id}
						className="carousel-item"
						style={{
							transform: `translate(-${currentIndx * 100}%)`,
						}}
					>
						<p id="swiper-review-body">{review.body}</p>
						<img
							className="review-swiper-profileimg"
							src={review.user.profileImg}
							alt={review.user.username}
						/>
						<p>Score {review.rating}</p>
					</div>
				))}
		</div>
	);
};

export default ReviewSwiper;
