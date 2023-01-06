const GET_PRODUCTS = "/products/getallproducts";

export const getAllProducts = (payload) => ({
	type: GET_PRODUCTS,
	payload,
});

export const getAllProductsThunk = () => async (dispatch) => {
	const res = await fetch("/api/products");

	console.log(res, "this is the data");
	if (res.ok) {
		const payload = await res.json();
		dispatch(getAllProducts(payload));
	}
};

const productReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case GET_PRODUCTS:
			return { ...newState, ...action.payload };
		default:
			return state;
	}
};

export default productReducer;
