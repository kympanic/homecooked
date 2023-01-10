const LOAD_PRODUCTS = "/products/getallproducts";
const DELETE_PRODUCT = "/products/deleteproduct";

const loadProducts = (payload) => ({
	type: LOAD_PRODUCTS,
	payload,
});

const deleteProduct = (payload) => {
	return {
		type: DELETE_PRODUCT,
		payload,
	};
};

export const getAllProductsThunk = () => async (dispatch) => {
	const res = await fetch("/api/products");

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadProducts(payload));
		return payload;
	}
};

//Need to do getSingleProductsThunk

export const createProductThunk = (data) => async (dispatch) => {
	const newProduct = JSON.stringify(data);

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

export const editProductThunk = (data) => async (dispatch) => {
	const editedProduct = JSON.stringify(data);

	const res = await fetch(`/api/products/${data.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: editedProduct,
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(loadProducts(data));
	}
};

export const deleteProductThunk = (data) => async (dispatch) => {
	const body = JSON.stringify(data);

	const res = await fetch(`/api/products/${data.id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	});

	if (res.ok) {
		dispatch(deleteProduct(data.id));
	}
};

const productReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_PRODUCTS:
			return { ...newState, ...action.payload };
		case DELETE_PRODUCT:
			delete newState[action.payload];
			return newState;
		default:
			return state;
	}
};

export default productReducer;
