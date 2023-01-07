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

// Logged in user can view their saved payment info
// GET api/payments/:id
// User can create payment info
// POST api/payments
// User can update their payment
// PUT api/payments/:id
// User can delete their existing payment information
// DELETE api/payments/:id

// Thunks
export const getPaymentThunk = (id) => async (dispatch) => {
	const res = await fetch(`/api/payments/{id}`);

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadPayment(payload));
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
	}
};

export const editPaymentThunk = (data) => async (dispatch) => {
	const editedPayment = JSON.stringify(data);

	const res = await fetch("/api/payments", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: editedPayment,
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(loadPayment(data));
	}
};
