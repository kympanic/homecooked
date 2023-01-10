//ACTION TYPES

const ADD_TO_CART = 'cart/ADD_TO_CART'
const REMOVE_FROM_CART= 'cart/REMOVE_FROM_CART'
const UPDATE_QTY = 'cart/UPDATE_QTY'
const LOAD_CURRENT_ITEM ='cart/LOAD_CURRENT_ITEM'

// Actions

export const addToCart = (itemId) => {
    return {
        type: ADD_TO_CART,
        payload: {
         id: itemId
    }
}
}

export const removeFromCart = (itemId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: {
            id: itemId
        }
    }
}

export const updateQty = (itemId, value) => {
    return {
        type: UPDATE_QTY,
        payload:{
            id: itemId,
            qty: value
        }
    }
}

export const loadCurrentItem = (item) =>{
    return {
        type: LOAD_CURRENT_ITEM,
        payload: item

    }
}

// FUNCTIONS
export const getCartItemById = (id) => (state) => state.cart.items[id];

export const getAllCartItems = ({ cart, produce }) => {
	return Object.values(cart.order).map((id) => {
		return {
			...cart.items[id],
			...produce[id],
		};
	});
};

// REDUCER
const initialState = {
    products: [],
    cart: [],
    currentItem: null
}
const newCartReducer = (state,action) => {
    switch (action.type) {
		case ADD_TO_CART:
            return {}
        case REMOVE_FROM_CART:
            return {}
        case UPDATE_QTY:
            return {}
        case LOAD_CURRENT_ITEM:
            return {

            }
        default:
            return state
}
}

export default newCartReducer
