const LOAD_ORDERS = "/orders/LOAD_ORDERS";
const DELETE_ORDER = "/orders/DELETE_ORDER";

const loadOrders = (payload) => ({
	type: LOAD_ORDERS,
	payload,
});

const deleteOrder = (payload) => {
	return {
		type: DELETE_ORDER,
		payload,
	};
};

