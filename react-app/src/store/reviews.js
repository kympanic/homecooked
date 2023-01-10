//Actions
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

const loadReviews = (payload) => {
	return {
		type: LOAD_REVIEWS,
		payload,
	};
};

const deleteReview = (payload) => {
	return {
		type: DELETE_REVIEW,
		payload,
	};
};

//THUNKS
// GET all reviews by productId
export const getReviewsThunk = (productId) => async (dispatch) => {
	const response = await fetch(`/api/products/${productId}/reviews`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadReviews(data));
		return data;
	}
};

// CREATE A REVIEW based on productId
export const createReviewThunk = (data) => async (dispatch) => {
	const newReview = JSON.stringify(data);

	const response = await fetch(`/api/products/${data.product_id}/reviews`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newReview,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadReviews(data));
		return data;
	}
};
// GET all reviews
export const getAllReviewsThunk = () => async (dispatch) => {
	const response = await fetch(`/api/reviews`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadReviews(data));
		return data;
	}
};

// EDIT A REVIEW
export const editReviewThunk = (review) => async (dispatch) => {
	const editedReview = JSON.stringify(review);
	const response = await fetch(`/api/reviews/${review.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: editedReview,
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(loadReviews(data));
		return data;
	}
};

// DELETE a REVIEW
export const deleteReviewThunk = (data) => async (dispatch) => {
	const body = JSON.stringify(data);

	const response = await fetch(`/api/reviews/${data.id}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteReview(data.id));
	}
};

//REDUCER
const initialState = {};
const reviewReducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_REVIEWS:
			return { ...newState, ...action.payload };
		case DELETE_REVIEW:
			delete newState[action.reviewId];
			return newState;
		default:
			return state;
	}
};

export default reviewReducer;
