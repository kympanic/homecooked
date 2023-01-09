import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getAllReviewsThunk } from "../../store/reviews";
const ReviewSwiper = ({ userId }) => {
	const dispatch = useDispatch();
	const reviews = useSelector((state) => Object.state?.reviews);

	useEffect(() => {
		dispatch(getAllReviewsThunk());
	}, [dispatch]);

	// let userReviews = [];
	// for (let i = 0; i < reviews?.length; i++) {
	// 	if ((reviews[i].userId = 1)) {
	// 		userReviews.push(reviews[i]);
	// 	}
	// }

	return <div>This is the review swiper</div>;
};

export default ReviewSwiper;
