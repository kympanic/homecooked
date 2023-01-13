const LOAD_ORDERS = "/payments/LOAD_ORDERS";

// Action Creators
const loadOrders = (payload) => ({
	type: LOAD_ORDERS,
	payload,
});

// Thunks
export const getOrdersThunk = (id) => async (dispatch) => {
	const res = await fetch(`/api/users/${id}/orders`);

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadOrders(payload));
		return payload;
	}
};

export const createOrderThunk = (data) => async (dispatch) => {
	const newOrder = JSON.stringify(data);

	const res = await fetch("/api/payments", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newOrder,
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(loadOrders(data));
		return data;
	}
};

const orderReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_ORDERS:
			return { ...newState, ...action.payload };
		default:
			return state;
	}
};

export default orderReducer;
