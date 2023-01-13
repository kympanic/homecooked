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

export const createPaymentThunk = (data) => async (dispatch) => {
	const newPayment = JSON.stringify(data);

	const res = await fetch("/api/payments", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newPayment,
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(loadPayment(data));
		return data;
	}
};

export const editPaymentThunk = (data) => async (dispatch) => {
	const editedPayment = JSON.stringify(data);

	const res = await fetch(`/api/payments/${data.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: editedPayment,
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(loadPayment(data));
		return data;
	}
};

export const deletePaymentThunk = (data) => async (dispatch) => {
	console.log(data.id, "THIS IS THE DATA ID BEING SENT BACK");
	const res = await fetch(`/api/payments/${data.id}`, {
		method: "DELETE",
	});
	if (res.ok) {
		dispatch(deletePayment(data.id));
		return data;
	}
};

const paymentReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_PAYMENT:
			return { ...newState, ...action.payload };
		case DELETE_PAYMENT:
			delete newState[action.payload];
			return newState;
		default:
			return state;
	}
};

export default paymentReducer;
