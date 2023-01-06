const LOAD_PRODUCTS = "/products/getallproducts";

export const loadProducts = (payload) => ({
	type: LOAD_PRODUCTS,
	payload,
});

export const createProductThunk = (data) => async (dispatch) => {
	const newProduct = JSON.stringify(data);
	console.log(newProduct, "THIS IS THE STRINGIFIED DATA");

	const res = await fetch("/api/products", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newProduct,
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(loadProducts(data));
	}
};

export const getAllProductsThunk = () => async (dispatch) => {
	const res = await fetch("/api/products");

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadProducts(payload));
	}
};

const productReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_PRODUCTS:
			return { ...newState, ...action.payload };
		default:
			return state;
	}
};

export default productReducer;
