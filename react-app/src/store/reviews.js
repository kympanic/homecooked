<<<<<<< HEAD

=======
>>>>>>> 40e34eb1a8305c79b1f31de3e667e96db931bde5
//Actions
const GET_REVIEWS = "reviews/GET_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
<<<<<<< HEAD

//ACTION CREATORS
// GET
=======
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

//ACTION CREATORS
// GET

const loadReviews = (payload) => ({
	type: LOAD_REVIEWS,
	payload,
});

>>>>>>> 40e34eb1a8305c79b1f31de3e667e96db931bde5
export const getReviewsActionCreator = (reviews) => {
	return {
		type: GET_REVIEWS,
		reviews,
	};
};
//POST
<<<<<<< HEAD
export const createReviewActionCreator = (review) =>{
    return {
        type: CREATE_REVIEW,
        review
    }
}
=======
export const createReviewActionCreator = (review) => {
	return {
		type: CREATE_REVIEW,
		review,
	};
};
>>>>>>> 40e34eb1a8305c79b1f31de3e667e96db931bde5

// DELETE
export const deleteReviewActionCreator = (reviewId) => {
	return {
		type: DELETE_REVIEW,
		reviewId,
	};
};

//THUNKS
// GET all reviews by productId
export const getReviewsThunk = (productId) => async (dispatch) => {
	const response = await fetch(`/api/products/${productId}/reviews`);
	if (response.ok) {
		const data = await response.json();
		dispatch(getReviewsActionCreator(data));
		return data;
	}
};

<<<<<<< HEAD
// CREATE A REVIEW based on productId
export const createReviewThunk = (productId, review) => async (dispatch) =>{
    const response = await fetch(`/api/products/${productId}/reviews`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(review),
		});

        if(response.ok){
            const data = await response.json();
            dispatch(createReviewActionCreator(data))
            return data;
        }
}
=======
// GET all reviews
export const getAllReviewsThunk = () => async (dispatch) => {
	const response = await fetch(`/api/reviews`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadReviews(data));
		return data;
	}
};

// CREATE A REVIEW based on productId
export const createReviewThunk = (productId, review) => async (dispatch) => {
	const response = await fetch(`/api/products/${productId}/reviews`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(review),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadReviews(data));
		return data;
	}
};
>>>>>>> 40e34eb1a8305c79b1f31de3e667e96db931bde5

// EDIT A REVIEW
export const editReviewThunk = (review) => async (dispatch) => {
	const response = await fetch(`/api/reviews/${review.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify,
	});
<<<<<<< HEAD
	 if (response.ok) {
			const newData = await response.json();
			dispatch(getReviewsActionCreator(newData));
			return newData;
		}
}


// DELETE a REVIEW
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});
        if(response.ok){
            dispatch(deleteReviewActionCreator(reviewId))
        }}


//REDUCER
const initialState = {};
const reviewReducer = (state=initialState, action) =>{
    let newState = {...state}
    switch(action.type){
    case GET_REVIEWS:
=======
	if (response.ok) {
		const newData = await response.json();
		dispatch(getReviewsActionCreator(newData));
		return newData;
	}
};

// DELETE a REVIEW
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
	const response = await fetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteReviewActionCreator(reviewId));
	}
};

//REDUCER
const initialState = {};
const reviewReducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case GET_REVIEWS:
>>>>>>> 40e34eb1a8305c79b1f31de3e667e96db931bde5
			const allReviews = {};
			action.reviews.forEach((review) => {
				allReviews[review.id] = review;
			});
			return {
				...state,
				...allReviews,
			};
<<<<<<< HEAD
    case CREATE_REVIEW:
        newState[action.review.id] = action.review
        return newState
    case DELETE_REVIEW:
        delete newState[action.reviewId]
        return newState;
    default:
    return state;
}}
=======
		case LOAD_REVIEWS:
			return { ...newState, ...action.payload };
		case CREATE_REVIEW:
			newState[action.review.id] = action.review;
			return newState;
		case DELETE_REVIEW:
			delete newState[action.reviewId];
			return newState;
		default:
			return state;
	}
};
>>>>>>> 40e34eb1a8305c79b1f31de3e667e96db931bde5

export default reviewReducer;
