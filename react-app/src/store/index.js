import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import products from "./products";
import reviews from "./reviews";
<<<<<<< HEAD
import payments from "./payments"
// import cart from "./cart"
// import newCartReducer from "./cart";
=======
import payments from "./payments";
import users from "./users";
>>>>>>> 42291acd5b681c2fa8da1256ab25aad66a8cc025

const rootReducer = combineReducers({
	session,
	products,
	reviews,
<<<<<<< HEAD
	payments,
	// cart: newCartReducer
=======
	users,
	payments,
>>>>>>> 42291acd5b681c2fa8da1256ab25aad66a8cc025
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
