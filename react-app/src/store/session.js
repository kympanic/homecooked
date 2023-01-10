// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// const GET_CART = "session/GET_CART";
const ADD_ITEM = "session/ADD_ITEM";
const UPDATE_COUNT = "session/UPDATE_COUNT";
const REMOVE_ITEM = "session/REMOVE_ITEM"
const RESET_CART = "session/RESET_CART"

//  User Actions
const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

// Cart Actions
export const addItem = (productId) => {
	return {
		type: ADD_ITEM,
		productId,
	};
};

export const updateCount = (productId, count) => {
	if (count < 1) return removeItem(productId);
	return {
		type: UPDATE_COUNT,
		productId,
		count,
	};
};

export const removeItem = (productId) => {
	return {
		type: REMOVE_ITEM,
		productId,
	};
};

export const reset = () => {
	return {
		type: RESET_CART,
	};
};

// SELECTORS
export const getCartItemById = (productId) => (store) => store.session.cart.productId;
// NEED TO CHANGE *** BELOW
// export const getAllCartItems = ({ cart, product }) => {
// 	return Object.values(cart.order).map((id) => {
// 		return {
// 			...cart.items[id],
// 			...product[id],
// 		};
// 	});
// };



// THUNKS

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (data) => async (dispatch) => {
	const newUser = JSON.stringify(data);
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newUser,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


// USER SESSION REDUCER

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}


// CART REDUCER
const initialState2 = {
	products: {},
	order: [],
};
export function cartReducer(state = initialState2, action) {
	switch (action.type) {
		case ADD_ITEM:
			return {
				...state,
				products: {
					...state.products,
					[action.productId]: { id: action.productId, count: 1 },
				},
				order: [...state.order, action.itemId],
			};
		case UPDATE_COUNT:
			return {
				...state,
				items: {
					...state.items,
					[action.itemId]: {
						...state[action.itemId],
						count: action.count,
					},
				},
			};
		case REMOVE_ITEM:
			const newState = { ...state, items: { ...state.items } };
			delete newState.items[action.itemId];
			newState.order = newState.order.filter((id) => id !== action.itemId);
			return newState;
		case RESET_CART:
			return initialState2;
		default:
			return state;
	}
}
