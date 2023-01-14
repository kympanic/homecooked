const LOAD_PAYMENT = "/payments/LOAD_PAYMENT";
const DELETE_PAYMENT = "/payments/DELETE_PAYMENT";

// Action Creators
const loadPayment = (payload) => ({
	type: LOAD_PAYMENT,
	payload,
});

const deletePayment = (payload) => {
	return {
		type: DELETE_PAYMENT,
		payload,
	};
};

// Thunks
export const getPaymentThunk = (id) => async (dispatch) => {
	const res = await fetch(`/api/payments/${id}`);

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadPayment(payload));
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
